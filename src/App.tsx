import { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { AllocationSection } from "./components/AllocationSection";
import { AuditLedgerSection } from "./components/AuditLedgerSection";
import { BackingIdentitySection } from "./components/BackingIdentitySection";
import { DiagonalWaveBackground } from "./components/DiagonalWaveBackground";
import { FaqSection } from "./components/FaqSection";
import { FluidIslandNav } from "./components/FluidIslandNav";
import { HeroSection } from "./components/HeroSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { NotFoundView } from "./components/NotFoundView";
import { ProblemBenefitsSection } from "./components/ProblemBenefitsSection";
import { RiskCtaFooter } from "./components/RiskCtaFooter";
import { TaglineRevealSection } from "./components/TaglineRevealSection";
import { COPY } from "./content/copy";
import {
  BASE_ALLOCATIONS,
  type BudgetCategoryId,
  type Locale,
  type TelemetryLoadState,
} from "./domain/loan";
import { fetchMainnetAuditData } from "./lib/ethereumClient";

const SECTION_IDS = ["overview", "allocation", "ledger", "repayment", "faq"] as const;

function resolveInitialLocale(): Locale {
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get("lang");
  if (queryLang === "es" || queryLang === "en") return queryLang;

  try {
    const stored = window.localStorage.getItem("unlloo_audit_locale");
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // Ignore storage restriction errors in sandboxed contexts.
  }

  return "es";
}

export function App() {
  const [locale, setLocale] = useState<Locale>(resolveInitialLocale);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategoryId | "ALL">("ALL");
  const [telemetry, setTelemetry] = useState<TelemetryLoadState>({ status: "loading" });
  const [pathname, setPathname] = useState<string>(() => window.location.pathname);

  const copy = COPY[locale];

  const handleLocaleChange = (next: Locale) => {
    setLocale(next);
    document.documentElement.lang = next;
    try {
      window.localStorage.setItem("unlloo_audit_locale", next);
    } catch {
      // Ignore storage write errors.
    }
  };

  const syncTelemetry = useCallback(async () => {
    setTelemetry({ status: "loading" });
    try {
      const data = await fetchMainnetAuditData();
      setTelemetry({
        status: "ready",
        wallet: data.wallet,
        registry: data.registry,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "RPC endpoint unavailable";
      setTelemetry({ status: "error", message });
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    void syncTelemetry();
  }, [syncTelemetry]);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/index.html") return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.15, 0.4], rootMargin: "-20% 0px -45% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const handleSelectAllocationCategory = (category: BudgetCategoryId) => {
    setSelectedCategory(category);
    document.getElementById("ledger")?.scrollIntoView({ behavior: "smooth" });
  };

  const isRootRoute = pathname === "/" || pathname === "/index.html";

  if (!isRootRoute) {
    return (
      <div className="relative min-h-screen bg-black text-[#F5F3EE]">
        <DiagonalWaveBackground />
        <NotFoundView
          copy={copy.notFound}
          onGoHome={() => {
            window.history.pushState({}, "", "/");
            setPathname("/");
          }}
        />
        <Analytics />
      </div>
    );
  }

  const allocations =
    telemetry.status === "ready" ? telemetry.registry.allocations : BASE_ALLOCATIONS;

  return (
    <div className="relative min-h-screen bg-black text-[#F5F3EE]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-[#D4B886] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        {copy.skipToContent}
      </a>

      <DiagonalWaveBackground />

      <FluidIslandNav
        copy={copy.nav}
        locale={locale}
        onLocaleChange={handleLocaleChange}
        activeSection={activeSection}
      />

      <main id="main-content" className="relative z-10">
        <HeroSection
          copy={copy.hero}
          stateLabels={copy.stateLabels}
          telemetry={telemetry}
        />

        <ProblemBenefitsSection
          problemSolution={copy.problemSolution}
          benefits={copy.benefits}
        />

        <TaglineRevealSection
          lines={copy.taglineReveal.lines}
          caption={copy.taglineReveal.caption}
        />

        <AllocationSection
          copy={copy.allocation}
          allocations={allocations}
          onSelectCategory={handleSelectAllocationCategory}
        />

        <AuditLedgerSection
          copy={copy.ledger}
          categoryNames={copy.allocation.categories}
          stateLabels={copy.stateLabels}
          telemetry={telemetry}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onRetry={() => void syncTelemetry()}
        />

        <HowItWorksSection copy={copy.howItWorks} />

        <BackingIdentitySection copy={copy.backing} />

        <FaqSection copy={copy.faq} />

        <RiskCtaFooter
          riskReversal={copy.riskReversal}
          footer={copy.footer}
        />
      </main>

      <Analytics />
    </div>
  );
}

export default App;
