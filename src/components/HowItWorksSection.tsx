import type { CopyBundle } from "../content/copy";
import { Reveal } from "./Reveal";

interface HowItWorksSectionProps {
  readonly copy: CopyBundle["howItWorks"];
}

export function HowItWorksSection({ copy }: HowItWorksSectionProps) {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20"
    >
      <Reveal>
        <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
          {copy.sectionLabel}
        </p>
        <h2
          id="how-it-works-heading"
          className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
        >
          {copy.heading}
        </h2>
      </Reveal>

      <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {copy.steps.map((step, index) => (
          <Reveal key={step.number} delayMs={index * 100}>
            <li className="h-full rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
              <div className="flex h-full flex-col justify-between rounded-lg border border-[#272727] bg-[#1F1F1F]/75 p-6">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#131209] font-mono text-sm font-normal text-[#D4B886]">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-xl font-normal tracking-tight text-[#F5F3EE]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-light text-[#B8B4AC]">{step.body}</p>
                </div>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
