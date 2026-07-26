import Link from "next/link";
import "../alpha/styles.css";
import "./styles.css";   /* override màu nâu cho Prime, load sau alpha styles */
import PrimeClient from "./PrimeClient";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpDown, CircleHelp, ArrowDownRight, ArrowUpRight, X } from "lucide-react";

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

      <div className="form-head rv">
        <h1>Prime</h1>
        <p>Institutional yield at NAV — tokenized T-Bills, AAA CLOs, and overcollateralized lending. No epochs, no lockups.</p>
      </div>

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        {/* Nút About Prime: góc phải trên content, canh phải như Connect Wallet */}
        <div className="about-wrap">
          <button className="about-btn" data-about-toggle aria-expanded="false"><CircleHelp className="ico" /> About</button>
          <div className="about-menu" data-about-menu hidden>
            <div className="aside-head">
              <h3 className="aside-title">About yzPrime</h3>
              <button className="aside-close" data-about-close aria-label="Close details"><X /></button>
            </div>
            <div className="tk-strip aside-marks">
              <img src="/assets/tokens/yzPrime.svg" alt="yzPrime" />
              <img src="/assets/tokens/usdc.svg" alt="USDC" />
            </div>
            <div className="aside-card">
              <h4>Mandate & NAV</h4>
              <p>yzPrime accrues continuously at NAV under a public asset-whitelist mandate — tokenized T-Bills, AAA CLOs and overcollateralized lending. No epochs, no lockups.</p>
              <div className="rows">
                <div><span className="k">Prevailing NAV</span><span className="v" style={{ color: "var(--prime)" }}>$1.01243</span></div>
                <div><span className="k">Yield accrual</span><span className="v">Continuous, no epochs</span></div>
                <div><span className="k">Mandate</span><span className="v">Asset whitelist, public</span></div>
                <div><span className="k">Network</span><span className="v">Monad</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Backing, verified live</h4>
              <p>Assets and liabilities are attested in near real time by Accountable. Check the backing before and after you mint.</p>
              <div className="rows">
                <div><span className="k">Assets / liabilities</span><span className="v" style={{ color: "var(--good)" }}>100.28%</span></div>
                <div><span className="k">Collateral</span><span className="v">100% onchain</span></div>
                <div><span className="k">Proof of reserves</span><span className="v" style={{ color: "var(--good)" }}><Link href="/transparency" style={{ color: "inherit", textDecoration: "none" }}>Live →</Link></span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="xchg rv">

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
              <div className="mfoot"><span>Minted Amount: 0.00 yzPrime</span><span>Minting Fee: 0.00%</span></div>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPrime" symLabel="yzPrime" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block gcta">Connect Wallet</button>
              <div className="mfoot"><span>Redeemed: 0.00 USDC</span><span>Redeem Fee: 0.00%</span></div>
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
        </div>

      </div>

      <PrimeClient/>
    </div>
  );
}
