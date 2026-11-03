import Link from "next/link";
import "../alpha/styles.css";
import "./styles.css";   /* override màu nâu cho Prime, load sau alpha styles */
import PrimeClient from "./PrimeClient";
import ReviewDialogs from "@/components/ReviewDialogs";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpDown, ArrowDownRight, ArrowUpRight, ShieldCheck, ExternalLink, ChevronDown, Search } from "lucide-react";

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
  amount,
  date,
  tx,
  status,
}: {
  kind: "mint" | "redeem";
  label: string;
  amount: string;
  date: string;
  tx: string;
  status: "pending" | "filled" | "finalized" | "cancelled";
}) {
  const Icon = kind === "mint" ? ArrowDownRight : ArrowUpRight;
  const negative = kind === "redeem"; // Redeem = tiền ra (âm), Mint = tiền vào (dương)
  const badgeLabel = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div className="ord" role="button" tabIndex={0} data-kind={kind} data-status={status}>
      <span className="oicon"><Icon /></span>
      <div className="oleft">
        <span className="ot">{label}</span>
        <span className="oa">{date}<span className="odot" /><span className="otx">{tx}<ExternalLink /></span></span>
        {status === "pending" && <button type="button" className="oaction neg">Cancel</button>}
        {status === "filled" && <button type="button" className="oaction">Finalize</button>}
      </div>
      <div className="oright">
        <span className={`ov${status === "finalized" ? (negative ? " ov-red" : " ov-green") : ""}`}>{negative ? "−" : "+"}{amount}</span>
        {status !== "finalized" && <span className={`badge ${status}`}>{badgeLabel}</span>}
      </div>
    </div>
  );
}

/* Lịch sử order (demo). Mặc định hiện 3, "Show more" sổ thêm 10 mỗi lần. */
const ORDERS: {
  kind: "mint" | "redeem"; label: string; amount: string; date: string; tx: string;
  status: "pending" | "filled" | "finalized" | "cancelled";
}[] = [
  { kind: "mint", label: "Mint yzPrime", amount: "$5,000.00", date: "03 Aug 2026, 12:59", tx: "0x71bC8…9Ae0", status: "filled" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$2,500.00", date: "30 Jul 2026, 23:08", tx: "0x9A2f1…C4dE", status: "pending" },
  { kind: "mint", label: "Mint yzPrime", amount: "$10,000.00", date: "30 Jul 2026, 21:10", tx: "0xeED43…AbbA", status: "pending" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$1,200.00", date: "29 Jul 2026, 18:22", tx: "0x71bC8…9Ae0", status: "finalized" },
  { kind: "mint", label: "Mint yzPrime", amount: "$3,200.00", date: "29 Jul 2026, 09:05", tx: "0x4aF0…2b1c", status: "cancelled" },
  { kind: "mint", label: "Mint yzPrime", amount: "$750.00", date: "28 Jul 2026, 20:41", tx: "0x1b7E…9c02", status: "finalized" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$4,120.00", date: "28 Jul 2026, 14:30", tx: "0x88aa…3d1f", status: "finalized" },
  { kind: "mint", label: "Mint yzPrime", amount: "$960.00", date: "27 Jul 2026, 11:12", tx: "0x2fc9…7ab4", status: "cancelled" },
  { kind: "mint", label: "Mint yzPrime", amount: "$12,000.00", date: "27 Jul 2026, 08:03", tx: "0x5e10…b2c8", status: "finalized" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$300.00", date: "26 Jul 2026, 22:57", tx: "0x9d44…1e6a", status: "finalized" },
  { kind: "mint", label: "Mint yzPrime", amount: "$2,500.00", date: "26 Jul 2026, 16:19", tx: "0x77bd…4f90", status: "finalized" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$1,800.00", date: "25 Jul 2026, 13:44", tx: "0x0ac1…8d33", status: "cancelled" },
  { kind: "mint", label: "Mint yzPrime", amount: "$640.00", date: "25 Jul 2026, 10:05", tx: "0x3ee2…5b71", status: "finalized" },
  { kind: "redeem", label: "Redeem yzPrime", amount: "$5,000.00", date: "24 Jul 2026, 19:26", tx: "0xa190…c7e2", status: "finalized" },
  { kind: "mint", label: "Mint yzPrime", amount: "$980.00", date: "24 Jul 2026, 09:51", tx: "0x6bf3…2a08", status: "finalized" },
];

export default function Prime() {
  return (
    <div className="pg-prime">

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
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
              <button className="btn btn-accent btn-block gcta" data-flow="mint">Connect Wallet</button>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPrime" symLabel="yzPrime" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdc" symLabel="USDC" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <button className="btn btn-accent btn-block gcta" data-flow="redeem">Connect Wallet</button>
            </div>
          </div>

          {/* Order history */}
          <div className="acc ohist">
            <div className="ohead">
              <span className="otitle">Orders</span>
            </div>
            <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="pending">Pending</button><button className="ofilter" data-filter="filled">Filled</button><button className="ofilter" data-filter="finalized">Finalized</button><button className="ofilter" data-filter="cancelled">Cancelled</button></div>
            <div className="osearch"><Search className="osearch-ico" /><input type="text" placeholder="Search by transaction hash" aria-label="Search by transaction hash" /></div>
            <div className="olist">
              {ORDERS.map((o, i) => <OrderItem key={i} {...o} />)}
            </div>
            <button type="button" className="omore" data-omore>Show more <ChevronDown /></button>
          </div>
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
      <ReviewDialogs/>
    </div>
  );
}
