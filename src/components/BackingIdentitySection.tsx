import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code,
  CompassTool,
  Copy,
  Hammer,
  TelegramLogo,
  XLogo,
} from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import { BORROWER_WALLET, SOCIAL_LINKS } from "../domain/loan";
import { Reveal } from "./Reveal";

interface BackingIdentitySectionProps {
  readonly copy: CopyBundle["backing"];
}

const STREAM_ICONS = [Code, CompassTool, Hammer] as const;

export function BackingIdentitySection({ copy }: BackingIdentitySectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(BORROWER_WALLET);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="repayment"
      aria-labelledby="repayment-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <Reveal>
        <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
          {copy.sectionLabel}
        </p>
        <h2
          id="repayment-heading"
          className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[680px] text-sm font-light text-[#B8B4AC] sm:text-base">
          {copy.subtitle}
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {copy.streams.map((stream, index) => {
          const Icon = STREAM_ICONS[index] ?? Code;
          return (
            <Reveal key={stream.title} delayMs={index * 90}>
              <article className="h-full rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
                <div className="flex h-full flex-col justify-between rounded-lg border border-[#272727] bg-[#1F1F1F]/75 p-6">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#131209] text-[#D4B886]">
                        <Icon size={20} weight="light" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-[#272727] bg-[#181818] px-3 py-1 font-mono text-xs text-[#9B9B9B]">
                        {stream.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-normal text-[#F5F3EE]">{stream.title}</h3>
                    <p className="mt-3 text-sm font-light text-[#B8B4AC]">{stream.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delayMs={120}>
        <div className="mt-8 rounded-2xl border border-[#272727] bg-[#131209]/90 p-2 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-6 rounded-lg border border-[#272727] bg-[#181818]/90 p-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h3 className="text-xl font-light text-[#F5F3EE]">{copy.directChannelsTitle}</h3>
              <p className="mt-2 max-w-[520px] text-sm font-light text-[#B8B4AC]">
                {copy.directChannelsSubtitle}
              </p>

              <div className="mt-6 rounded-lg border border-[#272727] bg-[#131209] p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#9B9B9B]">Ethereum Mainnet</span>
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className="inline-flex items-center gap-1 rounded border border-[#272727] bg-[#181818] px-2 py-1 font-mono text-xs text-[#D4B886] hover:bg-[#272727] active:scale-[0.98] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
                  >
                    {copied ? (
                      <>
                        <Check size={12} weight="light" aria-hidden="true" />
                        <span>{copy.copiedLabel}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} weight="light" aria-hidden="true" />
                        <span>{copy.copyAddressLabel}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 break-all font-mono text-xs text-[#F5F3EE]">{BORROWER_WALLET}</p>
              </div>
            </div>

            <div className="space-y-3 lg:col-span-6">
              <a
                href={SOCIAL_LINKS.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-[#272727] bg-[#1F1F1F] px-4 py-4 hover:bg-[#272727] active:scale-[0.99] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              >
                <div className="flex items-center gap-3">
                  <XLogo size={20} weight="light" className="text-[#D4B886]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-normal text-[#F5F3EE]">X (Twitter)</p>
                    <p className="font-mono text-xs text-[#9B9B9B]">{SOCIAL_LINKS.xHandle}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} weight="light" className="text-[#9B9B9B]" aria-hidden="true" />
              </a>

              <a
                href={SOCIAL_LINKS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-[#272727] bg-[#1F1F1F] px-4 py-4 hover:bg-[#272727] active:scale-[0.99] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
              >
                <div className="flex items-center gap-3">
                  <TelegramLogo
                    size={20}
                    weight="light"
                    className="text-[#D4B886]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-normal text-[#F5F3EE]">Telegram</p>
                    <p className="font-mono text-xs text-[#9B9B9B]">{SOCIAL_LINKS.telegramHandle}</p>
                  </div>
                </div>
                <ArrowUpRight size={16} weight="light" className="text-[#9B9B9B]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
