import "../alpha/styles.css";
import "./styles.css";   /* override màu xanh cho Marketplace, load sau alpha styles */
import MarketplaceClient from "./MarketplaceClient";
import MetaRows from "@/components/ui/MetaRows";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpDown, CircleHelp, ArrowDownRight, ArrowUpRight, X, ArrowRight, ArrowLeft } from "lucide-react";

/* Danh sách vault hiển thị ở màn Overview; key khớp data-panel của card exchange. */
const VAULTS = [
  {
    key: "yzsyrup", name: "yzSyrup", addr: "0xc985…09b1", logo: "/assets/tokens/yzSyrup.svg",
    strategy: "Leverage", type: "Overcollateralized Lending",
    chain: "Monad", chainIcon: "/assets/chains/monad.svg",
    tvl: "$3.01M", tvlChg: "+0.02% · 24h", apy: "8.53%", leverage: "10×",
    risk: 2, riskLabel: "Low–Moderate", asset: "USDC", assetIcon: "/assets/tokens/usdc.svg",
    desc: "Leveraged exposure to SyrupUSD (overcollateralized lending). SyrupUSD is a yield-bearing stablecoin issued by Maple Finance, backed by overcollateralized loans to institutional borrowers, wrapped for Monad as a single yield-bearing token.",
    powered: ["/assets/protocols/maple.png", "/assets/protocols/morpho.svg", "/assets/protocols/euler.svg", "/assets/protocols/fluid.svg"],
  },
  {
    key: "yzcash", name: "yzCash", addr: "0x224e…098d", logo: "/assets/tokens/yzCash.svg",
    strategy: "Lending", type: "Tokenized T-Bills",
    chain: "Monad", chainIcon: "/assets/chains/monad.svg",
    tvl: "$7.51M", tvlChg: "+0.01% · 24h", apy: "4.90%", leverage: "0×",
    risk: 1, riskLabel: "Low", asset: "USDC", assetIcon: "/assets/tokens/usdc.svg",
    desc: "Yuzu Cash is an unlevered, short-duration (<24H) liquidity vault designed to deliver yields above the standard overnight rate while maintaining strict risk discipline. Backed by tokenized T-Bills from leading issuers.",
    powered: ["/assets/protocols/openeden.svg"],
  },
];

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
                  <div className="mc-id"><b>{v.name}</b><small>{v.addr}</small></div>
                  <span className={`vt-badge ${v.strategy.toLowerCase()}`}>{v.strategy}</span>
                  <div className="mc-apy"><span className="mc-apy-v">{v.apy}</span><span className="mc-apy-l">APY (7D)</span></div>
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

        {/* Nút About Marketplace: góc phải trên content, canh phải như Connect Wallet */}
        <div className="about-wrap">
          <button className="about-btn" data-about-toggle aria-expanded="false"><CircleHelp className="ico" /> About</button>
          <div className="about-menu" data-about-menu hidden>
            <div className="aside-head">
              <h3 className="aside-title">About yzSyrup / yzCash</h3>
              <button className="aside-close" data-about-close aria-label="Close details"><X /></button>
            </div>
            <div className="tk-strip aside-marks">
              <img src="/assets/tokens/yzSyrup.svg" alt="yzSyrup" />
              <img src="/assets/tokens/yzCash.svg" alt="yzCash" />
            </div>
            <div className="aside-card">
              <h4>yzSyrup · Maple Syrup Lending</h4>
              <p>Overcollateralized lending to KYC institutional borrowers through Maple Syrup, wrapped for Monad as a single yield-bearing token. Loans are secured by liquid digital assets, with recourse.</p>
              <div className="rows">
                <div><span className="k">APY</span><span className="v" style={{ color: "var(--mkt)" }}>8.53%</span></div>
                <div><span className="k">Token price</span><span className="v">1 yzSyrup = $1.0192</span></div>
                <div><span className="k">Chain</span><span className="v">Monad</span></div>
                <div><span className="k">Redeem</span><span className="v">Open</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>yzCash · Tokenized T-Bill Cash</h4>
              <p>The U.S. sovereign rate, onchain. A cash-management token backed by tokenized T-Bills from leading issuers, with near-instant liquidity and no lockups. Park stables, earn the risk-free rate.</p>
              <div className="rows">
                <div><span className="k">APY</span><span className="v" style={{ color: "var(--mkt)" }}>4.90%</span></div>
                <div><span className="k">Token price</span><span className="v">1 yzCash = $1.0000</span></div>
                <div><span className="k">Liquidity</span><span className="v">Instant</span></div>
                <div><span className="k">Redeem</span><span className="v">Open</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="xchg rv">
          {/* Token pill tabs */}
          <div className="tok-tabs xchg-tabs" id="mktTabs">
            <button className="tok-tab on" data-tab="yzsyrup"><img src="/assets/tokens/yzSyrup.svg" alt="" /><span className="sym">yzSyrup</span></button>
            <button className="tok-tab" data-tab="yzcash"><img src="/assets/tokens/yzCash.svg" alt="" /><span className="sym">yzCash</span></button>
          </div>

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
              <MetaRows rows={[
                { k: "Current APY", v: "8.53%", hi: true },
                { k: "Chain", v: "Monad" },
                { k: "Deposit fee", v: "None" },
              ]} />
            </div>
            <div data-dirpanel="withdraw" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You withdraw" sym="yzSyrup" symLabel="yzSyrup" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
              <MetaRows rows={[
                { k: "Current APY", v: "8.53%", hi: true },
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
              <MetaRows rows={[
                { k: "Current APY", v: "4.90%", hi: true },
                { k: "Liquidity", v: "Instant" },
                { k: "Deposit fee", v: "None" },
              ]} />
            </div>
            <div data-dirpanel="withdraw" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You withdraw" sym="yzCash" symLabel="yzCash" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block">Connect Wallet</button>
              <MetaRows rows={[
                { k: "Current APY", v: "4.90%", hi: true },
                { k: "Redemption", v: "Open" },
                { k: "Liquidity", v: "Instant" },
              ]} />
            </div>
          </div>

          {/* Order history */}
          <details className="acc ohist" open>
            <summary>Today Order</summary>
            <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="mint">Deposit</button><button className="ofilter" data-filter="redeem">Withdraw</button></div>
            <div className="olist">
              <OrderItem kind="mint" label="Deposit yzSyrup" addr="0x71bC8…9Ae0" amount="$3,000.00" status="completed" />
              <OrderItem kind="redeem" label="Withdraw yzCash" addr="0x9A2f1…C4dE" amount="$1,200.00" status="completed" />
              <OrderItem kind="mint" label="Deposit yzSyrup" addr="0xeED43…AbbA" amount="$8,000.00" status="pending" />
            </div>
          </details>
        </div>

      </div>
      </div>

      <MarketplaceClient/>
    </div>
  );
}
