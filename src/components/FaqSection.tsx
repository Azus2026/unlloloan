import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import { Reveal } from "./Reveal";

interface FaqSectionProps {
  readonly copy: CopyBundle["faq"];
}

export function FaqSection({ copy }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <Reveal>
        <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
          {copy.sectionLabel}
        </p>
        <h2
          id="faq-heading"
          className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
        >
          {copy.heading}
        </h2>
      </Reveal>

      <div className="mt-10 space-y-3">
        {copy.items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={item.question} delayMs={index * 40}>
              <div className="rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
                <div className="rounded-lg border border-[#272727] bg-[#1F1F1F]/70">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-normal text-[#F5F3EE] hover:text-[#D4B886] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] rounded-lg"
                    >
                      <span>{item.question}</span>
                      <Plus
                        size={18}
                        weight="light"
                        aria-hidden="true"
                        className={`shrink-0 text-[#D4B886] fluid-transition ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      />
                    </button>
                  </h3>
                  <div
                    className={`grid fluid-transition ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm font-light text-[#B8B4AC]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
