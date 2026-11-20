import { useEffect, useMemo, useRef, useState } from "react";

interface TaglineRevealSectionProps {
  readonly lines: readonly string[];
  readonly caption: string;
}

export function TaglineRevealSection({ lines, caption }: TaglineRevealSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeCount, setActiveCount] = useState(0);

  const flatWords = useMemo(() => {
    const items: { readonly lineIndex: number; readonly word: string; readonly globalIndex: number }[] = [];
    let idx = 0;
    lines.forEach((line, lineIndex) => {
      line.split(/\s+/).forEach((word) => {
        if (word.length > 0) {
          items.push({ lineIndex, word, globalIndex: idx });
          idx += 1;
        }
      });
    });
    return items;
  }, [lines]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setActiveCount(flatWords.length);
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let rafId = 0;
    let isVisible = false;

    const evaluateProgress = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startLine = viewportHeight * 0.86;
      const endLine = viewportHeight * 0.28;
      const raw = (startLine - rect.top) / Math.max(startLine - endLine, 1);
      const clamped = Math.max(0, Math.min(1, raw));
      const count = Math.round(clamped * flatWords.length);
      setActiveCount((prev) => (prev === count ? prev : count));
    };

    const tick = () => {
      evaluateProgress();
      if (isVisible) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            window.cancelAnimationFrame(rafId);
            rafId = window.requestAnimationFrame(tick);
          } else {
            window.cancelAnimationFrame(rafId);
            evaluateProgress();
          }
        }
      },
      { threshold: 0, rootMargin: "120px 0px 120px 0px" },
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, [flatWords.length]);

  const groupedByLine = useMemo(() => {
    return lines.map((_, lineIdx) => flatWords.filter((w) => w.lineIndex === lineIdx));
  }, [flatWords, lines]);

  return (
    <section
      ref={sectionRef}
      aria-label="Core accountability statement"
      className="relative z-10 mx-auto max-w-6xl px-6 py-24"
    >
      <div className="mx-auto max-w-[680px] text-center">
        <p className="font-sans text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl">
          {groupedByLine.map((words, lineIndex) => (
            <span key={lineIndex} className="block mb-3 last:mb-0">
              {words.map((item) => {
                const isActive = item.globalIndex < activeCount;
                return (
                  <span
                    key={item.globalIndex}
                    ref={(el) => {
                      wordRefs.current[item.globalIndex] = el;
                    }}
                    className={`inline-block mr-3 last:mr-0 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      isActive ? "opacity-100 text-[#F5F3EE]" : "opacity-30 text-[#F5F3EE]"
                    }`}
                  >
                    {item.word}
                  </span>
                );
              })}
            </span>
          ))}
        </p>
        <p className="mt-8 text-sm font-light tracking-wide text-[#D4B886]">
          {caption}
        </p>
      </div>
    </section>
  );
}
