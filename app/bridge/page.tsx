import "./styles.css";
import BridgeClient from "./BridgeClient";

export default function Bridge() {
  return (
    <div className="pg-bridge">
      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <div className="xchg-body">

            <div className="token-select" id="tokenSelect">
              <button className="on" data-token="syzusd"><img src="/assets/tokens/syzUSD.svg" alt="" />syzUSD</button>
              <button data-token="yzprime"><img src="/assets/tokens/yzPrime.svg" alt="" />yzPrime</button>
            </div>

            <div className="chain-select">
              <div className="chain-box">
                <div className="cl">From</div>
                <div className="chain-sel chx" id="fromChain" aria-label="Source chain">
                  <button className="chain-btn" type="button" aria-haspopup="listbox" aria-expanded="false"></button>
                  <div className="chain-menu" role="listbox"></div>
                </div>
              </div>
              <button className="flip" id="flipChains" aria-label="Swap chains">↔</button>
              <div className="chain-box">
                <div className="cl">To</div>
                <div className="chain-sel chx" id="toChain" aria-label="Destination chain">
                  <button className="chain-btn" type="button" aria-haspopup="listbox" aria-expanded="false"></button>
                  <div className="chain-menu" role="listbox"></div>
                </div>
              </div>
            </div>

            <div className="xfield" style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
              <div className="xlabel">
                <span>You send</span>
                <span>Balance 0.00 <button type="button">Max</button></span>
              </div>
              <div className="xrow">
                <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="1" aria-label="Amount to bridge" />
                <span className="token" id="sendToken"><img src="/assets/tokens/syzUSD.svg" alt="" />syzUSD</span>
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>

            <div className="xdivider"><span>↓</span></div>

            <div className="xfield">
              <div className="xlabel"><span>You receive on destination</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received" />
                <span className="token" id="recvToken"><img src="/assets/tokens/syzUSD.svg" alt="" />syzUSD</span>
              </div>
            </div>

            <div className="xmeta">
              <div><span className="k">Mechanism</span><span className="v">Burn on source, mint on destination</span></div>
              <div><span className="k">Slippage</span><span className="v hi">Zero, exact amount arrives</span></div>
              <div><span className="k">Estimated time</span><span className="v">~20 minutes</span></div>
              <div><span className="k">CCIP fee</span><span className="v">Paid in native gas</span></div>
            </div>

            <button className="btn btn-accent btn-block">Connect Wallet</button>

            <div className="lane-note"><span className="pulse"></span>All lanes healthy. Per-lane rate limits enforced onchain.</div>
          </div>
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
            <p>Transfers require agreement across Chainlink's committing and executing oracle networks, with an independent onchain risk-management contract able to halt activity as a circuit breaker.</p>
            <div className="rows">
              <div><span className="k">Token manager</span><span className="v" style={{ color: "var(--citrus)" }}>Chainlink dashboard ↗</span></div>
              <div><span className="k">Alt route</span><span className="v">transporter.io ↗</span></div>
            </div>
          </div>
        </aside>

      </div>

      <BridgeClient />
    </div>
  );
}
