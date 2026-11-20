# Arquitectura de Landing Page y Portal de Transparencia On Chain (Unlloo 10,000 USDC)

Documento maestro basado en el contexto de la solicitud de préstamo sin colateral en Unlloo (`10,000 USDC`, ciclo operativo de `90` a `95` días, `15%` a `20%` TAE máxima) con auditoría pública de facturas y gastos mediante contrato inteligente.

## 0. Definición Estratégica y Criterio Técnico

- **Audiencia objetivo.** Prestamistas DeFi en Unlloo (Ethereum mainnet) que evalúan solicitudes de crédito sin colateral y filtran riesgos mediante evidencia verificable.
- **Oferta única.** Rendimiento competitivo de `15%` a `20%` TAE en un horizonte de `90` a `95` días, con destino exacto de capital auditado en cadena y respaldo total de repago con flujo de caja real fuera del mercado cripto.
- **Acción principal única (CTA).** Evaluar la transparencia del contrato y fondear el préstamo en Unlloo (`Fund loan on Unlloo` / `Fondear préstamo en Unlloo`). No compiten botones secundarios por encima del pliegue.
- **Idioma recomendado.** Inglés como idioma por defecto con selector `EN / ES`. La mayoría de prestamistas activos en Unlloo operan en inglés. Publicar solo en español reduce la conversión de fondeo.
- **Principio de fricción cero para el auditor.** El portal consulta el contrato inteligente en modo solo lectura mediante `viem`. Ningún prestamista necesita conectar su billetera para auditar balances, categorías ni recibos IPFS.
- **Recomendación de layout (Tipo B, narrativa de formato largo con libro contable embebido).** Un préstamo de `10,000 USDC` sin colateral genera escepticismo inmediato. El visitante llega desde Unlloo con contexto previo sobre la plataforma, pero necesita pruebas progresivas (asignación exacta, contrato verificable, respaldo comercial real y respuestas directas a objeciones) antes de ofertar.

---

## 1. Esquema de Secciones y Orden (Page Outline)

| Orden | Sección | Función principal |
| :--- | :--- | :--- |
| 0 | Barra de navegación flotante (`Fluid Island Nav`) | Anclas directas (`Overview`, `Budget`, `Audit Ledger`, `Repayment`, `FAQ`), indicador de estado del contrato y selector `EN / ES`. |
| 1 | Hero (por encima del pliegue) | Tesis de inversión, términos clave, CTA principal único, señal de prueba en cadena y vista previa del contrato con los 5 topes de gasto. |
| 2 | Problema a solución | Contrasta por qué fallan las solicitudes opacas de trading frente a la operativa neutral al mercado con contabilidad pública. |
| 3 | Beneficios para el prestamista (4 pilares) | Traduce arquitectura técnica en protección de capital, trazabilidad y certidumbre de pago. |
| 4 | Declaración central animada (`Tagline Reveal`) | Sección tipográfica de alto impacto con activación palabra por palabra al hacer scroll. |
| 5 | Distribución exacta del capital (`10,000 USDC`) | Desglose visual y tabular de las 5 partidas presupuestarias con sus topes estrictos en contrato. |
| 6 | Explorador de Auditoría y Facturas On Chain | Módulo interactivo conectado al contrato inteligente con saldos, gastos ejecutados, recibos en IPFS y hashes de transacción. |
| 7 | Cómo funciona el ciclo (3 pasos) | Flujo exacto desde la verificación previa hasta la liquidación en el día `90` a `95`. |
| 8 | Respaldo financiero real e identidad verificable | Evidencia de las 3 líneas de negocio activas, reputación de billetera `0xAe2e...716A` y canales directos en X y Telegram. |
| 9 | Preguntas frecuentes (FAQ de objeciones) | 8 preguntas clave que atacan de frente riesgo de pérdida, autenticidad de facturas, redes L2 y liquidez. |
| 10 | Reversión de riesgo y protecciones | Resumen de salvaguardas (pago anticipado sin penalización, doble fuente de repago, registro inmutable). |
| 11 | CTA final y pie de página | Mismo CTA del Hero junto a enlaces legales, dirección del contrato en Etherscan y contacto directo. |

---

## 2. Copy del Hero (Above the Fold)

El encabezado y el subtítulo mantienen un ancho máximo de `680px` con saltos de línea deliberados y sin guiones dentro del texto. Se entrega la versión en español y su equivalente en inglés lista para producción.

### Versión en Español

- **Titular (H1).**
  `Financia arbitraje neutral al mercado`
  `con cada factura auditada en cadena`
- **Subtítulo.**
  `Solicitud de 10,000 USDC a 90 días en Unlloo con hasta 20% TAE. Cada dólar destinado a nodos, liquidez y servidores queda registrado en un contrato público y respaldado al 100% por ingresos reales diarios.`
- **CTA principal único.**
  `Fondear préstamo en Unlloo`
- **Señal de prueba inmediata.**
  `Billetera 0xAe2e...716A · Contrato auditado en Ethereum · 0% apalancamiento direccional`
- **Visual del Hero.**
  Tarjeta interactiva de lectura directa del contrato (`On Chain Vault Snapshot`) mostrando el objetivo de `10,000 USDC`, estado actual (`PreFunding` o `Active`), tope por categoría y enlace directo al código verificado en Etherscan.

### Versión en Inglés (Recomendada por defecto en producción)

- **Headline (H1).**
  `Fund market neutral arbitrage`
  `with every invoice audited on chain`
- **Subheadline.**
  `A 10,000 USDC 90 day Unlloo loan capped at 20% APR. Every dollar spent on RPC nodes, servers, and liquidity is logged in a public smart contract and backed 100% by daily real world business revenue.`
- **Single Primary CTA.**
  `Fund loan on Unlloo`
- **Immediate Proof Signal.**
  `Wallet 0xAe2e...716A · Verified Ethereum Contract · Zero directional leverage`

---

## 3. Problema a Solución y Beneficios (4 Pilares)

### Bloque Problema a Solución

- **Problema.** Los prestamistas en plataformas sin colateral rechazan solicitudes de trading porque el capital desaparece en billeteras privadas y el apalancamiento direccional puede liquidar la cuenta en una sola caída.
- **Solución.** Este préstamo separa la liquidez neutral al mercado de la infraestructura contratada por 3 meses, publica cada recibo en un contrato inteligente verificable y garantiza el repago con facturación diaria externa al mercado cripto.

### Beneficios Orientados a Resultados

1. **Trazabilidad total de cada factura.** Cada pago a Alchemy, QuickNode, proveedor VPS o recarga de gas registra monto exacto en USDC, fecha, hash de transacción y recibo inmutable en IPFS.
2. **Exposición cero a caídas direccionales.** La liquidez de `6,000 USDC` opera en stablecoins y spreads cubiertos, mientras los flash loans sobre Aave V3, Balancer y Uniswap V3 se liquidan dentro de la misma transacción atómica.
3. **Repago garantizado por ingresos reales.** El pago de capital e intereses está cubierto al 100% por facturación diaria en desarrollo de software y Web3, diseño arquitectónico y proyectos de construcción, sin depender del rendimiento mensual de los bots.
4. **Horizonte cerrado y pago anticipado libre.** El plazo de `90` a `95` días coincide con los contratos trimestrales de infraestructura y admite cancelación anticipada en cualquier momento sin penalizaciones.

---

## 4. Sección Obligatoria Tagline Reveal

Se ubica entre los Beneficios y el Desglose de Capital como momento tipográfico independiente (`text-4xl` a `text-6xl`, ancho máximo `680px`). Cada palabra arranca al `30%` de opacidad y transiciona individualmente al `100%` en orden de lectura mediante `IntersectionObserver` y curva `cubic-bezier(0.32, 0.72, 0, 1)`.

- **Copy ES.**
  `Cada dólar asignado en público.`
  `Cada factura verificada en cadena.`
  `Reembolsado con trabajo real.`
- **Copy EN.**
  `Every dollar allocated in public.`
  `Every invoice verified on chain.`
  `Repaid from real world revenue.`

---

## 5. Distribución Exacta de los 10,000 USDC

| Partida | Monto (USDC) | Porcentaje | Destino verificable |
| :--- | :--- | :--- | :--- |
| Liquidez operativa de arbitraje | `6,000` | `60%` | Capital base en stablecoins y pares líquidos para spreads DEX y CEX con control estricto de drawdown. |
| Nodos RPC y WebSockets (3 meses) | `1,500` | `15%` | Planes dedicados en Alchemy y QuickNode para lectura de mempool y ejecución en milisegundos. |
| Reserva de gas y bundles privados | `1,400` | `14%` | Gas en redes L2 (Arbitrum, Base, Optimism), Ethereum mainnet y envío vía Flashbots contra front running. |
| Servidores VPS dedicados (3 meses) | `600` | `6%` | Instancias ubicadas junto a nodos RPC en US East o Frankfurt con operación continua 24/7. |
| Portal web y contrato de auditoría | `500` | `5%` | Despliegue del contrato inteligente público y esta aplicación web de seguimiento de facturas en tiempo real. |
| **Total solicitado** | **`10,000`** | **`100%`** | **Tope auditable por categoría en el contrato inteligente.** |

---

## 6. Cómo Funciona el Ciclo (3 Pasos)

1. **Verifica el contrato y la reputación.** Revisa la dirección del contrato inteligente en Etherscan, el desglose cerrado de `10,000 USDC` y el historial de la billetera `0xAe2e...716A` con su puntaje en Unlloo antes de comprometer fondos.
2. **Envía tu oferta competitiva en Unlloo.** Participa dentro de la ventana de fondeo de `7` a `14` días eligiendo tu tasa hasta el tope de `15%` a `20%` TAE. El préstamo se activa al superar el mínimo del `80%` requerido por la plataforma.
3. **Audita cada gasto hasta el repago final.** Consulta facturas, hashes de transacción y recibos IPFS en vivo durante los 3 meses de operación hasta recibir el capital más los intereses antes del día `90` a `95`.

---

## 7. Respaldo Financiero Real y Canales Directos

### Tres Líneas de Ingresos Activas (Garantía de Repago)

- **Ingeniería de software, web y Web3.** Desarrollo full stack, aplicaciones comerciales y contratos inteligentes para clientes recurrentes.
- **Diseño arquitectónico y de interiores.** Servicios profesionales de diseño y planificación técnica.
- **Construcción y remodelación.** Ejecución directa de obras y proyectos residenciales o comerciales.

### Verificación de Identidad y Contacto Directo

- **Billetera principal en Unlloo.** `0xf6Bb92Ac612D814F2A1e67Bf713F2f732419AC87` (Ethereum Mainnet).
- **X (Twitter).** `https://x.com/Hik453` (`@Hik453`)
- **Telegram.** `https://t.me/A0B10101` (`@A0B10101`)
- **Enlace del préstamo en Unlloo.** `[URL_SOLICITUD_UNLLOO]`
- **Contrato público de auditoría.** `[DIRECCION_CONTRATO_ETHERSCAN]`

---

## 8. Preguntas Frecuentes (FAQ)

1. **¿Qué ocurre si los bots de arbitraje no generan ganancias o tienen un mes lento?**
   El reembolso total de los `10,000 USDC` más los intereses no depende de los bots. Está respaldado al `100%` por ingresos diarios provenientes de desarrollo de software y Web3, diseño arquitectónico y ejecución de obras de construcción.
2. **¿Por qué solicitar 10,000 USDC si los flash loans piden liquidez dentro del mismo bloque?**
   Los flash loans eliminan la necesidad de capital prestado por operación, pero exigen pagar por adelantado nodos RPC dedicados, servidores de baja latencia y reserva de gas para intentos revertidos o bundles de Flashbots. Además, `6,000 USDC` cubren la liquidez estable necesaria para arbitraje de spreads fuera de flash loans.
3. **¿Cómo puedo confirmar que las facturas publicadas son reales y no editadas?**
   Cada registro emitido por el contrato inteligente incluye monto en USDC, proveedor, sello de tiempo, hash de transacción en cadena y enlace inmutable en IPFS al comprobante original de Alchemy, QuickNode o proveedor de servidor.
4. **¿El capital corre riesgo si Bitcoin o Ethereum caen bruscamente?**
   No. Las estrategias operan de forma neutral al mercado sobre stablecoins y pares cubiertos con límites estrictos de drawdown, sin posiciones direccionales apalancadas.
5. **¿Por qué el plazo de devolución es de 90 a 95 días?**
   El horizonte de 90 días cubre exactamente los 3 meses de infraestructura contratada y añade un margen de 5 días para liquidación ordenada. El protocolo Unlloo permite pagar anticipadamente sin penalización.
6. **¿En qué redes operan los bots de arbitraje?**
   Se priorizan redes L2 como Arbitrum, Base y Optimism por su bajo costo de gas por intento, complementadas con Ethereum mainnet utilizando bundles privados de Flashbots para mitigar front running.
7. **¿Qué tasa de interés recibiré como prestamista?**
   La solicitud fija una tasa máxima entre `15%` y `20%` TAE. En Unlloo los prestamistas compiten con sus propias ofertas y la tasa efectiva queda determinada por las ofertas aceptadas al cierre del fondeo.
8. **¿Qué muestra el portal antes de que el préstamo se fondee por completo?**
   En estado `PreFunding`, el portal muestra el contrato verificado en cadena con saldos en `0.00 USDC`, los topes presupuestarios bloqueados y la identidad del solicitante. Nunca muestra transacciones simuladas ni facturas ficticias.

---

## 9. SEO, AEO y Metadatos Sociales

- **Recomendación de indexación.** `noindex, nofollow` mientras el sitio funcione exclusivamente como página temporal de campaña para una solicitud de 7 a 14 días en Unlloo. Si se convierte en portal histórico permanente para múltiples ciclos de crédito, cambiar a `index, follow` y activar esquema `FAQPage` en JSON LD.
- **Prioridad real de metadatos.** Etiquetas Open Graph (`og:title`, `og:description`, `og:image`) y Twitter Card impecables, ya que todo el tráfico llega por enlaces compartidos en Unlloo, X y Telegram.

```html
<title>Unlloo 10,000 USDC Audit Portal | On Chain Expense Transparency</title>
<meta name="robots" content="noindex, nofollow" />
<meta
  name="description"
  content="Public smart contract audit portal for a 10,000 USDC 90 day Unlloo loan. Track live RPC, VPS, gas, and arbitrage liquidity invoices backed by real world revenue."
/>
<meta property="og:title" content="10,000 USDC Unlloo Loan | Live On Chain Invoice Audit" />
<meta
  property="og:description"
  content="Market neutral arbitrage infrastructure for 3 months. Every USDC allocation and provider invoice verified on chain and backed by daily software, design, and construction cash flow."
/>
```

---

## 10. Modelo de Dominio y Contrato Inteligente

Para evitar banderas booleanas dispersas y garantizar que la UI nunca represente estados imposibles, tanto el contrato inteligente como el frontend comparten el siguiente modelo estricto.

### Estados del Ciclo del Préstamo

```ts
export type LoanLifecycleState = "PRE_FUNDING" | "ACTIVE" | "REPAID" | "DEFAULTED";

export type BudgetCategoryId =
  | "ARBITRAGE_LIQUIDITY"
  | "RPC_WEBSOCKETS"
  | "GAS_PRIVATE_BUNDLES"
  | "DEDICATED_VPS"
  | "TRANSPARENCY_PORTAL";

export interface BudgetAllocation {
  readonly id: BudgetCategoryId;
  readonly capUsdc: number;
  readonly spentUsdc: number;
  readonly sharePercent: number;
}

export interface InvoiceRecord {
  readonly id: bigint;
  readonly category: BudgetCategoryId;
  readonly vendor: string;
  readonly amountUsdc: bigint;
  readonly timestamp: number;
  readonly receiptIpfsCid: string;
  readonly txHash: `0x${string}`;
  readonly memo: string;
}
```

### Interfaz Mínima del Contrato (`LoanTransparencyRegistry.sol`)

El contrato no necesita custodiar fondos complejos de trading para aportar máxima transparencia. Puede operar como registro inmutable auditable por eventos (`append only`) gestionado por la billetera `0xAe2e...716A`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILoanTransparencyRegistry {
    enum LoanState { PreFunding, Active, Repaid, Defaulted }
    enum Category { ArbitrageLiquidity, RpcWebSockets, GasPrivateBundles, DedicatedVps, TransparencyPortal }

    struct Expense {
        Category category;
        uint256 amountUsdc;
        uint64 timestamp;
        string vendor;
        string receiptIpfsCid;
        bytes32 paymentTxHash;
    }

    event LoanActivated(uint256 fundedUsdc, uint64 maturityTimestamp);
    event ExpenseLogged(
        uint256 indexed expenseId,
        Category indexed category,
        uint256 amountUsdc,
        string vendor,
        string receiptIpfsCid,
        bytes32 paymentTxHash
    );
    event RepaymentRecorded(uint256 amountUsdc, bytes32 repaymentTxHash);

    function state() external view returns (LoanState);
    function categoryCapUsdc(Category category) external view returns (uint256);
    function categorySpentUsdc(Category category) external view returns (uint256);
    function expenseCount() external view returns (uint256);
    function getExpense(uint256 expenseId) external view returns (Expense memory);
}
```

---

## 11. Sistema Visual y Arquitectura de Proyecto Recomendada

### Tokens Visuales (Modo Oscuro Institucional)

- **Paleta plana (sin gradientes de fondo).** Lienzo `#000000`, superficies `#181818`, tarjetas elevadas `#1F1F1F`, bordes completos `#272727`, estados interactivos `#313131`.
- **Gradiente exclusivo del titular Hero.** Texto de izquierda a derecha de `#FFFFFF` a `#9B9B9B`.
- **Tipografía.** `Geist` para interfaz y lectura (pesos máximos `600` y `700`, sin cursivas, escala estándar de Tailwind). `Geist Mono` exclusivamente para direcciones `0x`, montos USDC, porcentajes y hashes.
- **Espaciado.** Únicamente la escala `0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96` px. Botones principales con `py-2 px-3` (`8px` vertical, `12px` horizontal) y `text-base font-semibold`.
- **Radios anidados.** Tarjeta externa `rounded-2xl` (`16px`) con padding interno `8px` (`p-2`) asigna `rounded-lg` (`8px`) al elemento interior (`16 - 8 = 8`).
- **Iconografía.** Únicamente `Phosphor Icons`.
- **Movimiento.** Transiciones con `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`, navegación en píldora flotante con transformación de menú hamburguesa a X y revelaciones de scroll vía `IntersectionObserver` (nunca `window.addEventListener("scroll")`).
- **Estados obligatorios.** Hover, active (`scale-[0.98]`), anillo de foco accesible, skeletons con forma real mientras lee el RPC, vista `PreFunding` compuesta cuando hay cero facturas y error inline con botón de reintento si falla el nodo RPC.

### Estructura de Carpetas Propuesta (Next.js App Router o Vite + React + Tailwind + `viem`)

```text
Webpres/
├── contracts/
│   └── LoanTransparencyRegistry.sol
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── legal/
│   │   │   ├── privacy/page.tsx
│   │   │   └── terms/page.tsx
│   ├── domain/
│   │   ├── loan.ts
│   │   └── budget.ts
│   ├── lib/
│   │   ├── rpcClient.ts
│   │   ├── registryAbi.ts
│   │   └── i18n.ts
│   ├── content/
│   │   ├── en.ts
│   │   └── es.ts
│   └── components/
│       ├── FluidIslandNav.tsx
│       ├── HeroSection.tsx
│       ├── VaultSnapshotCard.tsx
│       ├── ProblemSolutionSection.tsx
│       ├── BenefitsSection.tsx
│       ├── TaglineRevealSection.tsx
│       ├── AllocationSection.tsx
│       ├── AuditLedgerSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── BackingIdentitySection.tsx
│       ├── FaqSection.tsx
│       ├── RiskReversalSection.tsx
│       ├── FinalCtaSection.tsx
│       └── Footer.tsx
└── LANDING_STRUCTURE.md
```

---

## 12. Datos Pendientes Antes de Pasar a Código

Sustituye los siguientes valores reales antes de publicar el sitio en producción.

- Usuario real de X (`https://x.com/[TU_USUARIO_X]`).
- Usuario real de Telegram (`@[TU_TELEGRAM]`).
- Dirección Ethereum completa de la billetera `0xAe2e...716A`.
- Red objetivo para desplegar `LoanTransparencyRegistry.sol` (Ethereum mainnet o L2 como Base / Arbitrum).
- Enlace público del préstamo en Unlloo una vez publicado.
- Portafolio o enlaces verificables de tus tres líneas de negocio (software/Web3, arquitectura y construcción).
