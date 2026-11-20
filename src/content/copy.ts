import type { BudgetCategoryId, LoanLifecycleState, Locale } from "../domain/loan";

export interface CopyBundle {
  readonly skipToContent: string;
  readonly nav: {
    readonly brand: string;
    readonly links: readonly { readonly id: string; readonly label: string }[];
    readonly menuOpenLabel: string;
    readonly menuCloseLabel: string;
    readonly networkBadge: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly headlineLine1: string;
    readonly headlineLine2: string;
    readonly subheadline: string;
    readonly primaryCta: string;
    readonly proofItems: readonly string[];
    readonly cardTitle: string;
    readonly cardSubtitle: string;
    readonly targetLabel: string;
    readonly aprLabel: string;
    readonly aprValue: string;
    readonly termLabel: string;
    readonly termValue: string;
    readonly windowLabel: string;
    readonly windowValue: string;
    readonly barLegend: readonly string[];
    readonly liveBlockLabel: string;
    readonly walletLabel: string;
    readonly viewOnEtherscan: string;
  };
  readonly stateLabels: Record<LoanLifecycleState, string>;
  readonly problemSolution: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly problemTitle: string;
    readonly problemBody: string;
    readonly solutionTitle: string;
    readonly solutionBody: string;
  };
  readonly benefits: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly items: readonly {
      readonly title: string;
      readonly detail: string;
      readonly metric: string;
    }[];
  };
  readonly taglineReveal: {
    readonly lines: readonly string[];
    readonly caption: string;
  };
  readonly allocation: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly totalLabel: string;
    readonly capColumn: string;
    readonly spentColumn: string;
    readonly shareColumn: string;
    readonly capPrefix: string;
    readonly loggedPrefix: string;
    readonly categories: Record<
      BudgetCategoryId,
      { readonly name: string; readonly detail: string; readonly providers: string }
    >;
  };
  readonly ledger: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly refreshLabel: string;
    readonly allFilter: string;
    readonly walletTelemetryTitle: string;
    readonly ethBalanceLabel: string;
    readonly usdcBalanceLabel: string;
    readonly txCountLabel: string;
    readonly gasLabel: string;
    readonly contractStatusTitle: string;
    readonly contractPendingTag: string;
    readonly contractVerifiedTag: string;
    readonly tableHeaders: {
      readonly id: string;
      readonly category: string;
      readonly vendor: string;
      readonly amount: string;
      readonly proof: string;
    };
    readonly emptyTitle: string;
    readonly emptyBody: string;
    readonly ofCapLabel: string;
    readonly emptyChecklist: readonly string[];
    readonly errorTitle: string;
    readonly retryLabel: string;
  };
  readonly howItWorks: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly steps: readonly {
      readonly number: string;
      readonly title: string;
      readonly body: string;
    }[];
  };
  readonly backing: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly subtitle: string;
    readonly streams: readonly {
      readonly title: string;
      readonly body: string;
      readonly tag: string;
    }[];
    readonly directChannelsTitle: string;
    readonly directChannelsSubtitle: string;
    readonly copyAddressLabel: string;
    readonly copiedLabel: string;
  };
  readonly faq: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly items: readonly {
      readonly question: string;
      readonly answer: string;
    }[];
  };
  readonly riskReversal: {
    readonly sectionLabel: string;
    readonly heading: string;
    readonly points: readonly string[];
    readonly finalCtaHeading: string;
    readonly finalCtaSubheading: string;
    readonly primaryCta: string;
  };
  readonly footer: {
    readonly note: string;
    readonly privacyLink: string;
    readonly termsLink: string;
    readonly contractSourceLink: string;
    readonly backToTop: string;
    readonly modalClose: string;
    readonly privacyTitle: string;
    readonly privacyBody: readonly string[];
    readonly termsTitle: string;
    readonly termsBody: readonly string[];
  };
  readonly notFound: {
    readonly code: string;
    readonly title: string;
    readonly body: string;
    readonly backHome: string;
  };
}

export const COPY: Record<Locale, CopyBundle> = {
  en: {
    skipToContent: "Skip to main content",
    nav: {
      brand: "Unlloo Audit",
      links: [
        { id: "overview", label: "Overview" },
        { id: "allocation", label: "Allocation" },
        { id: "ledger", label: "Audit ledger" },
        { id: "repayment", label: "Repayment" },
        { id: "faq", label: "FAQ" },
      ],
      menuOpenLabel: "Open navigation menu",
      menuCloseLabel: "Close navigation menu",
      networkBadge: "Ethereum Mainnet",
    },
    hero: {
      eyebrow: "Ethereum Mainnet · 10,000 USDC Credit Transparency Portal",
      headlineLine1: "Fund market neutral arbitrage",
      headlineLine2: "with every invoice audited on chain",
      subheadline:
        "A 10,000 USDC Unlloo credit cycle over 90 to 95 days capped at 20% APR. Every dollar spent on RPC nodes, servers, gas, and liquidity is logged in a public smart contract and backed 100% by daily real world business revenue.",
      primaryCta: "Fund loan on Unlloo",
      proofItems: [
        "Wallet 0xf6Bb...AC87 verified on Ethereum Mainnet",
        "Zero directional leverage",
        "Real world repayment guarantee",
      ],
      cardTitle: "On chain vault snapshot",
      cardSubtitle: "Live Ethereum Mainnet telemetry and locked allocation caps",
      targetLabel: "Target principal",
      aprLabel: "Max APR cap",
      aprValue: "15% to 20%",
      termLabel: "Repayment horizon",
      termValue: "90 to 95 days",
      windowLabel: "Funding window",
      windowValue: "7 to 14 days",
      barLegend: ["60% Liquidity", "15% RPC", "14% Gas", "11% VPS & Audit"],
      liveBlockLabel: "Mainnet block",
      walletLabel: "Borrower address",
      viewOnEtherscan: "Inspect on Etherscan",
    },
    stateLabels: {
      PRE_FUNDING: "Pre funding",
      ACTIVE: "Active cycle",
      REPAID: "Repaid in full",
      DEFAULTED: "Defaulted",
    },
    problemSolution: {
      sectionLabel: "Structural thesis",
      heading: "Why uncollateralized crypto loans fail trust and how this structure fixes it",
      problemTitle: "The status quo in under collateralized DeFi",
      problemBody:
        "Lenders reject opaque trading requests because borrowed funds disappear into private wallets while leveraged directional bets risk total capital loss on a single volatility spike.",
      solutionTitle: "Audited infrastructure plus real world backing",
      solutionBody:
        "Capital is strictly segmented into five capped on chain buckets for a 3 month cycle. Every provider invoice publishes its transaction hash and IPFS receipt, while repayment is secured by three active daily revenue businesses outside crypto.",
    },
    benefits: {
      sectionLabel: "Lender protections",
      heading: "Four verifiable safeguards built into the cycle",
      items: [
        {
          title: "Immutable expense accountability",
          detail:
            "Every Alchemy, QuickNode, VPS, and gas outlay records exact USDC value, vendor name, timestamp, Ethereum transaction hash, and IPFS invoice proof inside LoanTransparencyRegistry.",
          metric: "5 capped buckets",
        },
        {
          title: "Zero directional market exposure",
          detail:
            "Operational capital stays in USDC stablecoins and hedged spread execution, while atomic flash loans across Aave V3, Balancer, and Uniswap V3 settle inside the same block.",
          metric: "0x leverage",
        },
        {
          title: "Independent real world repayment floor",
          detail:
            "Principal and interest repayment do not rely on bot profits. Daily billing across software and Web3 engineering, architectural design, and construction covers 100% of the obligation.",
          metric: "3 revenue lines",
        },
        {
          title: "Aligned 90 day liquidity horizon",
          detail:
            "Maturity matches the 3 month infrastructure contracts plus a 5 day settlement buffer. Early repayment on Unlloo remains open at any time with zero penalty.",
          metric: "90 to 95 days",
        },
      ],
    },
    taglineReveal: {
      lines: [
        "Every dollar allocated in public.",
        "Every invoice verified on chain.",
        "Repaid from real world revenue.",
      ],
      caption: "Built for Unlloo lenders who audit facts rather than promises.",
    },
    allocation: {
      sectionLabel: "Capital allocation",
      heading: "Exact distribution of 10,000 USDC enforced by contract caps",
      subtitle:
        "Each category holds an immutable upper limit inside LoanTransparencyRegistry.sol so funds cannot silently drift away from declared operational infrastructure.",
      totalLabel: "Total requested principal",
      capColumn: "Category cap",
      spentColumn: "Logged spend",
      shareColumn: "Weight",
      capPrefix: "Cap",
      loggedPrefix: "Logged",
      categories: {
        ARBITRAGE_LIQUIDITY: {
          name: "Arbitrage operational liquidity",
          detail:
            "Base stablecoin capital for DEX and CEX spread capture and automated execution margin with strict drawdown limits.",
          providers: "USDC stablecoin pools and liquid pairs",
        },
        RPC_WEBSOCKETS: {
          name: "Dedicated RPC and WebSocket nodes",
          detail:
            "Three months of institutional plans for mempool streaming, debug tracing, and millisecond execution without rate throttling.",
          providers: "Alchemy Growth / Scale and QuickNode Accelerate",
        },
        GAS_PRIVATE_BUNDLES: {
          name: "Gas reserve and private bundles",
          detail:
            "Execution gas across Arbitrum, Base, Optimism, and Ethereum Mainnet including Flashbots private bundles against front running.",
          providers: "Ethereum Mainnet, Flashbots, Arbitrum, Base",
        },
        DEDICATED_VPS: {
          name: "Low latency dedicated VPS servers",
          detail:
            "Three months of bare cloud instances located beside RPC endpoints in US East or Frankfurt for sub 5 millisecond ping and 24/7 uptime.",
          providers: "US East Virginia / Frankfurt colocation",
        },
        TRANSPARENCY_PORTAL: {
          name: "On chain transparency portal and contract",
          detail:
            "Deployment gas, domain, hosting, and maintenance of this public invoice verification interface connected directly to Ethereum Mainnet.",
          providers: "LoanTransparencyRegistry.sol on Ethereum Mainnet",
        },
      },
    },
    ledger: {
      sectionLabel: "Live Ethereum Mainnet ledger",
      heading: "Read only contract explorer and wallet verification",
      subtitle:
        "Direct public RPC reads from Ethereum Mainnet via viem. No wallet signature or browser extension is required to verify live telemetry or inspect recorded invoices.",
      refreshLabel: "Sync Ethereum Mainnet",
      allFilter: "All categories",
      walletTelemetryTitle: "Live borrower wallet telemetry",
      ethBalanceLabel: "ETH balance",
      usdcBalanceLabel: "USDC balance",
      txCountLabel: "Mainnet nonce",
      gasLabel: "Network gas",
      contractStatusTitle: "Transparency registry state",
      contractPendingTag: "Awaiting Unlloo funding activation",
      contractVerifiedTag: "Live contract connected",
      tableHeaders: {
        id: "Entry",
        category: "Category",
        vendor: "Provider",
        amount: "Amount (USDC)",
        proof: "On chain proof",
      },
      emptyTitle: "Pre funding state with zero simulated records",
      emptyBody:
        "The registry initializes at 0.00 USDC spent until Unlloo reaches the 80% minimum funding threshold and activates the 90 day cycle. Every infrastructure payment will appear here with its Ethereum transaction hash and IPFS receipt.",
      ofCapLabel: "of 10,000.00 USDC cap",
      emptyChecklist: [
        "Borrower wallet 0xf6Bb...AC87 live synced against Ethereum Mainnet",
        "Five immutable USDC category caps summing to 10,000 USDC encoded in LoanTransparencyRegistry.sol",
        "Zero mock receipts or placeholder transactions displayed prior to disbursement",
      ],
      errorTitle: "Ethereum Mainnet RPC read failed. Please retry syncing.",
      retryLabel: "Retry sync",
    },
    howItWorks: {
      sectionLabel: "Execution flow",
      heading: "Three steps from lender audit to full settlement",
      steps: [
        {
          number: "01",
          title: "Verify wallet and contract architecture",
          body: "Inspect borrower address 0xf6Bb...AC87 on Etherscan, review the fixed 10,000 USDC category caps, and confirm direct contact channels before committing capital.",
        },
        {
          number: "02",
          title: "Submit a competitive APR bid on Unlloo",
          body: "Bid your target rate up to the 20% APR ceiling during the 7 to 14 day funding window. Once total commitments cross Unlloo's 80% threshold, the 3 month cycle activates.",
        },
        {
          number: "03",
          title: "Audit invoices until principal plus interest settlement",
          body: "Track every Alchemy, QuickNode, VPS, and gas receipt in real time on this page until full principal and accrued interest settle on or before day 95.",
        },
      ],
    },
    backing: {
      sectionLabel: "Repayment guarantee and identity",
      heading: "Backed 100% by daily real world business cash flow",
      subtitle:
        "Bot arbitrage generates operational upside, yet loan solvency never depends on market volatility. Three active commercial lines fund daily liquidity and scheduled repayment.",
      streams: [
        {
          title: "Software, web, and Web3 engineering",
          body: "Full stack production web applications, smart contract architecture, and ongoing software retainers for external clients.",
          tag: "Daily recurring billing",
        },
        {
          title: "Architectural and interior design",
          body: "Commercial and residential design projects covering technical drafting, spatial planning, and specification delivery.",
          tag: "Milestone contracts",
        },
        {
          title: "Construction and remodeling execution",
          body: "Hands on project management and execution of physical renovation and construction builds with steady client cash flow.",
          tag: "Real world assets",
        },
      ],
      directChannelsTitle: "Direct borrower accountability",
      directChannelsSubtitle:
        "Reach out directly on X or Telegram before placing a bid on Unlloo for technical walkthroughs or contract verification.",
      copyAddressLabel: "Copy address",
      copiedLabel: "Copied",
    },
    faq: {
      sectionLabel: "Lender diligence FAQ",
      heading: "Direct answers to every underwriting objection",
      items: [
        {
          question: "What happens if arbitrage bots produce zero profit or face slow market months?",
          answer:
            "Repayment of the 10,000 USDC principal plus interest does not depend on bot returns. It is backed 100% by daily commercial revenue across software and Web3 engineering, architectural design, and construction execution.",
        },
        {
          question: "Why request 10,000 USDC if flash loans borrow capital atomically?",
          answer:
            "Atomic flash loans remove single trade principal requirements, yet competing reliably still requires prepaid low latency Alchemy and QuickNode subscriptions, co located VPS hardware, gas reserves for reverted bundles and Flashbots tips, plus 6,000 USDC of base liquidity for DEX and CEX spread strategies.",
        },
        {
          question: "How can lenders confirm published invoices are authentic?",
          answer:
            "Each record logged in LoanTransparencyRegistry.sol pairs the exact USDC figure, vendor name, timestamp, Ethereum transaction hash, and an immutable IPFS hash pointing to the provider billing receipt.",
        },
        {
          question: "Can a sudden crypto market crash wipe out the borrowed capital?",
          answer:
            "No. Operational liquidity remains in USDC stablecoins and market neutral spread setups with strict drawdown limits and zero directional leverage.",
        },
        {
          question: "Why is the repayment term set to 90 to 95 days?",
          answer:
            "Ninety days matches the 3 month prepaid infrastructure commitment, while the extra 5 day window allows orderly liquidity unwinding. Unlloo permits full early repayment at any moment without penalty.",
        },
        {
          question: "Which blockchain networks do the arbitrage bots operate on?",
          answer:
            "Primary flash loan execution targets low fee Layer 2 networks including Arbitrum, Base, and Optimism, paired with Ethereum Mainnet execution routed through private Flashbots bundles to avoid front running.",
        },
        {
          question: "What APR rate will an Unlloo lender actually earn?",
          answer:
            "The listing caps maximum interest between 15% and 20% APR. Unlloo matches lender bids competitively during the 7 to 14 day funding window, so accepted bids determine final yield.",
        },
        {
          question: "Why does the audit table show zero entries before funding closes?",
          answer:
            "Showing fabricated sample rows would undermine financial credibility. Before Unlloo reaches its 80% funding minimum and disburses funds, the ledger displays verified Pre funding state and live Mainnet telemetry for wallet 0xf6Bb...AC87.",
        },
      ],
    },
    riskReversal: {
      sectionLabel: "Underwriting summary",
      heading: "Verifiable accountability at every checkpoint",
      points: [
        "Public smart contract enforcing five hard USDC category caps",
        "Zero penalty early repayment enabled directly on Unlloo",
        "Dual solvency from market neutral execution and three real world businesses",
        "Direct founder access through X @Hik453 and Telegram @A0B10101",
      ],
      finalCtaHeading: "Review the ledger and bid on Unlloo",
      finalCtaSubheading:
        "Inspect wallet 0xf6Bb...AC87 on Ethereum Mainnet and join the 10,000 USDC 90 day cycle.",
      primaryCta: "Fund loan on Unlloo",
    },
    footer: {
      note: "Transparency interface for Ethereum Mainnet borrower 0xf6Bb...AC87.",
      privacyLink: "Privacy policy",
      termsLink: "Risk disclosure and terms",
      contractSourceLink: "Contract specification",
      backToTop: "Back to top",
      modalClose: "Close",
      privacyTitle: "Privacy policy",
      privacyBody: [
        "This portal operates as a static read only client communicating directly with public Ethereum Mainnet RPC endpoints. No wallet connection, private key, form data, or tracking cookie is collected.",
        "Direct lender communication takes place exclusively through your chosen external platform on X @Hik453 or Telegram @A0B10101.",
      ],
      termsTitle: "Risk disclosure and terms",
      termsBody: [
        "Uncollateralized DeFi lending on Unlloo carries counterparty, smart contract, and liquidity risks. Review borrower wallet history on Etherscan and Unlloo reputation metrics independently before placing any bid.",
        "This web interface provides public budget disclosures and reads LoanTransparencyRegistry.sol state on Ethereum Mainnet. Formal loan execution, interest accrual, and repayment settlement occur exclusively through Unlloo smart contracts.",
      ],
    },
    notFound: {
      code: "404",
      title: "Route not found",
      body: "The requested audit route does not exist on this transparency portal.",
      backHome: "Return to audit overview",
    },
  },
  es: {
    skipToContent: "Ir al contenido principal",
    nav: {
      brand: "Unlloo Audit",
      links: [
        { id: "overview", label: "Resumen" },
        { id: "allocation", label: "Distribución" },
        { id: "ledger", label: "Auditoría" },
        { id: "repayment", label: "Respaldo" },
        { id: "faq", label: "Preguntas" },
      ],
      menuOpenLabel: "Abrir menú de navegación",
      menuCloseLabel: "Cerrar menú de navegación",
      networkBadge: "Ethereum Mainnet",
    },
    hero: {
      eyebrow: "Ethereum Mainnet · Portal de Transparencia para Préstamo de 10,000 USDC",
      headlineLine1: "Financia arbitraje neutral al mercado",
      headlineLine2: "con cada factura auditada en cadena",
      subheadline:
        "Solicitud de 10,000 USDC a 90 o 95 días en Unlloo con tope de 20% TAE. Cada dólar destinado a nodos RPC, servidores, gas y liquidez queda registrado en un contrato público y respaldado al 100% por ingresos reales diarios.",
      primaryCta: "Fondear préstamo en Unlloo",
      proofItems: [
        "Billetera 0xf6Bb...AC87 verificada en Ethereum Mainnet",
        "Cero apalancamiento direccional",
        "Garantía de repago con ingresos reales",
      ],
      cardTitle: "Resumen del contrato en cadena",
      cardSubtitle: "Telemetría en vivo en Ethereum Mainnet y topes bloqueados por partida",
      targetLabel: "Capital solicitado",
      aprLabel: "Tope máximo TAE",
      aprValue: "15% a 20%",
      termLabel: "Plazo de devolución",
      termValue: "90 a 95 días",
      windowLabel: "Ventana de ofertas",
      windowValue: "7 a 14 días",
      barLegend: ["60% Liquidez", "15% RPC", "14% Gas", "11% VPS y Auditoría"],
      liveBlockLabel: "Bloque Mainnet",
      walletLabel: "Billetera solicitante",
      viewOnEtherscan: "Ver en Etherscan",
    },
    stateLabels: {
      PRE_FUNDING: "Previo al fondeo",
      ACTIVE: "Ciclo activo",
      REPAID: "Pagado en su totalidad",
      DEFAULTED: "Incumplido",
    },
    problemSolution: {
      sectionLabel: "Tesis estructural",
      heading: "Por qué fallan los préstamos cripto sin colateral y cómo se corrige aquí",
      problemTitle: "El problema en créditos DeFi opacos",
      problemBody:
        "Los prestamistas rechazan solicitudes genéricas de trading porque el capital desaparece en billeteras privadas y el apalancamiento direccional puede liquidar los fondos ante una sola caída fuerte.",
      solutionTitle: "Infraestructura auditada con respaldo fuera de cripto",
      solutionBody:
        "El capital se divide en cinco partidas con tope en cadena para un ciclo de 3 meses. Cada factura publica su hash de transacción y comprobante en IPFS, mientras tres negocios activos garantizan el pago diario.",
    },
    benefits: {
      sectionLabel: "Protecciones al prestamista",
      heading: "Cuatro salvaguardas verificables en todo el ciclo",
      items: [
        {
          title: "Trazabilidad inmutable de facturas",
          detail:
            "Cada pago a Alchemy, QuickNode, servidor VPS o reserva de gas registra monto exacto en USDC, proveedor, fecha, hash en Ethereum y comprobante IPFS en LoanTransparencyRegistry.",
          metric: "5 partidas con tope",
        },
        {
          title: "Exposición cero a caídas direccionales",
          detail:
            "La liquidez operativa permanece en USDC y estrategias neutrales al mercado, mientras los flash loans sobre Aave V3, Balancer y Uniswap V3 se liquidan dentro del mismo bloque.",
          metric: "0x apalancamiento",
        },
        {
          title: "Respaldo real independiente de los bots",
          detail:
            "El pago de capital e intereses no depende del rendimiento mensual de los bots. Tres líneas comerciales diarias en software y Web3, arquitectura y construcción cubren el 100% del compromiso.",
          metric: "3 líneas de ingreso",
        },
        {
          title: "Horizonte cerrado y pago anticipado libre",
          detail:
            "El vencimiento de 90 a 95 días coincide con los contratos trimestrales de infraestructura y deja margen ordenado de liquidación, permitiendo pago anticipado en Unlloo sin penalización.",
          metric: "90 a 95 días",
        },
      ],
    },
    taglineReveal: {
      lines: [
        "Cada dólar asignado en público.",
        "Cada factura verificada en cadena.",
        "Reembolsado con trabajo real.",
      ],
      caption: "Diseñado para prestamistas de Unlloo que auditan hechos y no promesas.",
    },
    allocation: {
      sectionLabel: "Distribución del capital",
      heading: "Asignación exacta de 10,000 USDC protegida por topes en contrato",
      subtitle:
        "Cada partida mantiene un techo inmutable en LoanTransparencyRegistry.sol para impedir que los fondos se desvíen de la infraestructura operativa declarada.",
      totalLabel: "Capital total solicitado",
      capColumn: "Tope de partida",
      spentColumn: "Gasto registrado",
      shareColumn: "Peso",
      capPrefix: "Tope",
      loggedPrefix: "Registrado",
      categories: {
        ARBITRAGE_LIQUIDITY: {
          name: "Liquidez operativa de arbitraje",
          detail:
            "Capital base en stablecoins para captura de spreads entre DEX y CEX con control estricto de drawdown y sin apalancamiento direccional.",
          providers: "Pools en USDC y pares de alta liquidez",
        },
        RPC_WEBSOCKETS: {
          name: "Nodos RPC y WebSockets dedicados",
          detail:
            "Tres meses de planes institucionales para escucha de mempool en tiempo real, trazas y ejecución en milisegundos sin límites restrictivos.",
          providers: "Alchemy Growth / Scale y QuickNode Accelerate",
        },
        GAS_PRIVATE_BUNDLES: {
          name: "Reserva de gas y bundles privados",
          detail:
            "Cobertura de gas en Arbitrum, Base, Optimism y Ethereum Mainnet incluyendo bundles privados de Flashbots contra front running.",
          providers: "Ethereum Mainnet, Flashbots, Arbitrum, Base",
        },
        DEDICATED_VPS: {
          name: "Servidores VPS dedicados de baja latencia",
          detail:
            "Tres meses de instancias ubicadas junto a los nodos RPC en US East o Frankfurt para lograr latencia menor a 5 milisegundos y disponibilidad continua.",
          providers: "Ubicación en US East Virginia / Frankfurt",
        },
        TRANSPARENCY_PORTAL: {
          name: "Portal web y contrato de auditoría",
          detail:
            "Despliegue en Ethereum Mainnet, dominio, alojamiento y mantenimiento de esta interfaz pública de seguimiento de facturas.",
          providers: "LoanTransparencyRegistry.sol en Ethereum Mainnet",
        },
      },
    },
    ledger: {
      sectionLabel: "Libro contable en vivo en Ethereum Mainnet",
      heading: "Explorador de solo lectura y verificación de billetera",
      subtitle:
        "Lectura directa mediante RPC público en Ethereum Mainnet con viem. Ningún prestamista necesita conectar MetaMask ni firmar transacciones para auditar balances o recibos.",
      refreshLabel: "Sincronizar Mainnet",
      allFilter: "Todas las partidas",
      walletTelemetryTitle: "Telemetría en vivo de la billetera",
      ethBalanceLabel: "Balance ETH",
      usdcBalanceLabel: "Balance USDC",
      txCountLabel: "Nonce Mainnet",
      gasLabel: "Gas de red",
      contractStatusTitle: "Estado del contrato de transparencia",
      contractPendingTag: "En espera de activación tras fondeo en Unlloo",
      contractVerifiedTag: "Contrato en vivo conectado",
      tableHeaders: {
        id: "Registro",
        category: "Partida",
        vendor: "Proveedor",
        amount: "Monto (USDC)",
        proof: "Prueba en cadena",
      },
      emptyTitle: "Estado previo al fondeo sin registros simulados",
      emptyBody:
        "El registro inicia en 0.00 USDC gastados hasta que la solicitud en Unlloo alcance el 80% mínimo requerido y active el ciclo de 90 días. Cada pago de infraestructura aparecerá aquí con su hash en Ethereum y recibo en IPFS.",
      ofCapLabel: "del tope de 10,000.00 USDC",
      emptyChecklist: [
        "Billetera solicitante 0xf6Bb...AC87 sincronizada en vivo con Ethereum Mainnet",
        "Cinco topes inmutables en USDC que suman 10,000 USDC definidos en LoanTransparencyRegistry.sol",
        "Cero facturas ficticias ni transacciones simuladas antes del desembolso real",
      ],
      errorTitle: "No fue posible consultar Ethereum Mainnet. Intenta sincronizar nuevamente.",
      retryLabel: "Reintentar",
    },
    howItWorks: {
      sectionLabel: "Flujo operativo",
      heading: "Tres pasos desde la auditoría previa hasta el repago",
      steps: [
        {
          number: "01",
          title: "Verifica billetera y arquitectura del contrato",
          body: "Inspecciona la dirección 0xf6Bb...AC87 en Etherscan, revisa los cinco topes de 10,000 USDC y valida los canales directos de contacto antes de ofertar.",
        },
        {
          number: "02",
          title: "Envía tu oferta de tasa en Unlloo",
          body: "Participa durante la ventana de 7 a 14 días fijando tu tasa hasta el techo de 20% TAE. Al superar el 80% de fondeo en Unlloo, arranca el ciclo de 3 meses.",
        },
        {
          number: "03",
          title: "Audita cada gasto hasta la liquidación final",
          body: "Sigue en tiempo real cada recibo de Alchemy, QuickNode, servidor VPS y gas hasta recibir capital más intereses antes del día 95.",
        },
      ],
    },
    backing: {
      sectionLabel: "Garantía de repago e identidad",
      heading: "Respaldado al 100% por flujo de caja real diario",
      subtitle:
        "Los bots buscan rendimiento operativo, pero la solvencia del préstamo nunca depende de la volatilidad cripto. Tres líneas de negocio activas sostienen la devolución completa.",
      streams: [
        {
          title: "Desarrollo de software, web y Web3",
          body: "Aplicaciones web en producción, arquitectura de contratos inteligentes y desarrollo continuo para clientes recurrentes.",
          tag: "Facturación diaria activa",
        },
        {
          title: "Diseño arquitectónico y de interiores",
          body: "Proyectos profesionales residenciales y comerciales desde planificación espacial hasta especificaciones técnicas.",
          tag: "Contratos por hitos",
        },
        {
          title: "Ejecución de construcción y remodelación",
          body: "Dirección y ejecución directa de obra civil y remodelaciones con flujo constante de clientes.",
          tag: "Activos del mundo real",
        },
      ],
      directChannelsTitle: "Contacto directo y verificación",
      directChannelsSubtitle:
        "Escríbeme directamente en X o Telegram antes de ofertar en Unlloo para resolver dudas técnicas o revisar el contrato.",
      copyAddressLabel: "Copiar dirección",
      copiedLabel: "Copiada",
    },
    faq: {
      sectionLabel: "Preguntas de diligencia",
      heading: "Respuestas directas a cada objeción del prestamista",
      items: [
        {
          question: "¿Qué ocurre si los bots de arbitraje no generan utilidad o atraviesan meses lentos?",
          answer:
            "El reembolso de los 10,000 USDC más intereses no depende de los bots. Está respaldado al 100% por ingresos diarios reales provenientes de desarrollo de software y Web3, diseño arquitectónico y ejecución de obras de construcción.",
        },
        {
          question: "¿Por qué pedir 10,000 USDC si los flash loans obtienen liquidez dentro del mismo bloque?",
          answer:
            "Los flash loans cubren el principal momentáneo de la operación, pero competir con velocidad exige pagar por adelantado planes dedicados de Alchemy y QuickNode, servidores VPS cercanos al nodo, gas para intentos revertidos o Flashbots y 6,000 USDC de liquidez base para arbitraje de spreads.",
        },
        {
          question: "¿Cómo confirman los prestamistas que las facturas publicadas son reales?",
          answer:
            "Cada registro emitido en LoanTransparencyRegistry.sol enlaza el monto exacto en USDC, proveedor, fecha, hash de transacción en Ethereum y un identificador IPFS inmutable con el comprobante original del servicio.",
        },
        {
          question: "¿Una caída brusca del mercado cripto puede liquidar el préstamo?",
          answer:
            "No. El capital operativo permanece en stablecoins USDC y posiciones neutrales al mercado con límites estrictos de drawdown y sin apalancamiento direccional.",
        },
        {
          question: "¿Por qué el plazo de devolución es de 90 a 95 días?",
          answer:
            "Noventa días equivalen al ciclo completo de 3 meses de infraestructura contratada y los 5 días adicionales ofrecen margen limpio de liquidación. Unlloo permite pagar anticipadamente sin penalización.",
        },
        {
          question: "¿En qué redes ejecutan arbitraje los bots?",
          answer:
            "La ejecución principal apunta a redes L2 de bajo costo como Arbitrum, Base y Optimism, complementada en Ethereum Mainnet mediante bundles privados de Flashbots para mitigar front running.",
        },
        {
          question: "¿Qué tasa TAE efectiva recibe el prestamista en Unlloo?",
          answer:
            "La solicitud fija un techo competitivo de 15% a 20% TAE. Durante la ventana de 7 a 14 días los prestamistas envían sus ofertas y las propuestas aceptadas determinan el rendimiento final.",
        },
        {
          question: "¿Por qué la tabla de auditoría muestra cero facturas antes de cerrar el fondeo?",
          answer:
            "Publicar movimientos ficticios dañaría la credibilidad financiera. Antes de superar el 80% mínimo en Unlloo y activar el desembolso, el libro contable refleja con honestidad el estado previo al fondeo y la telemetría viva de la billetera 0xf6Bb...AC87.",
        },
      ],
    },
    riskReversal: {
      sectionLabel: "Resumen de suscripción",
      heading: "Rendición de cuentas verificable en cada etapa",
      points: [
        "Contrato inteligente público con cinco topes estrictos en USDC",
        "Opción de reembolso anticipado sin penalización dentro de Unlloo",
        "Doble respaldo entre ejecución neutral al mercado y tres líneas comerciales reales",
        "Acceso directo al solicitante en X @Hik453 y Telegram @A0B10101",
      ],
      finalCtaHeading: "Revisa el libro contable y oferta en Unlloo",
      finalCtaSubheading:
        "Inspecciona la billetera 0xf6Bb...AC87 en Ethereum Mainnet y participa en el ciclo de 10,000 USDC a 90 días.",
      primaryCta: "Fondear préstamo en Unlloo",
    },
    footer: {
      note: "Interfaz de transparencia en Ethereum Mainnet para la billetera 0xf6Bb...AC87.",
      privacyLink: "Política de privacidad",
      termsLink: "Divulgación de riesgo y términos",
      contractSourceLink: "Especificación del contrato",
      backToTop: "Volver arriba",
      modalClose: "Cerrar",
      privacyTitle: "Política de privacidad",
      privacyBody: [
        "Este portal opera como cliente estático de solo lectura conectado a nodos RPC públicos de Ethereum Mainnet. No solicita conexión de billetera, claves privadas, formularios ni cookies de rastreo.",
        "La comunicación directa con prestamistas ocurre exclusivamente en los canales externos elegidos en X @Hik453 o Telegram @A0B10101.",
      ],
      termsTitle: "Divulgación de riesgo y términos",
      termsBody: [
        "Los préstamos DeFi sin colateral en Unlloo conllevan riesgo de contraparte, contrato inteligente y liquidez. Revisa de forma independiente el historial en Etherscan y el puntaje de reputación en Unlloo antes de ofertar.",
        "Esta interfaz web ofrece transparencia presupuestaria y lee el estado público de LoanTransparencyRegistry.sol en Ethereum Mainnet. La formalización del crédito, intereses y liquidación ocurren exclusivamente en los contratos de Unlloo.",
      ],
    },
    notFound: {
      code: "404",
      title: "Ruta no encontrada",
      body: "La ruta solicitada no existe dentro de este portal de transparencia.",
      backHome: "Volver al resumen de auditoría",
    },
  },
};
