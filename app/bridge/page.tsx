import "./styles.css";
import { pageMetadata } from "@/lib/pages";
import BridgeExchange from "./BridgeExchange";

export const metadata = pageMetadata("/bridge");

export default function Bridge() {
  return (
    <div className="pg-bridge">
      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <BridgeExchange />
        </div>

        <aside className="rv">
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
        </aside>

      </div>
    </div>
  );
}
