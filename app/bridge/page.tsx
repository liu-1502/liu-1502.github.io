import "../alpha/styles.css";   /* shared Alpha exchange style */
import "./styles.css";           /* bridge overrides, load sau */
import { pageMetadata } from "@/lib/pages";
import BridgeExchange from "./BridgeExchange";
import { CircleHelp, X, ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata("/bridge");

/* Một dòng lịch sử bridge (route thay cho địa chỉ ví). */
function BridgeOrder({ tok, sym, route, amount, status }: {
  tok: "syzusd" | "yzprime"; sym: string; route: string; amount: string; status: "completed" | "pending";
}) {
  return (
    <div className="ord" role="button" tabIndex={0} data-kind={tok}>
      <span className="oicon"><ArrowUpRight /></span>
      <div className="oleft">
        <span className="ot">Bridge {sym}</span>
        <span className="oa">{route}</span>
      </div>
      <div className="oright">
        <span className="ov">{amount}</span>
        {status !== "completed" && <span className={`badge ${status}`}>Pending</span>}
      </div>
    </div>
  );
}

export default function Bridge() {
  return (
    <div className="pg-bridge">

      <div className="form-head rv">
        <h1>Bridge</h1>
      </div>

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        {/* Nút About the bridge: canh phải trên content như trang Alpha */}
        <div className="about-wrap">
          <button className="about-btn" data-about-toggle aria-expanded="false"><CircleHelp className="ico" /> About</button>
          <div className="about-menu" data-about-menu hidden>
            <div className="aside-head">
              <h3 className="aside-title">About the bridge</h3>
              <button className="aside-close" data-about-close aria-label="Close details"><X /></button>
            </div>
            <div className="tk-strip aside-marks">
              <img src="/assets/tokens/syzUSD.svg" alt="syzUSD" />
              <img src="/assets/tokens/yzPrime.svg" alt="yzPrime" />
            </div>
            <div className="aside-card">
              <h4>Why this bridge is different</h4>
              <p>No liquidity pools, no wrapped IOUs. Tokens are burned on the source chain and minted on the destination under the Cross-Chain Token standard, so the exact amount you send is the exact amount you receive.</p>
            </div>
            <div className="aside-card">
              <h4>Issuer-owned, rate limited</h4>
              <p>Yuzu owns its token pools and bridge configuration outright. Each lane enforces a hard capacity ceiling and refill rate, capping the blast radius of any anomaly independent of the transport layer.</p>
              <div className="rows">
                <div><span className="k">syzUSD lanes</span><span className="v">Plasma, Monad, Ethereum, HyperEVM, Sei, Pharos</span></div>
                <div><span className="k">yzPrime lanes</span><span className="v">Monad, Ethereum</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Defense in depth</h4>
              <p>Transfers require agreement across Chainlink&apos;s committing and executing oracle networks, with an independent onchain risk-management contract able to halt activity as a circuit breaker.</p>
              <div className="rows">
                <div><span className="k">Token manager</span><span className="v" style={{ color: "var(--citrus)" }}>Chainlink dashboard ↗</span></div>
                <div><span className="k">Alt route</span><span className="v">transporter.io ↗</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Transfer details</h4>
              <div className="rows">
                <div><span className="k">Mechanism</span><span className="v">Burn on source, mint on destination</span></div>
                <div><span className="k">Slippage</span><span className="v" style={{ color: "var(--accent)" }}>Zero, exact amount arrives</span></div>
                <div><span className="k">Estimated time</span><span className="v">~20 minutes</span></div>
                <div><span className="k">CCIP fee</span><span className="v">Paid in native gas</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="xchg rv">
          <BridgeExchange />

          <details className="acc ohist" open>
            <summary>Today Order</summary>
            <div className="ord-filters">
              <button className="ofilter on" data-filter="all">All</button>
              <button className="ofilter" data-filter="syzusd">syzUSD</button>
              <button className="ofilter" data-filter="yzprime">yzPrime</button>
            </div>
            <div className="olist">
              <BridgeOrder tok="syzusd" sym="syzUSD" route="Plasma → Monad" amount="$2,500.00" status="completed" />
              <BridgeOrder tok="yzprime" sym="yzPrime" route="Monad → Ethereum" amount="$5,000.00" status="completed" />
              <BridgeOrder tok="syzusd" sym="syzUSD" route="Ethereum → Monad" amount="$1,000.00" status="pending" />
            </div>
          </details>
        </div>

      </div>
    </div>
  );
}
