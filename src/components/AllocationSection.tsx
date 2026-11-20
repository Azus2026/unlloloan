import { Coins, Cpu, GasPump, HardDrives, FileCode } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import {
  TARGET_PRINCIPAL_USDC,
  type BudgetAllocationItem,
  type BudgetCategoryId,
} from "../domain/loan";
import { Reveal } from "./Reveal";

interface AllocationSectionProps {
  readonly copy: CopyBundle["allocation"];
  readonly allocations: readonly BudgetAllocationItem[];
  readonly onSelectCategory: (category: BudgetCategoryId) => void;
}

const CATEGORY_ICONS = {
  ARBITRAGE_LIQUIDITY: Coins,
  RPC_WEBSOCKETS: Cpu,
  GAS_PRIVATE_BUNDLES: GasPump,
  DEDICATED_VPS: HardDrives,
  TRANSPARENCY_PORTAL: FileCode,
} as const;

const BAR_COLORS: Record<BudgetCategoryId, string> = {
  ARBITRAGE_LIQUIDITY: "bg-[#D4B886]",
  RPC_WEBSOCKETS: "bg-[#E5E0D6]",
  GAS_PRIVATE_BUNDLES: "bg-[#9E9382]",
  DEDICATED_VPS: "bg-[#736752]",
  TRANSPARENCY_PORTAL: "bg-[#4D4840]",
};

export function AllocationSection({
  copy,
  allocations,
  onSelectCategory,
}: AllocationSectionProps) {
  const totalSpent = allocations.reduce((sum, item) => sum + item.spentUsdc, 0);

  return (
    <section
      id="allocation"
      aria-labelledby="allocation-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <Reveal>
        <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
          {copy.sectionLabel}
        </p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2
              id="allocation-heading"
              className="max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
            >
              {copy.heading}
            </h2>
            <p className="mt-4 max-w-[680px] text-sm font-light text-[#B8B4AC] sm:text-base">
              {copy.subtitle}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-[#272727] bg-[#131209]/90 p-2">
            <div className="rounded-lg border border-[#272727] bg-[#181818] px-4 py-3">
              <p className="text-xs font-light text-[#9B9B9B]">{copy.totalLabel}</p>
              <p className="mt-1 font-mono text-2xl font-normal text-[#F5F3EE]">
                {TARGET_PRINCIPAL_USDC.toLocaleString("en-US")} USDC
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="mt-10 rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
          <div className="rounded-lg border border-[#272727] bg-[#131209]/90 p-6">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-[#272727]">
              {allocations.map((item) => (
                <div
                  key={item.id}
                  style={{ width: `${item.sharePercent}%` }}
                  className={`${BAR_COLORS[item.id]} h-full fluid-transition`}
                  title={`${copy.categories[item.id].name} (${item.sharePercent}%)`}
                />
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {allocations.map((item) => {
                const Icon = CATEGORY_ICONS[item.id];
                const meta = copy.categories[item.id];
                const spentRatio = item.capUsdc > 0 ? Math.min(100, (item.spentUsdc / item.capUsdc) * 100) : 0;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectCategory(item.id)}
                    className="group w-full rounded-lg border border-[#272727] bg-[#181818] p-4 text-left hover:bg-[#1F1F1F] active:scale-[0.99] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  >
                    <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-12">
                      <div className="flex items-start gap-3 lg:col-span-6">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#272727] bg-[#1F1F1F] text-[#D4B886]">
                          <Icon size={18} weight="light" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${BAR_COLORS[item.id]}`}
                              aria-hidden="true"
                            />
                            <h3 className="text-base font-normal text-[#F5F3EE] group-hover:text-[#D4B886] fluid-transition">
                              {meta.name}
                            </h3>
                          </div>
                          <p className="mt-1 text-xs font-light text-[#9B9B9B]">{meta.detail}</p>
                          <p className="mt-2 font-mono text-xs font-light text-[#7E7A72]">
                            {meta.providers}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 lg:col-span-6">
                        <div>
                          <p className="text-xs font-light text-[#9B9B9B]">{copy.shareColumn}</p>
                          <p className="mt-1 font-mono text-sm font-normal text-[#F5F3EE]">
                            {item.sharePercent}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-light text-[#9B9B9B]">{copy.capColumn}</p>
                          <p className="mt-1 font-mono text-sm font-normal text-[#D4B886]">
                            {item.capUsdc.toLocaleString("en-US")} USDC
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-light text-[#9B9B9B]">{copy.spentColumn}</p>
                          <p className="mt-1 font-mono text-sm font-normal text-[#F5F3EE]">
                            {item.spentUsdc.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-[#272727]">
                      <div
                        style={{ width: `${spentRatio}%` }}
                        className="h-full bg-[#D4B886] fluid-transition"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-2 rounded-lg border border-[#272727] bg-[#1F1F1F] px-4 py-3 font-mono text-xs sm:flex-row sm:items-center">
              <span className="text-[#9B9B9B]">{copy.totalLabel}</span>
              <div className="flex items-center gap-6">
                <span className="text-[#D4B886]">
                  {copy.capPrefix} {TARGET_PRINCIPAL_USDC.toLocaleString("en-US")}.00 USDC
                </span>
                <span className="text-[#F5F3EE]">
                  {copy.loggedPrefix}{" "}
                  {totalSpent.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  USDC
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
