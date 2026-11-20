import { Buildings, CalendarCheck, Scales, ShieldCheck, WarningCircle, CheckSquare } from "@phosphor-icons/react";
import type { CopyBundle } from "../content/copy";
import { Reveal } from "./Reveal";

interface ProblemBenefitsSectionProps {
  readonly problemSolution: CopyBundle["problemSolution"];
  readonly benefits: CopyBundle["benefits"];
}

const BENEFIT_ICONS = [ShieldCheck, Scales, Buildings, CalendarCheck] as const;

export function ProblemBenefitsSection({
  problemSolution,
  benefits,
}: ProblemBenefitsSectionProps) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 space-y-24">
      <section aria-labelledby="problem-solution-heading">
        <Reveal>
          <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
            {problemSolution.sectionLabel}
          </p>
          <h2
            id="problem-solution-heading"
            className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
          >
            {problemSolution.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal delayMs={80}>
            <article className="h-full rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md">
              <div className="h-full rounded-lg border border-[#272727] bg-[#1F1F1F]/80 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#181818] text-[#9B9B9B]">
                    <WarningCircle size={20} weight="light" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-normal text-[#F5F3EE]">
                    {problemSolution.problemTitle}
                  </h3>
                </div>
                <p className="mt-4 text-sm font-light text-[#B8B4AC]">
                  {problemSolution.problemBody}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delayMs={160}>
            <article className="h-full rounded-2xl border border-[#272727] bg-[#131209]/90 p-2 backdrop-blur-md">
              <div className="h-full rounded-lg border border-[#272727] bg-[#181818]/90 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#1F1F1F] text-[#D4B886]">
                    <CheckSquare size={20} weight="light" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-normal text-[#F5F3EE]">
                    {problemSolution.solutionTitle}
                  </h3>
                </div>
                <p className="mt-4 text-sm font-light text-[#D5D1C8]">
                  {problemSolution.solutionBody}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="benefits-heading">
        <Reveal>
          <p className="font-mono text-xs font-light uppercase tracking-widest text-[#D4B886]">
            {benefits.sectionLabel}
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 max-w-[680px] text-3xl font-extralight tracking-tight text-[#F5F3EE] sm:text-4xl"
          >
            {benefits.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {benefits.items.map((item, idx) => {
            const Icon = BENEFIT_ICONS[idx] ?? ShieldCheck;
            return (
              <Reveal key={item.title} delayMs={idx * 80}>
                <article className="h-full rounded-2xl border border-[#272727] bg-[#181818]/85 p-2 backdrop-blur-md hover:border-[#313131] fluid-transition">
                  <div className="flex h-full flex-col justify-between rounded-lg border border-[#272727] bg-[#1F1F1F]/75 p-6">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#272727] bg-[#131209] text-[#D4B886]">
                          <Icon size={20} weight="light" aria-hidden="true" />
                        </div>
                        <span className="rounded-full border border-[#272727] bg-[#181818] px-3 py-1 font-mono text-xs font-light text-[#D4B886]">
                          {item.metric}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-normal tracking-tight text-[#F5F3EE]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm font-light text-[#B8B4AC]">{item.detail}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
