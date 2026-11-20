import { useState } from "react";
import { ArrowUp, ArrowUpRight, CheckCircle, X } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import { BORROWER_WALLET, SOCIAL_LINKS, UNLLOO_LOAN_URL, shortenAddress } from "../domain/loan";
import { Reveal } from "./Reveal";

interface RiskCtaFooterProps {
  readonly riskReversal: CopyBundle["riskReversal"];
  readonly footer: CopyBundle["footer"];
}

type LegalModalType = "privacy" | "terms" | null;

export function RiskCtaFooter({ riskReversal, footer }: RiskCtaFooterProps) {
  const [modal, setModal] = useState<LegalModalType>(null);

  const modalTitle = modal === "privacy" ? footer.privacyTitle : footer.termsTitle;
  const modalBody = modal === "privacy" ? footer.privacyBody : footer.termsBody;

  return (
    <>
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="rounded-2xl border border-[#272727] bg-[#131209]/90 p-2 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-8 rounded-lg border border-[#272727] bg-[#181818]/90 p-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
                  {riskReversal.sectionLabel}
                </p>
                <h2 className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl">
                  {riskReversal.heading}
                </h2>
                <ul className="mt-6 space-y-3">
                  {riskReversal.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm font-light text-[#D5D1C8]"
                    >
                      <CheckCircle
                        size={18}
                        weight="light"
                        className="mt-0.5 shrink-0 text-[#D4B886]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[#272727] bg-[#1F1F1F] p-6 lg:col-span-5">
                <h3 className="text-2xl font-extralight tracking-tight text-[#F5F3EE]">
                  {riskReversal.finalCtaHeading}
                </h3>
                <p className="mt-3 text-sm font-light text-[#B8B4AC]">
                  {riskReversal.finalCtaSubheading}
                </p>
                <div className="mt-6">
                  <a
                    href={UNLLOO_LOAN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#D4B886] px-3 py-2 text-base font-semibold text-black hover:bg-[#E2CA9E] active:scale-[0.98] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F1F1F]"
                  >
                    <span>{riskReversal.primaryCta}</span>
                    <ArrowUpRight size={18} weight="light" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-8">
        <div className="rounded-2xl border border-[#272727] bg-[#131209]/85 p-6 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-light text-[#F5F3EE]">{footer.note}</p>
              <p className="mt-1 font-mono text-xs text-[#9B9B9B]">
                {BORROWER_WALLET} · Ethereum Mainnet
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-light text-[#9B9B9B]">
              <a
                href={SOCIAL_LINKS.etherscanWalletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4B886] fluid-transition"
              >
                Etherscan ({shortenAddress(BORROWER_WALLET)})
              </a>
              <a
                href={SOCIAL_LINKS.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4B886] fluid-transition"
              >
                X {SOCIAL_LINKS.xHandle}
              </a>
              <a
                href={SOCIAL_LINKS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4B886] fluid-transition"
              >
                Telegram {SOCIAL_LINKS.telegramHandle}
              </a>
              <button
                type="button"
                onClick={() => setModal("privacy")}
                className="hover:text-[#D4B886] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded"
              >
                {footer.privacyLink}
              </button>
              <button
                type="button"
                onClick={() => setModal("terms")}
                className="hover:text-[#D4B886] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded"
              >
                {footer.termsLink}
              </button>
              <a
                href="#overview"
                className="inline-flex items-center gap-1 text-[#D4B886] hover:text-[#F5F3EE] fluid-transition"
              >
                <span>{footer.backToTop}</span>
                <ArrowUp size={12} weight="light" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-xl"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-[#272727] bg-[#131209] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-lg border border-[#272727] bg-[#181818] p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 id="legal-modal-title" className="text-xl font-light text-[#F5F3EE]">
                  {modalTitle}
                </h2>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  aria-label={footer.modalClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#272727] bg-[#1F1F1F] text-[#9B9B9B] hover:text-[#F5F3EE] fluid-transition"
                >
                  <X size={16} weight="light" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm font-light text-[#B8B4AC]">
                {modalBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="rounded-lg border border-[#272727] bg-[#272727] px-3 py-2 text-sm font-semibold text-[#F5F3EE] hover:bg-[#313131] active:scale-[0.98] fluid-transition"
                >
                  {footer.modalClose}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
