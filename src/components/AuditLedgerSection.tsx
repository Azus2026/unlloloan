import {
  ArrowUpRight,
  ArrowsClockwise,
  CheckCircle,
  FileText,
  WarningOctagon,
  Wallet,
} from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import {
  BASE_ALLOCATIONS,
  BORROWER_WALLET,
  SOCIAL_LINKS,
  shortenAddress,
  type BudgetCategoryId,
  type TelemetryLoadState,
} from "../domain/loan";
import { Reveal } from "./Reveal";

interface AuditLedgerSectionProps {
  readonly copy: CopyBundle["ledger"];
  readonly categoryNames: CopyBundle["allocation"]["categories"];
  readonly stateLabels: CopyBundle["stateLabels"];
  readonly telemetry: TelemetryLoadState;
  readonly selectedCategory: BudgetCategoryId | "ALL";
  readonly onSelectCategory: (cat: BudgetCategoryId | "ALL") => void;
  readonly onRetry: () => void;
}

export function AuditLedgerSection({
  copy,
  categoryNames,
  stateLabels,
  telemetry,
  selectedCategory,
  onSelectCategory,
  onRetry,
}: AuditLedgerSectionProps) {
  const expenses = telemetry.status === "ready" ? telemetry.registry.expenses : [];
  const filteredExpenses =
    selectedCategory === "ALL"
      ? expenses
      : expenses.filter((entry) => entry.category === selectedCategory);

  const contractConnected =
    telemetry.status === "ready" && telemetry.registry.contractAddress !== null;

  return (
    <section
      id="ledger"
      aria-labelledby="ledger-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
              {copy.sectionLabel}
            </p>
            <h2
              id="ledger-heading"
              className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
            >
              {copy.heading}
            </h2>
            <p className="mt-4 max-w-[680px] text-sm font-light text-[#B8B4AC] sm:text-base">
              {copy.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            disabled={telemetry.status === "loading"}
            className="inline-flex w-max items-center gap-2 rounded-lg border border-[#272727] bg-[#181818] px-3 py-2 text-sm font-semibold text-[#F5F3EE] hover:bg-[#272727] active:scale-[0.98] disabled:opacity-50 fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
          >
            <ArrowsClockwise
              size={16}
              weight="light"
              className={telemetry.status === "loading" ? "animate-spin text-[#D4B886]" : "text-[#D4B886]"}
              aria-hidden="true"
            />
            <span>{copy.refreshLabel}</span>
          </button>
        </div>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="mt-10 rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
          <div className="rounded-lg border border-[#272727] bg-[#131209]/95 p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-[#272727] pb-6 md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#1F1F1F] text-[#D4B886]">
                  <Wallet size={20} weight="light" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#F5F3EE]">
                    {copy.walletTelemetryTitle}
                  </h3>
                  <a
                    href={SOCIAL_LINKS.etherscanWalletUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#9B9B9B] hover:text-[#D4B886] fluid-transition"
                  >
                    <span>{BORROWER_WALLET}</span>
                    <ArrowUpRight size={12} weight="light" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#272727] bg-[#181818] px-3 py-1 font-mono text-xs text-[#D4B886]">
                  {contractConnected ? copy.contractVerifiedTag : copy.contractPendingTag}
                </span>
                {telemetry.status === "ready" && (
                  <span className="rounded-full border border-[#272727] bg-[#1F1F1F] px-3 py-1 font-mono text-xs text-[#F5F3EE]">
                    {stateLabels[telemetry.registry.state]}
                  </span>
                )}
              </div>
            </div>

            {telemetry.status === "loading" && (
              <div
                aria-busy="true"
                aria-label="Loading Ethereum Mainnet telemetry"
                className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                {[0, 1, 2, 3].map((slot) => (
                  <div
                    key={slot}
                    className="rounded-lg border border-[#272727] bg-[#181818] p-4"
                  >
                    <div className="h-3 w-20 animate-pulse rounded bg-[#272727]" />
                    <div className="mt-3 h-6 w-28 animate-pulse rounded bg-[#272727]" />
                  </div>
                ))}
              </div>
            )}

            {telemetry.status === "error" && (
              <div
                role="alert"
                className="mt-6 flex flex-col items-start justify-between gap-4 rounded-lg border border-[#272727] bg-[#1F1F1F] p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <WarningOctagon
                    size={20}
                    weight="light"
                    className="mt-0.5 shrink-0 text-[#D4B886]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-normal text-[#F5F3EE]">{copy.errorTitle}</p>
                    <p className="mt-1 font-mono text-xs text-[#9B9B9B]">{telemetry.message}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onRetry}
                  className="shrink-0 rounded-lg border border-[#272727] bg-[#181818] px-3 py-2 text-sm font-semibold text-[#D4B886] hover:bg-[#272727] active:scale-[0.98] fluid-transition"
                >
                  {copy.retryLabel}
                </button>
              </div>
            )}

            {telemetry.status === "ready" && (
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg border border-[#272727] bg-[#181818] p-4">
                  <p className="text-xs font-light text-[#9B9B9B]">{copy.ethBalanceLabel}</p>
                  <p className="mt-2 font-mono text-xl font-normal text-[#F5F3EE]">
                    {telemetry.wallet.ethBalanceFormatted} ETH
                  </p>
                </div>
                <div className="rounded-lg border border-[#272727] bg-[#181818] p-4">
                  <p className="text-xs font-light text-[#9B9B9B]">{copy.usdcBalanceLabel}</p>
                  <p className="mt-2 font-mono text-xl font-normal text-[#D4B886]">
                    {telemetry.wallet.usdcBalanceFormatted} USDC
                  </p>
                </div>
                <div className="rounded-lg border border-[#272727] bg-[#181818] p-4">
                  <p className="text-xs font-light text-[#9B9B9B]">{copy.txCountLabel}</p>
                  <p className="mt-2 font-mono text-xl font-normal text-[#F5F3EE]">
                    {telemetry.wallet.transactionCount.toLocaleString("en-US")}
                  </p>
                </div>
                <div className="rounded-lg border border-[#272727] bg-[#181818] p-4">
                  <p className="text-xs font-light text-[#9B9B9B]">{copy.gasLabel}</p>
                  <p className="mt-2 font-mono text-xl font-normal text-[#F5F3EE]">
                    {telemetry.wallet.gasGweiFormatted} Gwei
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectCategory("ALL")}
                className={`rounded-full border px-3 py-1 text-xs font-normal fluid-transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                  selectedCategory === "ALL"
                    ? "border-[#D4B886] bg-[#272727] text-[#F5F3EE]"
                    : "border-[#272727] bg-[#181818] text-[#9B9B9B] hover:text-[#F5F3EE]"
                }`}
              >
                {copy.allFilter}
              </button>
              {BASE_ALLOCATIONS.map((bucket) => (
                <button
                  key={bucket.id}
                  type="button"
                  onClick={() => onSelectCategory(bucket.id)}
                  className={`rounded-full border px-3 py-1 text-xs font-normal fluid-transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                    selectedCategory === bucket.id
                      ? "border-[#D4B886] bg-[#272727] text-[#F5F3EE]"
                      : "border-[#272727] bg-[#181818] text-[#9B9B9B] hover:text-[#F5F3EE]"
                  }`}
                >
                  {categoryNames[bucket.id].name}
                </button>
              ))}
            </div>

            {filteredExpenses.length > 0 ? (
              <div className="mt-6 overflow-x-auto rounded-lg border border-[#272727] bg-[#181818]">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#272727] text-xs font-light text-[#9B9B9B]">
                      <th className="px-4 py-3 font-normal">{copy.tableHeaders.id}</th>
                      <th className="px-4 py-3 font-normal">{copy.tableHeaders.category}</th>
                      <th className="px-4 py-3 font-normal">{copy.tableHeaders.vendor}</th>
                      <th className="px-4 py-3 font-normal">{copy.tableHeaders.amount}</th>
                      <th className="px-4 py-3 font-normal">{copy.tableHeaders.proof}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#272727] text-sm font-light">
                    {filteredExpenses.map((entry) => (
                      <tr key={entry.id} className="hover:bg-[#1F1F1F] fluid-transition">
                        <td className="px-4 py-3 font-mono text-xs text-[#9B9B9B]">
                          #{entry.id + 1}
                        </td>
                        <td className="px-4 py-3 text-[#F5F3EE]">
                          {categoryNames[entry.category].name}
                        </td>
                        <td className="px-4 py-3 text-[#B8B4AC]">{entry.vendor}</td>
                        <td className="px-4 py-3 font-mono text-[#D4B886]">
                          {entry.amountUsdc.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3 font-mono text-xs">
                            <a
                              href={`https://etherscan.io/tx/${entry.paymentTxHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#F5F3EE] hover:text-[#D4B886]"
                            >
                              <span>{shortenAddress(entry.paymentTxHash)}</span>
                              <ArrowUpRight size={12} weight="light" aria-hidden="true" />
                            </a>
                            <a
                              href={`https://ipfs.io/ipfs/${entry.receiptIpfsCid}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#D4B886] hover:text-[#F5F3EE]"
                            >
                              <FileText size={14} weight="light" aria-hidden="true" />
                              <span>IPFS</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-[#272727] bg-[#181818] p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-[560px]">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#D4B886]">
                      {copy.contractStatusTitle}
                    </p>
                    <h4 className="mt-2 text-xl font-light text-[#F5F3EE]">{copy.emptyTitle}</h4>
                    <p className="mt-3 text-sm font-light text-[#B8B4AC]">{copy.emptyBody}</p>
                  </div>
                  <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-4 md:min-w-[260px]">
                    <p className="font-mono text-xs text-[#9B9B9B]">LoanTransparencyRegistry.sol</p>
                    <p className="mt-2 font-mono text-2xl font-normal text-[#F5F3EE]">0.00 USDC</p>
                    <p className="mt-1 font-mono text-xs text-[#D4B886]">{copy.ofCapLabel}</p>
                  </div>
                </div>
                <ul className="mt-6 grid grid-cols-1 gap-3 border-t border-[#272727] pt-6 md:grid-cols-3">
                  {copy.emptyChecklist.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs font-light text-[#B8B4AC]"
                    >
                      <CheckCircle
                        size={16}
                        weight="light"
                        className="mt-0.5 shrink-0 text-[#D4B886]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
