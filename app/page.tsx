import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";
import "./dashboard.css";
import { pageMetadata } from "@/lib/pages";
import TokenStrip from "@/components/ui/TokenStrip";

export const metadata = pageMetadata("/");

export default function Dashboard() {
  return (
    <div className="pg-dashboard">
      <div className="opp-head dash-head rv" style={{ marginBottom: 18 }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 13 }}>
            Risk-curated onchain strategies, packaged as structured yield products. Capital preservation first.
          </p>
        </div>
        <img className="dash-hero-illus" src="/assets/dashboard-hero.svg" alt="" aria-hidden="true" />
      </div>
      <div className="page-stats rv">
        <div>
          <div className="k">Total TVL
            <span className="stat-info">
              <Info className="stat-i" />
              <span className="stat-pop" role="tooltip">
                <span className="sp-title">TVL breakdown</span>
                <span className="sp-donut">
                  <span className="tvl-donut" aria-hidden="true" />
                  <span className="sp-legend">
                    <span><i style={{ background: "var(--alpha)" }} />Alpha<b>52.1%</b></span>
                    <span><i style={{ background: "var(--prime)" }} />Prime<b>29.9%</b></span>
                    <span><i style={{ background: "var(--mkt)" }} />Marketplace<b>11.4%</b></span>
                    <span><i style={{ background: "var(--faint)" }} />Other<b>6.6%</b></span>
                  </span>
                </span>
              </span>
            </span>
          </div>
          <div className="v" data-count="54612904" data-prefix="$">$0</div>
        </div>
        <div>
          <div className="k">Yield distributed
            <span className="stat-info">
              <Info className="stat-i" />
              <span className="stat-pop" role="tooltip">
                <span className="sp-title">Yield distribution</span>
                <svg className="sp-line" viewBox="0 0 240 92" fill="none" aria-hidden="true">
                  <polyline points="10,54 47,47 83,39 120,33 157,34 193,27 230,15" stroke="var(--alpha)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="10,67 47,64 83,58 120,52 157,56 193,50 230,48" stroke="var(--prime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sp-lgd">
                  <span><i style={{ background: "var(--alpha)" }} />Yuzu Alpha</span>
                  <span><i style={{ background: "var(--prime)" }} />Yuzu Prime</span>
                </span>
              </span>
            </span>
          </div>
          <div className="v" data-count="2559843" data-prefix="$">$0</div>
        </div>
        <div>
          <div className="k">Alpha collateral ratio</div>
          <div className="v" style={{ color: "var(--good)" }}>110<span className="num-sep">.</span>82%</div>
        </div>
        <div>
          <div className="k">Prime backing</div>
          <div className="v" style={{ color: "var(--good)" }}>100<span className="num-sep">.</span>28%</div>
        </div>
      </div>

      <section className="section rv" style={{ paddingTop: 16 }}>
        <div className="section-head">
          <h2>Products</h2>
          <Link href="/docs">How they differ →</Link>
        </div>
        <div className="prod-rows">
          <Link className="card ticked prod-row alpha" href="/alpha">
            <span className="id">
              <b>Alpha</b>
              <TokenStrip syms={["syzUSD", "yzPP", "yzUSD"]} />
            </span>
            <p className="desc">
              Overcollateralized yield engine with two tranches. Stake into syzUSD for weekly yield
              with no KYC.
            </p>
            <div className="prod-foot">
              <span className="apy">
                <span className="v">7.75% – 27%</span>
                <span className="k">Target APY</span>
              </span>
              <span className="cta">
                Open <span className="arr">→</span>
              </span>
            </div>
          </Link>
          <Link className="card ticked prod-row prime" href="/prime">
            <span className="id">
              <b>Prime</b>
              <TokenStrip syms={["yzPrime"]} />
            </span>
            <p className="desc">Tokenized T-Bills, AAA CLOs, and overcollateralized lending.</p>
            <div className="prod-foot">
              <span className="apy">
                <span className="v">7.06%</span>
                <span className="k">Target APY</span>
              </span>
              <span className="cta">
                Open <span className="arr">→</span>
              </span>
            </div>
          </Link>
          <Link className="card ticked prod-row mkt" href="/marketplace">
            <span className="id">
              <b>Marketplace</b>
              <TokenStrip syms={["yzCash", "yzSyrup"]} />
            </span>
            <p className="desc">
              Hand-picked strategies in yzCash and yzSyrup for leveraged Maple lending.
            </p>
            <div className="prod-foot">
              <span className="apy">
                <span className="v">4.90% – 8.53%</span>
                <span className="k">Current APY</span>
              </span>
              <span className="cta">
                Open <span className="arr">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section rv">
        <Link className="por" href="/transparency" aria-label="View proof-of-reserves details">
          <div className="por-lead">
            <span className="por-shield">
              <ShieldCheck />
            </span>
            <div>
              <b>Proof of Reserves</b>
              <span>Independent third-party verification of the protocol&apos;s backing assets.</span>
            </div>
          </div>
          <div className="por-marks">
            <img src="/assets/partners/accountable-fav.png" alt="Accountable" />
            <img src="/assets/partners/hypernative-fav.png" alt="Hypernative" />
            <img src="/assets/partners/fordefi-fav.png" alt="Fordefi" />
            <img src="/assets/partners/chainlink-fav.png" alt="Chainlink" />
            <span className="por-arr">→</span>
          </div>
        </Link>
      </section>
    </div>
  );
}
