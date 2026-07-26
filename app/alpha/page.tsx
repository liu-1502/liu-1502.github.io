import Link from "next/link";
import "./styles.css";
import AlphaClient from "./AlphaClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import { ArrowUpDown, CircleHelp, ArrowDownRight, ArrowUpRight, X } from "lucide-react";

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

export default function Alpha() {
  return (
    <div className="pg-alpha">

      <div className="form-head rv">
        <h1>Alpha</h1>
      </div>

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        {/* Nút About Alpha: góc phải trên content, canh phải như Connect Wallet */}
        <div className="about-wrap">
          <button className="about-btn" data-about-toggle aria-expanded="false"><CircleHelp className="ico" /> About</button>
          <div className="about-menu" data-about-menu hidden>
            <div className="aside-head">
              <h3 className="aside-title">About yzUSD/yzPP/syzUSD</h3>
              <button className="aside-close" data-about-close aria-label="Close details"><X /></button>
            </div>
            <div className="tk-strip aside-marks">
              <img src="/assets/tokens/yzUSD.svg" alt="yzUSD" />
              <img src="/assets/tokens/yzPP.svg" alt="yzPP" />
              <img src="/assets/tokens/syzUSD.svg" alt="syzUSD" />
            </div>
            <div className="aside-card">
              <h4>Yield cadence</h4>
              <p>syzUSD yield is decided every Friday and covers the week that follows. yzPP earns the same base yield plus a protocol-funded premium, budgeted daily at 04:00 UTC.</p>
              <div className="rows">
                <div><span className="k">syzUSD weekly target</span><span className="v" style={{ color: "var(--alpha)" }}>7.75%</span></div>
                <div><span className="k">syzUSD epoch</span><span className="v">Fri 04:00 to Fri 03:59 UTC</span></div>
                <div><span className="k">yzPP estimated APY</span><span className="v" style={{ color: "var(--alpha)" }}>27.0%</span></div>
                <div><span className="k">yzPP premium budget</span><span className="v">Daily, 04:00 UTC</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Backing, verified live</h4>
              <p>Every yzUSD is backed by more than one dollar of onchain assets, attested every 15 minutes by Accountable.</p>
              <div className="rows">
                <div><span className="k">Collateral ratio</span><span className="v" style={{ color: "var(--good)" }}>110.82%</span></div>
                <div><span className="k">First-loss buffer</span><span className="v">yzPP + Reserve Fund</span></div>
                <div><span className="k">Proof of reserves</span><span className="v" style={{ color: "var(--good)" }}><Link href="/transparency" style={{ color: "inherit", textDecoration: "none" }}>Live →</Link></span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="xchg rv">
          {/* Token pill tabs */}
          <div className="tok-tabs xchg-tabs" id="alphaTabs">
            <button className="tok-tab on" data-tab="yzusd"><img src="/assets/tokens/yzUSD.svg" alt="" /><span className="sym">yzUSD</span></button>
            <button className="tok-tab" data-tab="yzpp"><img src="/assets/tokens/yzPP.svg" alt="" /><span className="sym">yzPP</span></button>
            <button className="tok-tab" data-tab="syzusd"><img src="/assets/tokens/syzUSD.svg" alt="" /><span className="sym">syzUSD</span></button>
          </div>

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
              <div className="mfoot"><span>Minted Amount: 0.00 yzUSD</span><span>Minting Fee: 0.00%</span></div>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzUSD" symLabel="yzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <div className="mfoot"><span>Redeemed: 0.00 USDT0</span><span>Redeem Fee: 0.00%</span></div>
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
              <div className="mfoot"><span>yzPP price: 1.148527 USDT0</span><span>Est. APY: 27.0%</span></div>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPP" symLabel="yzPP" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
              <div className="mfoot"><span>Window: 30 days</span><span>Min order: 5,000 yzPP</span></div>
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
              <div className="mfoot"><span>Rate: 1 yzUSD = 0.9361 syzUSD</span><span>Weekly target: 7.75%</span></div>
            </div>
            <div data-dirpanel="unstake" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You unstake" sym="syzUSD" symLabel="syzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzUSD" symLabel="yzUSD" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block>Connect Wallet</Button>
              <div className="mfoot"><span>Rate: 1 syzUSD = 1.0683 yzUSD</span><span>Settlement: near instant</span></div>
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
