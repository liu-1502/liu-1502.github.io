import Link from "next/link";
import "./styles.css";
import AlphaClient from "./AlphaClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import MetaRows from "@/components/ui/MetaRows";
import { ArrowUpDown, ArrowDownRight, ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata("/alpha");

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

/* Thông tin chi tiết từng token (cột phải, luôn hiện, đổi theo tab). */
const TOKENS = [
  {
    key: "yzusd", name: "yzUSD", logo: "/assets/tokens/yzUSD.svg",
    badge: "Senior · Par stable",
    tagline: "Fully-backed 1:1 USD stablecoin, over-collateralized and attested live.",
    stats: [ { k: "Peg", v: "1:1" }, { k: "Collateral ratio", v: "110.82%", tone: "good" }, { k: "Network", v: "Plasma" } ],
    info: [
      { k: "Rate", v: "1:1 at par" },
      { k: "Access", v: "Eligible Investors, KYC" },
      { k: "Alternative", v: "Swap on Curve, no KYC", hi: true },
      { k: "Network", v: "Plasma" },
    ],
    note: {
      title: "Backing, verified live",
      body: "Every yzUSD is backed by more than one dollar of onchain assets, attested every 15 minutes by Accountable.",
      rows: [
        { k: "First-loss buffer", v: "yzPP + Reserve Fund" },
        { k: "Proof of reserves", v: "Live →", link: "/transparency" },
      ],
    },
  },
  {
    key: "yzpp", name: "yzPP", logo: "/assets/tokens/yzPP.svg",
    badge: "Junior tranche",
    tagline: "Junior tranche that absorbs first losses and earns the leveraged premium.",
    stats: [ { k: "Est. APY", v: "27.0%", tone: "hi" }, { k: "Price", v: "1.1485" }, { k: "Role", v: "Junior" } ],
    info: [
      { k: "yzPP price", v: "1 yzPP = 1.148527 USDT0" },
      { k: "Estimated APY", v: "27.0%", hi: true },
      { k: "Role", v: "Junior tranche, absorbs losses first" },
      { k: "Redemption window", v: "30 days, yield accrues" },
      { k: "Minimum order", v: "5,000 yzPP" },
      { k: "Access", v: "Eligible Investors, KYC" },
    ],
    note: {
      title: "During a loss event",
      body: "Redemptions pause until the loss is assessed. yzPP absorbs losses before senior holders, in exchange for the leveraged premium.",
    },
  },
  {
    key: "syzusd", name: "syzUSD", logo: "/assets/tokens/syzUSD.svg",
    badge: "Staked yield",
    tagline: "Staked yzUSD (ERC-4626) that accrues the weekly target yield.",
    stats: [ { k: "Weekly target", v: "7.75%", tone: "hi" }, { k: "Rate", v: "0.9361" }, { k: "Network", v: "Plasma" } ],
    info: [
      { k: "Exchange rate", v: "1 yzUSD = 0.9361 syzUSD" },
      { k: "Weekly target yield", v: "7.75%", hi: true },
      { k: "Yield epoch", v: "Fri 04:00 → Fri 03:59 UTC" },
      { k: "Unstaking", v: "One step, near instant" },
      { k: "Network", v: "Plasma" },
    ],
    note: {
      title: "Composability",
      body: "syzUSD is an ERC-4626 vault token. Use it as collateral, loop it, or provide liquidity on Pendle, Balancer and Curve while it keeps accruing.",
    },
  },
];

function TokenDetail({ t }: { t: (typeof TOKENS)[number] }) {
  return (
    <div className="av-detail" data-panel={t.key} style={t.key === TOKENS[0].key ? undefined : { display: "none" }}>
      {/* Overview */}
      <section className="vd-sec">
        <div className="vd-head">
          <span className="vt-logo"><img src={t.logo} alt="" /></span>
          <div className="vd-head-main">
            <div className="vd-head-top"><h3>{t.name}</h3><span className="vt-badge">{t.badge}</span></div>
            <p className="vd-desc">{t.tagline}</p>
          </div>
        </div>
        <div className="vd-stats">
          {t.stats.map((s) => (
            <div key={s.k}><span className="k">{s.k}</span><b className={s.tone ?? ""}>{s.v}</b></div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="vd-sec">
        <h4 className="vd-title">Details</h4>
        <div className="vd-info">
          {t.info.map((r) => (
            <div key={r.k}><span className="k">{r.k}</span><span className={`v${r.hi ? " hi" : ""}`}>{r.v}</span></div>
          ))}
        </div>
      </section>

      {/* Note (backing / loss / composability) */}
      <section className="vd-sec">
        <h4 className="vd-title">{t.note.title}</h4>
        <p className="vd-desc">{t.note.body}</p>
        {t.note.rows && (
          <div className="vd-info">
            {t.note.rows.map((r) => (
              <div key={r.k}><span className="k">{r.k}</span><span className="v">{r.link ? <Link href={r.link}>{r.v}</Link> : r.v}</span></div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function Alpha() {
  return (
    <div className="pg-alpha">

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          {/* Token pill tabs */}
          <div className="tok-tabs xchg-tabs" id="alphaTabs">
            <button className="tok-tab on" data-tab="yzusd"><img src="/assets/tokens/yzUSD.svg" alt="" /><span className="sym">yzUSD</span></button>
            <button className="tok-tab" data-tab="yzpp"><img src="/assets/tokens/yzPP.svg" alt="" /><span className="sym">yzPP</span></button>
            <button className="tok-tab" data-tab="syzusd"><img src="/assets/tokens/syzUSD.svg" alt="" /><span className="sym">syzUSD</span></button>
          </div>

          <div className="av-grid">
          <div className="av-left">

          {/* ============ yzUSD ============ */}
          <div className="xchg-body" data-panel="yzusd">
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="mint">Mint</button>
                <button data-dir="redeem">Redeem</button>
              </div>
            </div>
            <div data-dirpanel="mint">
              <div className="mfields">
                <Field label="You deposit" sym="usdt" symLabel="USDT0" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzUSD" symLabel="yzUSD" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <MetaRows rows={[
                { k: "Rate", v: "1:1 at par" },
                { k: "Access", v: "Eligible Investors, KYC" },
                { k: "Alternative", v: "Swap on Curve, no KYC", hi: true },
                { k: "Network", v: "Plasma" },
              ]} />
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzUSD" symLabel="yzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <MetaRows rows={[
                { k: "Rate", v: "1:1 at par" },
                { k: "Access", v: "Eligible Investors, KYC" },
                { k: "Alternative", v: "Swap on Curve, no KYC", hi: true },
              ]} />
            </div>
          </div>

          {/* ============ yzPP ============ */}
          <div className="xchg-body" data-panel="yzpp" style={{ display: "none" }}>
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="mint">Mint</button>
                <button data-dir="redeem">Redeem</button>
              </div>
            </div>
            <div data-dirpanel="mint">
              <div className="mfields">
                <Field label="You deposit" sym="usdt" symLabel="USDT0" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzPP" symLabel="yzPP" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <MetaRows rows={[
                { k: "yzPP price", v: "1 yzPP = 1.148527 USDT0" },
                { k: "Estimated APY", v: "27.0%", hi: true },
                { k: "Role", v: "Junior tranche, absorbs losses first" },
                { k: "Access", v: "Eligible Investors, KYC" },
              ]} />
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPP" symLabel="yzPP" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <MetaRows rows={[
                { k: "Redemption window", v: "30 days, yield keeps accruing" },
                { k: "Minimum order", v: "5,000 yzPP" },
                { k: "During a loss event", v: "Redemptions pause until assessed" },
                { k: "Access", v: "Eligible Investors, KYC" },
              ]} />
            </div>
          </div>

          {/* ============ syzUSD ============ */}
          <div className="xchg-body" data-panel="syzusd" style={{ display: "none" }}>
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="stake">Stake</button>
                <button data-dir="unstake">Unstake</button>
              </div>
            </div>
            <div data-dirpanel="stake">
              <div className="mfields">
                <Field label="You stake" sym="yzUSD" symLabel="yzUSD" balance="$0.00" deposit input={{ inputMode: "decimal", "data-src": true, "data-rate": "0.9361" } as React.InputHTMLAttributes<HTMLInputElement>} />
                <SwapCircle />
                <Field label="You receive" sym="syzUSD" symLabel="syzUSD" balance="$0.00" input={{ readOnly: true, "data-dst": true } as React.InputHTMLAttributes<HTMLInputElement>} />
              </div>
              <Button block>Connect Wallet</Button>
              <MetaRows rows={[
                { k: "Exchange rate", v: "1 yzUSD = 0.9361 syzUSD" },
                { k: "Weekly target yield", v: "7.75%", hi: true },
                { k: "Unstaking", v: "One step, near instant" },
                { k: "Network", v: "Plasma" },
              ]} />
            </div>
            <div data-dirpanel="unstake" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You unstake" sym="syzUSD" symLabel="syzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzUSD" symLabel="yzUSD" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block>Connect Wallet</Button>
              <MetaRows rows={[
                { k: "Exchange rate", v: "1 syzUSD = 1.0683 yzUSD" },
                { k: "Settlement", v: "Near instant" },
              ]} />
            </div>
          </div>

          {/* Stats ngay dưới card mint/redeem */}
          <div className="page-stats rv">
            <div><div className="k">Alpha TVL</div><div className="v" data-count="48470795" data-prefix="$">$0</div></div>
            <div><div className="k">Collateral ratio</div><div className="v" style={{ color: "var(--good)" }}>110.82%</div></div>
            <div><div className="k">syzUSD target</div><div className="v" style={{ color: "var(--alpha)" }}>7.75%</div></div>
            <div><div className="k">yzPP target</div><div className="v" style={{ color: "var(--alpha)" }}>27.0%</div></div>
            <div className="pro-only"><div className="k">Next epoch</div><div className="v">FRI 04:00</div></div>
          </div>

          {/* Order history */}
          <details className="acc ohist" open>
            <summary>Today Order</summary>
            <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="mint">Mint</button><button className="ofilter" data-filter="redeem">Redeem</button></div>
            <div className="olist">
              <OrderItem kind="mint" label="Mint yzUSD" addr="0xeED43…AbbA" amount="$1,000.50" status="completed" />
              <OrderItem kind="redeem" label="Redeem yzUSD" addr="0x9A2f1…C4dE" amount="$500.00" status="completed" />
              <OrderItem kind="mint" label="Mint yzPP" addr="0x71bC8…9Ae0" amount="$2,000.00" status="pending" />
            </div>
          </details>
          </div>{/* .av-left */}

          <div className="av-right">
            <TokenDetail t={TOKENS[0]} />
            <TokenDetail t={TOKENS[1]} />
            <TokenDetail t={TOKENS[2]} />
          </div>
          </div>{/* .av-grid */}
        </div>

      </div>


      <div className="wl-alert rv pro-only">
        <div>
          <div className="t">Ongoing whitelist activation</div>
          <div className="d">mGLOBAL (mGLO) enters the Alpha mandate in 4d 21h. Review the entry before any funds deploy.</div>
        </div>
        <Link className="go" href="/whitelist">Check it now →</Link>
      </div>


      <section className="section rv pro-only">
        <div className="section-head">
          <h2>What backs Alpha</h2>
          <Link href="/transparency">Live breakdown →</Link>
        </div>
        <div className="card compo">
          <p>Backing assets are deployed across curated strategy buckets under the public whitelist mandate. The live, wallet-by-wallet breakdown is published on the Accountable dashboard.</p>
          <div className="compo-rows">
            <div className="compo-row">
              <span className="name">Leveraged stable strategies
                <span className="sub">yzAUSD, USDe loops in isolated markets, fundamental oracles</span>
              </span>
              <span className="bar"><i style={{ width: "34%" }}></i></span>
              <span className="pct">34%</span>
            </div>
            <div className="compo-row">
              <span className="name">Overcollateralized lending
                <span className="sub">Maple Syrup, Curvance, Kamino, Jupiter Lend</span>
              </span>
              <span className="bar"><i style={{ width: "28%" }}></i></span>
              <span className="pct">28%</span>
            </div>
            <div className="compo-row">
              <span className="name">Tokenized T-Bills and AAA CLOs
                <span className="sub">BUIDL, VBILL, mGLOBAL and peers</span>
              </span>
              <span className="bar"><i style={{ width: "22%" }}></i></span>
              <span className="pct">22%</span>
            </div>
            <div className="compo-row">
              <span className="name">Funding-rate arbitrage
                <span className="sub">Ethena, Hyperliquid</span>
              </span>
              <span className="bar"><i style={{ width: "10%" }}></i></span>
              <span className="pct">10%</span>
            </div>
            <div className="compo-row">
              <span className="name">Stablecoin arbitrage and liquidity buffer
                <span className="sub">Curve, Balancer, Pendle pools</span>
              </span>
              <span className="bar"><i style={{ width: "6%" }}></i></span>
              <span className="pct">6%</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <Button href="/whitelist" variant="line">See all whitelisted assets and protocols <span className="arr">→</span></Button>
          </div>
        </div>
      </section>

      <AlphaClient/>
    </div>
  );
}
