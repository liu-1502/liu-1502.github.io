import "../alpha/styles.css";
import "./styles.css";   /* override màu xanh cho Marketplace, load sau alpha styles */
import { Fragment } from "react";
import MarketplaceClient from "./MarketplaceClient";
import MetaRows from "@/components/ui/MetaRows";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpDown, ArrowDownRight, ArrowUpRight, X, ArrowRight, ArrowLeft, ChevronDown, ChevronsRight, ExternalLink, ShieldCheck, Copy, Check, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";

/* Danh sách vault hiển thị ở màn Overview; key khớp data-panel của card exchange. */
const VAULTS = [
  {
    key: "yzsyrup", name: "yzSyrup", addr: "0xc985…09b1", logo: "/assets/tokens/yzSyrup.svg",
    strategy: "Leverage", type: "Overcollateralized Lending", stateBadge: "3D liquidity",
    chain: "Monad", chainIcon: "/assets/chains/monad.svg",
    tvl: "$3.01M", tvlChg: "+0.02% · 24h", apy: "8.53%", leverage: "10×",
    risk: 2, riskLabel: "Low–Moderate", asset: "USDC", assetIcon: "/assets/tokens/usdc.svg",
    desc: "Leveraged exposure to SyrupUSD (overcollateralized lending). SyrupUSD is a yield-bearing stablecoin issued by Maple Finance, backed by overcollateralized loans secured by liquid, blue-chip crypto assets such as BTC and ETH. It is typically >130% overcollateralized, has been operating since 2024, and is battle-tested through numerous systemic stress events.",
    tagline: "Leveraged exposure to SyrupUSD (overcollateralized lending).",
    powered: ["/assets/protocols/aave.svg", "/assets/protocols/morpho.svg", "/assets/protocols/euler.svg", "/assets/protocols/fluid.svg"],
    poweredNames: "Aave · Morpho · Euler · Fluid",
    strategyIntro: "Leveraged across blue-chip DeFi money markets - Aave, Euler, Morpho, etc.",
    steps: [
      { label: "Deposit USDC", title: "User deposits USDC & receives yzSyrup vault token (receipt)", detail: "Funds enter the vault contract." },
      { label: "Mint Syrup tokens", title: "Mint syrupUSDC / syrupUSDT", detail: "USDC used to mint syrupUSDC / syrupUSDT on Ethereum." },
      { label: "Supply collateral", title: "Supply to Money Markets", detail: "Use syrupUSDC / syrupUSDT as collateral in blue-chip money markets (Aave, Morpho, Euler, etc.)." },
      { label: "Borrow stablecoins", title: "Borrow Stablecoins", detail: "Borrow stablecoins (USDT, USDC, etc.) up to market LTV based on available liquidity and prevailing borrow APY." },
      { label: "Leverage", title: "Leverage", detail: "Repeat 2-4 to increase overall vault APY (via leveraged uplift)." },
    ],
    research: "SyrupUSD Real-Time Asset Quality Monitor",
    researchUrl: "https://research.yuzu.money/syrup-monitor",
    explorerUrl: "https://explorer.monad.xyz/address/0xc985...09b1",
    debankUrl: "https://debank.com/bundles/223157/accounts/",
    trailingApy: "8.53%",
    price: 1.0192, dailyGrowth: 0.000224,
    fees: { perf: "10%", mgmt: "0%", wfee: "0%", wtime: "Up to 3 days" },
    position: { value: "$10,850.00", earned: "+$850.00", pnl: "+8.50%" },
    orders: [
      { kind: "mint", label: "Deposit yzSyrup", addr: "0x71bC8…9Ae0", amount: "$3,000.00", status: "completed" },
      { kind: "redeem", label: "Withdraw yzSyrup", addr: "0x3F2a1…7bC2", amount: "$1,500.00", status: "completed" },
      { kind: "mint", label: "Deposit yzSyrup", addr: "0xeED43…AbbA", amount: "$8,000.00", status: "pending" },
    ],
    contractName: "yzSyrup Vault",
    contractChain: "Ethereum", contractChainIcon: "/assets/chains/ethereum.svg",
  },
  {
    key: "yzcash", name: "yzCash", addr: "0x224e…098d", logo: "/assets/tokens/yzCash.svg",
    strategy: "Lending", type: "Tokenized T-Bills", stateBadge: "24H liquidity",
    chain: "Monad", chainIcon: "/assets/chains/monad.svg",
    tvl: "$7.51M", tvlChg: "+0.01% · 24h", apy: "4.90%", leverage: "0×",
    risk: 1, riskLabel: "Low", asset: "USDC", assetIcon: "/assets/tokens/usdc.svg",
    desc: "Yuzu Cash is an unlevered, short-duration (<24H) liquidity vault designed to deliver yields above the standard overnight rate while maintaining strict risk discipline. Backed by tokenized T-Bills from leading issuers with near-instant liquidity and no lockups.",
    tagline: "Unlevered short-duration (<24H) liquidity backed by tokenized T-Bills.",
    powered: ["/assets/protocols/curvance.svg"],
    poweredNames: "Curvance",
    strategyIntro: "Unlevered cash management backed by tokenized T-Bills, redeemable anytime.",
    steps: [
      { label: "Deposit USDC", title: "User deposits USDC & receives yzCash vault token (receipt)", detail: "Funds enter the vault contract." },
      { label: "Allocate to T-Bills", title: "Allocate to tokenized T-Bills", detail: "USDC allocated to short-duration tokenized T-Bills from leading issuers." },
      { label: "Accrue yield", title: "Accrue overnight yield", detail: "Earn yields above the standard overnight rate while keeping strict risk discipline." },
      { label: "Redeem anytime", title: "Redeem anytime", detail: "Near-instant liquidity with no lockups — redeem back to USDC at any time." },
    ],
    research: "yzCash Reserve Attestation (live)",
    researchUrl: "https://research.yuzu.money/cash-monitor",
    explorerUrl: "https://explorer.monad.xyz/address/0x224e...098d",
    debankUrl: "https://debank.com/bundles/223157/accounts/",
    trailingApy: "4.90%",
    price: 1.0000, dailyGrowth: 0.000131,
    fees: { perf: "10%", mgmt: "0%", wfee: "0%", wtime: "Instant" },
    position: { value: "$10,490.00", earned: "+$490.00", pnl: "+4.90%" },
    orders: [
      { kind: "mint", label: "Deposit yzCash", addr: "0x9A2f1…C4dE", amount: "$2,400.00", status: "completed" },
      { kind: "redeem", label: "Withdraw yzCash", addr: "0x5B8e3…11Fa", amount: "$1,200.00", status: "completed" },
      { kind: "mint", label: "Deposit yzCash", addr: "0xC7d90…4e21", amount: "$5,000.00", status: "pending" },
    ],
    contractName: "yzCash Vault",
    contractChain: "Ethereum", contractChainIcon: "/assets/chains/ethereum.svg",
  },
];

/* Đối tác bảo mật (chung cho các vault). */
const SECURITY = [
  { name: "Pashov", role: "Smart-contract audit ×2 · 2025", logo: "/assets/partners/pashov.jpeg" },
  { name: "Dedaub", role: "Smart-contract audit ×2 · 2025", logo: "/assets/partners/dedaub-fav.png" },
  { name: "Hypernative", role: "Real-time monitoring", logo: "/assets/partners/hypernative-fav.png" },
  { name: "Fordefi", role: "MPC custody", logo: "/assets/partners/fordefi-fav.png" },
];

/* ---- Historical Performance chart (SVG dựng sẵn khi render) ---- */
const CHART_W = 560, CHART_H = 190, C_PADT = 10, C_PADB = 8, C_PADR = 6, C_PADL = 8;
const RANGES = [
  { key: "7d", label: "7D", n: 7 },
  { key: "30d", label: "30D", n: 30 },
  { key: "90d", label: "90D", n: 90 },
];

/* n điểm KẾT THÚC ở giá hiện tại `price`, lùi về trước theo lãi kép daily. */
function buildSeries(price: number, daily: number, n: number) {
  return Array.from({ length: n }, (_, i) => price / Math.pow(1 + daily, n - 1 - i));
}

function Chart({ price, daily, n }: { price: number; daily: number; n: number }) {
  const data = buildSeries(price, daily, n);
  const min = Math.min(...data), max = Math.max(...data);
  const pad = (max - min) * 0.18 || 0.0001;
  const lo = min - pad, hi = max + pad;
  const px = (i: number) => C_PADL + (i / (n - 1)) * (CHART_W - C_PADL - C_PADR);
  const py = (val: number) => C_PADT + (1 - (val - lo) / (hi - lo)) * (CHART_H - C_PADT - C_PADB);
  const line = data.map((d, i) => (i ? "L" : "M") + px(i).toFixed(1) + " " + py(d).toFixed(1)).join(" ");
  const base = (CHART_H - C_PADB).toFixed(1);
  const area = `${line} L ${px(n - 1).toFixed(1)} ${base} L ${px(0).toFixed(1)} ${base} Z`;
  const uid = `c${Math.round(price * 1e5)}-${n}`;
  return (
    <div className="vd-chart-wrap">
      {/* Nhãn trục Y bằng HTML để giữ font cố định (không scale theo SVG) */}
      <div className="vd-yticks">
        {[0, 1, 2, 3].map((i) => {
          const t = lo + ((hi - lo) * (3 - i)) / 3;
          const frac = (C_PADT + (i * (CHART_H - C_PADT - C_PADB)) / 3) / CHART_H;
          return <span key={i} style={{ top: `${(frac * 100).toFixed(2)}%` }}>{t.toFixed(4)}</span>;
        })}
      </div>
      <svg className="vd-chart" viewBox={`0 0 ${CHART_W} ${CHART_H}`} role="img" aria-label="Vault receipt token price">
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--mkt)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--mkt)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => {
          const yy = C_PADT + (i * (CHART_H - C_PADT - C_PADB)) / 3;
          return <line className="vd-grid" x1={C_PADL} y1={yy} x2={CHART_W - C_PADR} y2={yy} key={i} />;
        })}
        <path d={area} fill={`url(#${uid})`} />
        <path className="vd-line" d={line} fill="none" />
        <circle className="vd-dot" cx={px(n - 1)} cy={py(data[n - 1])} r="3.5" />
        {/* Hover states: guide line + dot + tooltip theo từng điểm (CSS-only) */}
        {data.map((d, i) => {
          const cx = px(i), cy = py(d);
          const half = (CHART_W - C_PADL - C_PADR) / (n - 1) / 2;
          return (
            <g className="vd-pt" key={i}>
              <rect className="vd-pt-hit" x={(cx - half).toFixed(1)} y={C_PADT} width={(half * 2).toFixed(1)} height={CHART_H - C_PADT - C_PADB} />
              <line className="vd-pt-guide" x1={cx.toFixed(1)} y1={C_PADT} x2={cx.toFixed(1)} y2={(CHART_H - C_PADB).toFixed(1)} />
              <circle className="vd-pt-dot" cx={cx.toFixed(1)} cy={cy.toFixed(1)} r="4" />
              <g className="vd-pt-tip" transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`}>
                <rect x="-38" y="-34" width="76" height="24" rx="6" />
                <text x="0" y="-17" textAnchor="middle">{d.toFixed(4)}</text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function RangeChart({ v }: { v: (typeof VAULTS)[number] }) {
  return (
    <>
      <div className="vd-charts">
        {RANGES.map((r, i) => (
          <div className="vd-chartpanel" key={r.key} data-rangepanel={r.key} style={i === 0 ? undefined : { display: "none" }}>
            <Chart price={v.price} daily={v.dailyGrowth} n={r.n} />
          </div>
        ))}
      </div>
      <div className="vd-ranges">
        {RANGES.map((r, i) => (
          <button className={`vd-range${i === 0 ? " on" : ""}`} type="button" data-range={r.key} key={r.key}>{r.label}</button>
        ))}
      </div>
    </>
  );
}

/* Panel chi tiết vault (cột phải màn exchange): Overview / Strategy / Research / Historical Performance / Vault info / Security. */
function VaultDetail({ v }: { v: (typeof VAULTS)[number] }) {
  return (
    <div className="mkt-detail" data-panel={v.key} style={v.key === VAULTS[0].key ? undefined : { display: "none" }}>
      {/* Overview */}
      <section className="vd-sec">
        <div className="vd-head"><span className="vt-logo"><img src={v.logo} alt="" /></span>
          <div className="vd-head-main">
            <div className="vd-head-top"><h3>{v.name}</h3><span className={`vt-badge ${v.strategy.toLowerCase()}`}>{v.riskLabel} Risk</span></div>
            <p className="vd-desc">{v.tagline}</p>
          </div>
          <a className="vd-ext" href={v.researchUrl} target="_blank" rel="noopener noreferrer" aria-label={`${v.name} research`}><ExternalLink /></a>
        </div>
        <div className="vd-stats">
          <div><span className="k">Net APY (7D)</span><b className="hi">{v.apy}</b></div>
          <div><span className="k">TVL</span><b>{v.tvl}</b><small>{v.tvlChg}</small></div>
          <div><span className="k">Leverage</span><b>{v.leverage}</b></div>
        </div>
      </section>

      {/* Vault info */}
      <section className="vd-sec">
        <h4 className="vd-title">Vault info</h4>
        <div className="vd-info">
          <div><span className="k">Chain</span><span className="v vd-v-chain"><img src={v.chainIcon} alt="" />{v.chain}</span></div>
          <div><span className="k">Deposit / Withdrawal Fee</span><span className="v">None</span></div>
          <div><span className="k">Withdrawal time</span><span className="v">{v.fees.wtime}</span></div>
          <div><span className="k">Powered by</span><span className="mc-logos">{v.powered.map((p) => <img key={p} src={p} alt="" />)}</span></div>
        </div>
      </section>

      {/* Historical Performance */}
      <section className="vd-sec vd-chart-sec">
        <div className="vd-chart-head">
          <div>
            <h4 className="vd-title">Historical Performance</h4>
            <span className="vd-chart-sub">Historical vault receipt token price</span>
          </div>
          <div className="vd-apy-badge"><b>{v.trailingApy}</b><span>7D trailing APY</span></div>
        </div>
        <RangeChart v={v} />
      </section>

      {/* Strategy */}
      <section className="vd-sec">
        <details className="vd-stepper">
          <summary className="vd-strat-summary">
            <div className="vd-strat-head">
              <h4 className="vd-title">Strategy</h4>
              <ChevronDown className="vd-stepcaret" />
            </div>
            <p className="vd-desc">{v.strategyIntro}</p>
            <div className="vd-steprow">
              {v.steps.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <span className="vd-stepsep"><ChevronsRight /></span>}
                  <span className="vd-stepnode"><i>{i + 1}</i><em>{s.label}</em></span>
                </Fragment>
              ))}
            </div>
          </summary>
          <div className="vd-stepdetail">
            {v.steps.map((s, i) => (
              <div className="vd-stepitem" key={s.label}>
                <i>{i + 1}</i>
                <div><b>{s.title}</b><span>{s.detail}</span></div>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Smart Contracts */}
      <section className="vd-sec">
        <div className="vd-sc-head">
          <h4 className="vd-title">Smart Contracts</h4>
          <span className="vd-chainbadge"><img src={v.contractChainIcon} alt="" />{v.contractChain}</span>
        </div>
        <div className="vd-info">
          <div>
            <span className="k">{v.contractName}</span>
            <span className="v vd-sc-addr"><span className="mono">{v.addr}</span>
              <button type="button" className="vd-sc-ic vd-copy" data-copy={v.addr} aria-label="Copy address"><Copy className="ic-copy" /><Check className="ic-check" /></button>
              <a className="vd-sc-ic" href={v.explorerUrl} target="_blank" rel="noopener noreferrer" aria-label="View on explorer"><ExternalLink /></a>
            </span>
          </div>
          <div>
            <span className="k">Debank Bundled Wallets</span>
            <a className="v vd-sc-ic" href={v.debankUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Debank"><ExternalLink /></a>
          </div>
        </div>
      </section>

      {/* Security — Proof of Reserves (giống Home), nằm cuối */}
      <a className="vd-por" href="/transparency/" aria-label="Proof of Reserves">
        <div className="vd-por-lead">
          <span className="vd-por-shield"><ShieldCheck /></span>
          <div><b>Proof of Reserves</b><span>Independent third-party verification of the protocol&apos;s backing assets.</span></div>
        </div>
        <div className="vd-por-marks">
          {SECURITY.map((s) => <img key={s.name} src={s.logo} alt={s.name} />)}
          <span className="vd-por-arr">→</span>
        </div>
      </a>
    </div>
  );
}

/* Vị thế của user (tĩnh, demo — chưa connect ví). */
/* Chỉ hiển thị khi user đã connect ví — ở đây dùng dữ liệu demo (giả lập đã connect). */
function YourPosition({ v }: { v: (typeof VAULTS)[number] }) {
  return (
    <div className="card yp-card">
      <h4 className="yp-title">Your Position</h4>
      <div className="yp-sum">
        <b>{v.position.value}</b>
        <span className="pos">{v.position.earned} ({v.position.pnl})</span>
      </div>
    </div>
  );
}

/* Cụm Position + Today Order theo từng vault (đổi cùng lúc với form/chi tiết). */
function VaultAside({ v }: { v: (typeof VAULTS)[number] }) {
  return (
    <div className="vault-aside" data-panel={v.key} style={v.key === VAULTS[0].key ? undefined : { display: "none" }}>
      <YourPosition v={v} />
      <details className="acc ohist" open>
        <summary>Today Order</summary>
        <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="mint">Deposit</button><button className="ofilter" data-filter="redeem">Withdraw</button></div>
        <div className="olist">
          {v.orders.map((o, i) => (
            <OrderItem key={i} kind={o.kind as "mint" | "redeem"} label={o.label} addr={o.addr} amount={o.amount} status={o.status as "completed" | "pending"} />
          ))}
        </div>
      </details>
    </div>
  );
}

export const metadata = pageMetadata("/marketplace");

/* Ô nhập tiền (deposit / receive) theo layout Figma mới. */
function Field({
  label,
  sym,
  symLabel,
  balance,
  deposit = false,
  input = {},
}: {
  label: string;
  sym: string;
  symLabel: string;
  balance?: string;
  deposit?: boolean;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="mfield">
      <div className="mfield-l">
        <span className="lbl">{label}</span>
        <input type="text" placeholder="0" aria-label={label} {...input} />
        <div className="xusd">≈ $0.00</div>
        {deposit && <div className="mint-err">KYC/KYB access required to mint</div>}
      </div>
      <div className="mfield-r">
        {deposit && (
          <div className="pct-opts">
            <button type="button" className="pct">25%</button>
            <button type="button" className="pct">50%</button>
            <button type="button" className="pct">75%</button>
            <button type="button" className="pct">Max</button>
          </div>
        )}
        <span className="token" data-sym={sym}>
          <img src={sym === "usdt" ? "/assets/tokens/usdt0.png" : `/assets/tokens/${sym}.svg`} alt="" />
          {symLabel}
        </span>
        {balance && (
          <div className="bal">
            Balance: <span className="v">{balance}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SwapCircle() {
  return (
    <button type="button" className="swap-circle" data-swap aria-label="Swap direction">
      <ArrowUpDown />
    </button>
  );
}

function OrderItem({
  kind,
  label,
  addr,
  amount,
  status,
}: {
  kind: "mint" | "redeem";
  label: string;
  addr: string;
  amount: string;
  status: "completed" | "pending";
}) {
  const Icon = kind === "mint" ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="ord" role="button" tabIndex={0} data-kind={kind}>
      <span className="oicon"><Icon /></span>
      <div className="oleft">
        <span className="ot">{label}</span>
        <span className="oa">{addr}</span>
      </div>
      <div className="oright">
        <span className="ov">{amount}</span>
        {status !== "completed" && <span className={`badge ${status}`}>Pending</span>}
      </div>
    </div>
  );
}

export default function Marketplace() {
  return (
    <div className="pg-marketplace">

      {/* ===================== OVERVIEW (mở mặc định) ===================== */}
      <section className="mkt-ov" data-mkt="overview">
        <div className="opp-head rv">
          <div>
            <h1>Marketplace</h1>
            <p className="lede">Single-asset, leveraged-yield strategies on best-in-class collateral across blue-chip DeFi money markets, with up to <b>8.53%</b> APY. Each vault is isolated to one type of asset exposure - e.g. yzSyrup is only exposed to Maple Finance&apos;s Syrup (overcollateralized lending).</p>
          </div>
        </div>

        <div className="mkt-trust rv">
          <span className="mkt-trust-lbl">Audited, monitored &amp; managed with</span>
          <div className="mkt-trust-row">
            {[
              { name: "Pashov Audit Group", logo: "/assets/partners/pashov.jpeg" },
              { name: "Dedaub", logo: "/assets/partners/dedaub-fav.png" },
              { name: "Hypernative", logo: "/assets/partners/hypernative-fav.png" },
              { name: "Fordefi", logo: "/assets/partners/fordefi-fav.png" },
            ].map((p) => (
              <span className="mkt-partner" key={p.name}>
                <img src={p.logo} alt="" />{p.name}
              </span>
            ))}
          </div>
        </div>

        <div className="page-stats mkt-stats rv">
          <div><div className="k">Total TVL</div><div className="v" data-count="10.52" data-prefix="$" data-suffix="M" data-dec="2">$10.52M</div></div>
          <div><div className="k">7D APY (up to)</div><div className="v" style={{ color: "var(--mkt)" }} data-count="8.53" data-suffix="%" data-dec="2">8.53%</div></div>
          <div><div className="k">Active vaults</div><div className="v" data-count="2">2</div></div>
          <div><div className="k">Yield distributed</div><div className="v" data-count="15.5" data-prefix="$" data-suffix="K" data-dec="1">$15.5K</div></div>
        </div>

        <div className="card mkt-vaults rv">
          <div className="mkt-grid">
            {VAULTS.map((v) => (
              <div className="mkt-card" key={v.key}>
                <div className="mc-top">
                  <span className="vt-logo"><img src={v.logo} alt="" /></span>
                  <div className="mc-id">
                    <div className="mc-name"><b>{v.name}</b><span className={`vt-badge ${v.strategy.toLowerCase()}`}>{v.stateBadge}</span></div>
                    <small>{v.addr}</small>
                  </div>
                  <div className="mc-apy"><span className="mc-apy-v">{v.apy}</span><span className="mc-apy-l">Net APY (7D)</span></div>
                </div>
                <div className="mc-badges">
                  <span className="mc-chip"><img src={v.chainIcon} alt="" />{v.chain}</span>
                  <span className="mc-chip"><img src={v.assetIcon} alt="" />{v.asset}</span>
                </div>
                <p className="mc-desc">{v.desc}</p>
                <button type="button" className="mc-more">Read More</button>
                <div className="mc-stats">
                  <div><span className="k">TVL</span><b>{v.tvl}</b><small>{v.tvlChg}</small></div>
                  <div><span className="k">Leverage</span><b>{v.leverage}</b></div>
                  <div><span className="k">Risk</span><span className={`risk r${v.risk}`}><i /><i /><i /><i /></span><small>{v.riskLabel}</small></div>
                </div>
                <div className="mc-foot">
                  <div className="mc-powered"><span className="k">Powered by</span><span className="mc-logos">{v.powered.map((p) => <img key={p} src={p} alt="" />)}</span></div>
                  <button type="button" className="btn btn-accent vt-deposit" data-vault={v.key}>Deposit <ArrowRight /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== EXCHANGE (hiện khi chọn 1 vault) ===================== */}
      <div className="mkt-xchg" data-mkt="exchange" hidden>
        <button type="button" className="mkt-back" data-mkt-back><ArrowLeft className="ic" /> All vaults</button>

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <div className="mkt-vault-grid">
          <div className="mkt-vault-left">
          {/* ============ yzSyrup ============ */}
          <div className="xchg-body" data-panel="yzsyrup">
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="deposit">Deposit</button>
                <button data-dir="withdraw">Withdraw</button>
              </div>
            </div>
            <div data-dirpanel="deposit">
              <div className="mfields">
                <Field label="You deposit" sym="usdc" symLabel="USDC" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzSyrup" symLabel="yzSyrup" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
            </div>
            <div data-dirpanel="withdraw" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You withdraw" sym="yzSyrup" symLabel="yzSyrup" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
              <MetaRows rows={[
                { k: "Redemption", v: "Open" },
                { k: "Performance fee", v: "10%" },
              ]} />
            </div>
          </div>

          {/* ============ yzCash ============ */}
          <div className="xchg-body" data-panel="yzcash" style={{ display: "none" }}>
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="deposit">Deposit</button>
                <button data-dir="withdraw">Withdraw</button>
              </div>
            </div>
            <div data-dirpanel="deposit">
              <div className="mfields">
                <Field label="You deposit" sym="usdc" symLabel="USDC" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzCash" symLabel="yzCash" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
            </div>
            <div data-dirpanel="withdraw" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You withdraw" sym="yzCash" symLabel="yzCash" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
              <MetaRows rows={[
                { k: "Redemption", v: "Open" },
              ]} />
            </div>
          </div>

          {/* Position + Today Order theo từng vault (đổi theo vault đang chọn) */}
          <VaultAside v={VAULTS[0]} />
          <VaultAside v={VAULTS[1]} />
          </div>{/* .mkt-vault-left */}

          <div className="mkt-vault-right">
            <VaultDetail v={VAULTS[0]} />
            <VaultDetail v={VAULTS[1]} />
          </div>
          </div>{/* .mkt-vault-grid */}
        </div>

      </div>
      </div>

      {/* Dialog yêu cầu mật khẩu trước khi vào vault details + form deposit */}
      <div className="mkt-gate" data-gate hidden>
        <div className="mkt-gate-backdrop" data-gate-close />
        <div className="mkt-gate-card" role="dialog" aria-modal="true" aria-label="Enter password">
          <button type="button" className="mkt-gate-x" data-gate-close aria-label="Close"><X /></button>
          <span className="mkt-gate-ic"><Lock /></span>
          <h3>Password required</h3>
          <p>This vault is access-protected. Enter the password to open the deposit form.</p>
          <div className="mkt-gate-field">
            <input type="text" className="mkt-gate-input" data-gate-input placeholder="Enter password" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} inputMode="text" />
            <div className="mkt-gate-actions">
              <span className="mkt-gate-warn" aria-hidden="true"><AlertTriangle /></span>
              <button type="button" className="mkt-gate-eye" data-gate-eye aria-label="Show password"><Eye className="ic-show" /><EyeOff className="ic-hide" /></button>
            </div>
          </div>
          <div className="mkt-gate-err" data-gate-err hidden>Incorrect password. Please try again.</div>
          <button type="button" className="btn btn-solid btn-block" data-gate-submit>Confirm</button>
        </div>
      </div>

      <MarketplaceClient/>
    </div>
  );
}
