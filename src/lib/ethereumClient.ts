import { createPublicClient, fallback, formatEther, formatGwei, formatUnits, http, parseAbi } from "viem";
import { mainnet } from "viem/chains";
import {
  BASE_ALLOCATIONS,
  BORROWER_WALLET,
  REGISTRY_CONTRACT_ADDRESS,
  type BudgetAllocationItem,
  type BudgetCategoryId,
  type LoanLifecycleState,
  type OnChainExpenseRecord,
  type RegistrySnapshot,
  type WalletTelemetry,
} from "../domain/loan";

const MAINNET_USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" as const;

const ERC20_BALANCE_ABI = parseAbi([
  "function balanceOf(address owner) view returns (uint256)",
]);

const REGISTRY_ABI = parseAbi([
  "function state() view returns (uint8)",
  "function fundedPrincipalUsdc() view returns (uint256)",
  "function repaidUsdc() view returns (uint256)",
  "function maturityTimestamp() view returns (uint64)",
  "function categoryCapUsdc(uint8 category) view returns (uint256)",
  "function categorySpentUsdc(uint8 category) view returns (uint256)",
  "function expenseCount() view returns (uint256)",
  "function getExpense(uint256 expenseId) view returns ((uint8 category, uint256 amountUsdc, uint64 timestamp, string vendor, string receiptIpfsCid, bytes32 paymentTxHash))",
]);

const CATEGORY_ORDER: readonly BudgetCategoryId[] = [
  "ARBITRAGE_LIQUIDITY",
  "RPC_WEBSOCKETS",
  "GAS_PRIVATE_BUNDLES",
  "DEDICATED_VPS",
  "TRANSPARENCY_PORTAL",
];

const STATE_MAP: readonly LoanLifecycleState[] = [
  "PRE_FUNDING",
  "ACTIVE",
  "REPAID",
  "DEFAULTED",
];

function createMainnetClient() {
  const customRpc = import.meta.env.VITE_MAINNET_RPC_URL as string | undefined;
  const transports = [
    ...(customRpc ? [http(customRpc, { timeout: 6000 })] : []),
    http("https://ethereum-rpc.publicnode.com", { timeout: 6000 }),
    http("https://eth.drpc.org", { timeout: 6000 }),
    http("https://1rpc.io/eth", { timeout: 6000 }),
  ];

  return createPublicClient({
    chain: mainnet,
    transport: fallback(transports),
  });
}

const mainnetClient = createMainnetClient();

function formatFixedPrecision(raw: string, decimals: number): string {
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return "0.00";
  return parsed.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export async function fetchMainnetAuditData(): Promise<{
  wallet: WalletTelemetry;
  registry: RegistrySnapshot;
}> {
  const [blockNumber, ethBalanceWei, usdcBalanceRaw, transactionCount, gasPriceWei] =
    await Promise.all([
      mainnetClient.getBlockNumber(),
      mainnetClient.getBalance({ address: BORROWER_WALLET }),
      mainnetClient.readContract({
        address: MAINNET_USDC_ADDRESS,
        abi: ERC20_BALANCE_ABI,
        functionName: "balanceOf",
        args: [BORROWER_WALLET],
      }),
      mainnetClient.getTransactionCount({ address: BORROWER_WALLET }),
      mainnetClient.getGasPrice(),
    ]);

  const wallet: WalletTelemetry = {
    address: BORROWER_WALLET,
    blockNumber,
    ethBalanceFormatted: formatFixedPrecision(formatEther(ethBalanceWei), 4),
    usdcBalanceFormatted: formatFixedPrecision(formatUnits(usdcBalanceRaw, 6), 2),
    transactionCount,
    gasGweiFormatted: formatFixedPrecision(formatGwei(gasPriceWei), 2),
    syncedAtIso: new Date().toISOString(),
  };

  const contractAddress = REGISTRY_CONTRACT_ADDRESS;
  if (!contractAddress) {
    return {
      wallet,
      registry: {
        contractAddress: null,
        state: "PRE_FUNDING",
        fundedUsdc: 0,
        repaidUsdc: 0,
        maturityTimestamp: null,
        allocations: BASE_ALLOCATIONS,
        expenses: [],
      },
    };
  }

  const [stateIdx, fundedRaw, repaidRaw, maturityRaw, countRaw, spentList] = await Promise.all([
    mainnetClient.readContract({
      address: contractAddress,
      abi: REGISTRY_ABI,
      functionName: "state",
    }),
    mainnetClient.readContract({
      address: contractAddress,
      abi: REGISTRY_ABI,
      functionName: "fundedPrincipalUsdc",
    }),
    mainnetClient.readContract({
      address: contractAddress,
      abi: REGISTRY_ABI,
      functionName: "repaidUsdc",
    }),
    mainnetClient.readContract({
      address: contractAddress,
      abi: REGISTRY_ABI,
      functionName: "maturityTimestamp",
    }),
    mainnetClient.readContract({
      address: contractAddress,
      abi: REGISTRY_ABI,
      functionName: "expenseCount",
    }),
    Promise.all(
      BASE_ALLOCATIONS.map((item) =>
        mainnetClient.readContract({
          address: contractAddress,
          abi: REGISTRY_ABI,
          functionName: "categorySpentUsdc",
          args: [item.contractIndex],
        }),
      ),
    ),
  ]);

  const expenseCount = Number(countRaw);
  const expenses: OnChainExpenseRecord[] = [];
  if (expenseCount > 0) {
    const fetched = await Promise.all(
      Array.from({ length: Math.min(expenseCount, 50) }, (_, index) =>
        mainnetClient.readContract({
          address: contractAddress,
          abi: REGISTRY_ABI,
          functionName: "getExpense",
          args: [BigInt(index)],
        }),
      ),
    );
    fetched.forEach((entry, index) => {
      const category = CATEGORY_ORDER[entry.category] ?? "ARBITRAGE_LIQUIDITY";
      expenses.push({
        id: index,
        category,
        amountUsdc: Number(formatUnits(entry.amountUsdc, 6)),
        timestamp: Number(entry.timestamp),
        vendor: entry.vendor,
        receiptIpfsCid: entry.receiptIpfsCid,
        paymentTxHash: entry.paymentTxHash,
      });
    });
  }

  const allocations: BudgetAllocationItem[] = BASE_ALLOCATIONS.map((item, idx) => ({
    ...item,
    spentUsdc: Number(formatUnits(spentList[idx] ?? 0n, 6)),
  }));

  return {
    wallet,
    registry: {
      contractAddress: REGISTRY_CONTRACT_ADDRESS,
      state: STATE_MAP[stateIdx] ?? "PRE_FUNDING",
      fundedUsdc: Number(formatUnits(fundedRaw, 6)),
      repaidUsdc: Number(formatUnits(repaidRaw, 6)),
      maturityTimestamp: maturityRaw > 0n ? Number(maturityRaw) : null,
      allocations,
      expenses,
    },
  };
}
