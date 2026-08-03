import Link from "next/link";
import "../alpha/styles.css";
import "./styles.css";   /* override màu nâu cho Prime, load sau alpha styles */
import PrimeClient from "./PrimeClient";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpDown, ArrowDownRight, ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata = pageMetadata("/prime");

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

export default function Prime() {
  return (
    <div className="pg-prime">

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          {/* Page header */}
          <div className="av-head">
            <h1>Yuzu Prime</h1>
            <p>yzPrime is an actively managed portfolio of leveraged RWA positions on DeFi. Its universe of RWAs include i) T-Bills, ii) overcollateralized loans (e.g. Syrup) and iii) A-grade investment credit (e.g. AAA CLOs).</p>
          </div>
          <div className="av-grid">
          <div className="av-left">

          {/* ============ yzPrime ============ */}
          <div className="xchg-body" data-panel="prime">
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="mint">Mint</button>
                <button data-dir="redeem">Redeem</button>
              </div>
            </div>
            <div data-dirpanel="mint">
              <div className="mfields">
                <Field label="You deposit" sym="usdc" symLabel="USDC" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzPrime" symLabel="yzPrime" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block gcta">Connect Wallet</button>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPrime" symLabel="yzPrime" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block gcta">Connect Wallet</button>
            </div>
          </div>

          {/* Order history */}
          <details className="acc ohist" open>
            <summary>Today Order</summary>
            <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="mint">Mint</button><button className="ofilter" data-filter="redeem">Redeem</button></div>
            <div className="olist">
              <OrderItem kind="mint" label="Mint yzPrime" addr="0x71bC8…9Ae0" amount="$5,000.00" status="completed" />
              <OrderItem kind="redeem" label="Redeem yzPrime" addr="0x9A2f1…C4dE" amount="$2,500.00" status="completed" />
              <OrderItem kind="mint" label="Mint yzPrime" addr="0xeED43…AbbA" amount="$10,000.00" status="pending" />
            </div>
          </details>
          </div>{/* .av-left */}

          <div className="av-right">
            <div className="av-detail">
              {/* Overview */}
              <section className="vd-sec">
                <div className="vd-head">
                  <span className="vt-logo"><img src="/assets/tokens/yzPrime.svg" alt="" /></span>
                  <div className="vd-head-main">
                    <div className="vd-head-top"><h3>yzPrime</h3></div>
                    <p className="vd-desc">yzPrime is an actively managed portfolio of leveraged RWA positions on DeFi. Its universe of RWAs include i) T-Bills, ii) overcollateralized loans (e.g. Syrup) and iii) A-grade investment credit (e.g. AAA CLOs).</p>
                  </div>
                </div>
                <div className="vd-stats">
                  <div><span className="k">NAV</span><b>$1.01243</b></div>
                  <div><span className="k">Backing</span><b className="good">100.28%</b></div>
                  <div><span className="k">Network</span><b><img className="vd-stat-ic" src="/assets/chains/monad.svg" alt="" />Monad</b></div>
                </div>
              </section>

              {/* Details */}
              <section className="vd-sec">
                <h4 className="vd-title">Details</h4>
                <div className="vd-info">
                  <div><span className="k">Prevailing NAV</span><span className="v">$1.01243</span></div>
                  <div><span className="k">Yield accrual</span><span className="v">Continuous, no epochs</span></div>
                  <div><span className="k">Mandate</span><span className="v">Asset whitelist, public</span></div>
                  <div><span className="k">Settlement</span><span className="v">Per program rules</span></div>
                  <div><span className="k">Network</span><span className="v">Monad</span></div>
                </div>
              </section>

              {/* Backing */}
              <section className="vd-sec">
                <h4 className="vd-title">Backing, verified live</h4>
                <p className="vd-desc">Assets and liabilities are attested in near real time by Accountable. Check the backing before and after you mint.</p>
                <div className="vd-info">
                  <div><span className="k">Assets / liabilities</span><span className="v">100.28%</span></div>
                  <div><span className="k">Collateral</span><span className="v">100% onchain</span></div>
                </div>
              </section>
            </div>

            {/* Proof of Reserves */}
            <a className="vd-por" href="/transparency/" aria-label="Proof of Reserves">
              <div className="vd-por-lead">
                <span className="vd-por-shield"><ShieldCheck /></span>
                <div><b>Proof of Reserves</b><span>Independent third-party verification of the protocol&apos;s backing assets.</span></div>
              </div>
              <div className="vd-por-marks">
                <img src="/assets/partners/accountable-fav.png" alt="Accountable" />
                <img src="/assets/partners/hypernative-fav.png" alt="Hypernative" />
                <img src="/assets/partners/fordefi-fav.png" alt="Fordefi" />
                <img src="/assets/partners/chainlink-fav.png" alt="Chainlink" />
                <span className="vd-por-arr">→</span>
              </div>
            </a>
          </div>
          </div>{/* .av-grid */}
        </div>

      </div>

      <PrimeClient/>
    </div>
  );
}
