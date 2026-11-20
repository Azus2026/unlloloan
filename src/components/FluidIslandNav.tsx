import { useEffect, useState } from "react";
import type { CopyBundle } from "../content/copy";
import type { Locale } from "../domain/loan";

interface FluidIslandNavProps {
  readonly copy: CopyBundle["nav"];
  readonly locale: Locale;
  readonly onLocaleChange: (next: Locale) => void;
  readonly activeSection: string;
}

const STAGGER_DELAYS = ["delay-100", "delay-150", "delay-200", "delay-250", "delay-300"] as const;

export function FluidIslandNav({
  copy,
  locale,
  onLocaleChange,
  activeSection,
}: FluidIslandNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4">
        <nav
          aria-label="Primary navigation"
          className="mt-6 mx-auto w-max max-w-full rounded-full border border-[#272727] bg-[#131209]/85 px-4 py-2 backdrop-blur-xl fluid-transition"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#overview"
              className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium tracking-wide text-[#F5F3EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886]"
            >
              <span className="h-2 w-2 rounded-full bg-[#D4B886]" aria-hidden="true" />
              <span>{copy.brand}</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {copy.links.map((link) => {
                const isCurrent = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isCurrent ? "location" : undefined}
                    className={`rounded-full px-3 py-1 text-sm font-light fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                      isCurrent
                        ? "bg-[#272727] text-[#F5F3EE]"
                        : "text-[#9B9B9B] hover:text-[#F5F3EE] hover:bg-[#1F1F1F]"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div
                role="group"
                aria-label="Language switcher"
                className="flex items-center rounded-full border border-[#272727] bg-[#181818] p-0.5"
              >
                <button
                  type="button"
                  onClick={() => onLocaleChange("en")}
                  className={`rounded-full px-2 py-1 font-mono text-xs font-medium fluid-transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                    locale === "en"
                      ? "bg-[#313131] text-[#D4B886]"
                      : "text-[#9B9B9B] hover:text-[#F5F3EE]"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLocaleChange("es")}
                  className={`rounded-full px-2 py-1 font-mono text-xs font-medium fluid-transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] ${
                    locale === "es"
                      ? "bg-[#313131] text-[#D4B886]"
                      : "text-[#9B9B9B] hover:text-[#F5F3EE]"
                  }`}
                >
                  ES
                </button>
              </div>

              <button
                type="button"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? copy.menuCloseLabel : copy.menuOpenLabel}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#272727] bg-[#181818] text-[#F5F3EE] hover:bg-[#272727] active:scale-[0.98] fluid-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B886] md:hidden"
              >
                <span
                  className={`absolute h-[1.5px] w-4 bg-[#F5F3EE] fluid-transition ${
                    menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 bg-[#F5F3EE] fluid-transition ${
                    menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl fluid-transition md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-6">
          <p className="font-mono text-xs tracking-widest uppercase text-[#D4B886]">
            {copy.networkBadge}
          </p>
          {copy.links.map((link, index) => {
            const delayClass = STAGGER_DELAYS[index] ?? "delay-300";
            return (
              <div key={link.id} className="overflow-hidden">
                <a
                  href={`#${link.id}`}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-3xl font-extralight tracking-tight text-[#F5F3EE] hover:text-[#D4B886] fluid-transition ${delayClass} ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                >
                  {link.label}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
