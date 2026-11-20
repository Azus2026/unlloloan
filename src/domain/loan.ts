export type Locale = "en" | "es";

export type LoanLifecycleState = "PRE_FUNDING" | "ACTIVE" | "REPAID" | "DEFAULTED";

export type BudgetCategoryId =
  | "ARBITRAGE_LIQUIDITY"
  | "RPC_WEBSOCKETS"
  | "GAS_PRIVATE_BUNDLES"
  | "DEDICATED_VPS"
  | "TRANSPARENCY_PORTAL";

export interface BudgetAllocationItem {
  readonly id: BudgetCategoryId;
  readonly contractIndex: number;
  readonly capUsdc: number;
  readonly sharePercent: number;
  readonly spentUsdc: number;
}

export interface OnChainExpenseRecord {
  readonly id: number;
  readonly category: BudgetCategoryId;
  readonly amountUsdc: number;
  readonly timestamp: number;
  readonly vendor: string;
  readonly receiptIpfsCid: string;
  readonly paymentTxHash: `0x${string}`;
}

export interface WalletTelemetry {
  readonly address: `0x${string}`;
  readonly blockNumber: bigint;
  readonly ethBalanceFormatted: string;
  readonly usdcBalanceFormatted: string;
  readonly transactionCount: number;
  readonly gasGweiFormatted: string;
  readonly syncedAtIso: string;
}

export interface RegistrySnapshot {
  readonly contractAddress: `0x${string}` | null;
  readonly state: LoanLifecycleState;
  readonly fundedUsdc: number;
  readonly repaidUsdc: number;
  readonly maturityTimestamp: number | null;
  readonly allocations: readonly BudgetAllocationItem[];
  readonly expenses: readonly OnChainExpenseRecord[];
}

export type TelemetryLoadState =
  | { readonly status: "loading" }
  | {
      readonly status: "ready";
      readonly wallet: WalletTelemetry;
      readonly registry: RegistrySnapshot;
    }
  | {
      readonly status: "error";
      readonly message: string;
    };

export const BORROWER_WALLET: `0x${string}` =
  (import.meta.env.VITE_BORROWER_ADDRESS as `0x${string}` | undefined) ||
  "0xf6Bb92Ac612D814F2A1e67Bf713F2f732419AC87";

export const REGISTRY_CONTRACT_ADDRESS: `0x${string}` | null = (() => {
  const raw = import.meta.env.VITE_REGISTRY_CONTRACT_ADDRESS as string | undefined;
  if (!raw || !/^0x[a-fA-F0-9]{40}$/.test(raw)) return null;
  return raw as `0x${string}`;
})();

export const UNLLOO_LOAN_URL: string =
  (import.meta.env.VITE_UNLLOO_LOAN_URL as string | undefined) || "https://unlloo.com";

export const SOCIAL_LINKS = {
  xUrl: "https://x.com/Hik453",
  xHandle: "@Hik453",
  telegramUrl: "https://t.me/A0B10101",
  telegramHandle: "@A0B10101",
  etherscanWalletUrl: `https://etherscan.io/address/${BORROWER_WALLET}`,
} as const;

export const BASE_ALLOCATIONS: readonly BudgetAllocationItem[] = [
  {
    id: "ARBITRAGE_LIQUIDITY",
    contractIndex: 0,
    capUsdc: 6000,
    sharePercent: 60,
    spentUsdc: 0,
  },
  {
    id: "RPC_WEBSOCKETS",
    contractIndex: 1,
    capUsdc: 1500,
    sharePercent: 15,
    spentUsdc: 0,
  },
  {
    id: "GAS_PRIVATE_BUNDLES",
    contractIndex: 2,
    capUsdc: 1400,
    sharePercent: 14,
    spentUsdc: 0,
  },
  {
    id: "DEDICATED_VPS",
    contractIndex: 3,
    capUsdc: 600,
    sharePercent: 6,
    spentUsdc: 0,
  },
  {
    id: "TRANSPARENCY_PORTAL",
    contractIndex: 4,
    capUsdc: 500,
    sharePercent: 5,
    spentUsdc: 0,
  },
] as const;

export const TARGET_PRINCIPAL_USDC = 10000;

export function shortenAddress(address: string): string {
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
