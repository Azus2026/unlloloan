import { ArrowUpRight, CheckCircle, ShieldCheck, Vault } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import {
  BASE_ALLOCATIONS,
  BORROWER_WALLET,
  SOCIAL_LINKS,
  TARGET_PRINCIPAL_USDC,
  UNLLOO_LOAN_URL,
  shortenAddress,
  type TelemetryLoadState,
} from "../domain/loan";
import { Reveal } from "./Reveal";

interface HeroSectionProps {
  readonly copy: CopyBundle["hero"];
  readonly stateLabels: CopyBundle["stateLabels"];
  readonly telemetry: TelemetryLoadState;
}

const SEGMENT_TONES = [
  "bg-[#D4B886]",
  "bg-[#E5E0D6]",
  "bg-[#9E9382]",
  "bg-[#736752]",
  "bg-[#4D4840]",
] as const;

export function HeroSection({ copy, stateLabels, telemetry }: HeroSectionProps) {
  const currentState =
    telemetry.status === "ready" ? telemetry.registry.state : "PRE_FUNDING";

  return (
    <section
      id="overview"
      className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#272727] bg-[#131209]/85 px-3 py-1 font-mono text-xs font-light tracking-wide text-[#D4B886]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4B886]" aria-hidden="true" />
              <span>{copy.eyebrow}</span>
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="mt-6 max-w-[680px] text-4xl font-extralight tracking-tight hero-gradient-text lg:text-5xl">
              <span className="block">{copy.headlineLine1}</span>
              <span className="block mt-2">{copy.headlineLine2}</span>
            </h1>
          </Reveal>

          <Reveal delayMs={160}>
            <p className="mt-6 max-w-[680px] text-base font-light text-[#B8B4AC] sm:text-lg">
              {copy.subheadline}
            </p>
          </Reveal>

          <Reveal delayMs={240}>
            <div className="mt-8 flex items-center">
              <a
                href={UNLLOO_LOAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4B886] px-3 py-2 text-base font-semibold text-black hover:bg-[#E2CA9E] active:scale-[0.98] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <span>{copy.primaryCta}</span>
                <ArrowUpRight size={18} weight="light" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={320}>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              {copy.proofItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs font-light text-[#9B9B9B]">
                  <CheckCircle
                    size={16}
                    weight="light"
                    className="shrink-0 text-[#D4B886]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delayMs={200}>
            <div className="rounded-2xl border border-[#272727] bg-[#131209]/85 p-2 backdrop-blur-xl">
              <div className="rounded-lg border border-[#272727] bg-[#181818]/90 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#1F1F1F] text-[#D4B886]">
                      <Vault size={20} weight="light" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-[#F5F3EE]">{copy.cardTitle}</h2>
                      <p className="text-xs font-light text-[#9B9B9B]">{copy.cardSubtitle}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#272727] bg-[#1F1F1F] px-3 py-1 font-mono text-xs font-normal text-[#D4B886]">
                    {stateLabels[currentState]}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-3">
                    <p className="text-xs font-light text-[#9B9B9B]">{copy.targetLabel}</p>
                    <p className="mt-1 font-mono text-lg font-normal text-[#F5F3EE]">
                      {TARGET_PRINCIPAL_USDC.toLocaleString("en-US")} USDC
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-3">
                    <p className="text-xs font-light text-[#9B9B9B]">{copy.aprLabel}</p>
                    <p className="mt-1 font-mono text-lg font-normal text-[#D4B886]">{copy.aprValue}</p>
                  </div>
                  <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-3">
                    <p className="text-xs font-light text-[#9B9B9B]">{copy.termLabel}</p>
                    <p className="mt-1 font-mono text-sm font-normal text-[#F5F3EE]">{copy.termValue}</p>
                  </div>
                  <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-3">
                    <p className="text-xs font-light text-[#9B9B9B]">{copy.windowLabel}</p>
                    <p className="mt-1 font-mono text-sm font-normal text-[#F5F3EE]">{copy.windowValue}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div
                    className="flex h-2 w-full overflow-hidden rounded-full bg-[#272727]"
                    aria-hidden="true"
                  >
                    {BASE_ALLOCATIONS.map((bucket, idx) => (
                      <div
                        key={bucket.id}
                        style={{ width: `${bucket.sharePercent}%` }}
                        className={`${SEGMENT_TONES[idx] ?? "bg-[#D4B886]"} h-full`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9B9B9B]">
                    {copy.barLegend.map((entry) => (
                      <span key={entry}>{entry}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-[#272727] bg-[#131209] p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-[#9B9B9B]">
                      <ShieldCheck size={16} weight="light" className="text-[#D4B886]" aria-hidden="true" />
                      <span>{copy.walletLabel}</span>
                    </div>
                    <a
                      href={SOCIAL_LINKS.etherscanWalletUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#D4B886] hover:text-[#F5F3EE] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                    >
                      <span>{copy.viewOnEtherscan}</span>
                      <ArrowUpRight size={12} weight="light" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="mt-2 truncate font-mono text-xs text-[#F5F3EE]" title={BORROWER_WALLET}>
                    {BORROWER_WALLET}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[#272727] pt-3 font-mono text-xs">
                    <span className="text-[#9B9B9B]">{copy.liveBlockLabel}</span>
                    {telemetry.status === "loading" && (
                      <span className="inline-block h-4 w-24 animate-pulse rounded bg-[#272727]" />
                    )}
                    {telemetry.status === "ready" && (
                      <span className="text-[#F5F3EE]">
                        #{telemetry.wallet.blockNumber.toLocaleString("en-US")} · {shortenAddress(BORROWER_WALLET)}
                      </span>
                    )}
                    {telemetry.status === "error" && (
                      <span className="text-[#9B9B9B]">Ethereum Mainnet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
