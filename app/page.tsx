import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";
import "./dashboard.css";
import { pageMetadata } from "@/lib/pages";
import TokenStrip from "@/components/ui/TokenStrip";

export const metadata = pageMetadata("/");

export default function Dashboard() {
  return (
    <div className="pg-dashboard">
      <img className="dash-hero-illus" src="/assets/dashboard-hero.svg" alt="" aria-hidden="true" />
      <div className="opp-head rv" style={{ marginBottom: 18 }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 13 }}>
            Risk-curated onchain strategies, packaged as structured yield products. Capital preservation first.
          </p>
        </div>
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
            <svg className="prod-illus" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M43.0015 39.9995C43.0015 41.6564 41.6583 42.9995 40.0015 42.9995C38.3446 42.9995 37.0015 41.6564 37.0015 39.9995C37.0015 38.3427 38.3446 36.9995 40.0015 36.9995C41.6583 36.9995 43.0015 38.3427 43.0015 39.9995ZM64.6011 64.6006C70.7211 58.5106 64.6611 42.5206 51.1011 28.9006C37.4811 15.3406 21.4911 9.28063 15.4011 15.4006C9.28112 21.4906 15.3411 37.4806 28.9011 51.1006C42.5211 64.6606 58.5111 70.7206 64.6011 64.6006ZM51.1011 51.1006C64.6611 37.4806 70.7211 21.4906 64.6011 15.4006C58.5111 9.28063 42.5211 15.3406 28.9011 28.9006C15.3411 42.5206 9.28112 58.5106 15.4011 64.6006C21.4911 70.7206 37.4811 64.6606 51.1011 51.1006Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
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
            <svg className="prod-illus" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M40 12 L73 22 L40 32 L7 22 Z" />
              <path d="M40 24 L73 34 L40 44 L7 34 Z" />
              <path d="M40 36 L73 46 L40 56 L7 46 Z" />
              <path d="M40 48 L73 58 L40 68 L7 58 Z" />
            </svg>
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
            <svg className="prod-illus" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {/* 5 nan hoa chia đều 72° quanh tâm (ngũ giác đỉnh trên) */}
              <line x1="40" y1="40" x2="40" y2="13" strokeDasharray="2 3.5" />
              <line x1="40" y1="40" x2="65.7" y2="31.7" strokeDasharray="2 3.5" />
              <line x1="40" y1="40" x2="55.9" y2="61.8" strokeDasharray="2 3.5" />
              <line x1="40" y1="40" x2="24.1" y2="61.8" strokeDasharray="2 3.5" />
              <line x1="40" y1="40" x2="14.3" y2="31.7" strokeDasharray="2 3.5" />
              <circle cx="40" cy="40" r="11" fill="var(--surface)" />
              <path d="M47 40 L43.5 33.9 L36.5 33.9 L33 40 L36.5 46.1 L43.5 46.1 Z" />
              <circle cx="40" cy="13" r="5.5" />
              <circle cx="65.7" cy="31.7" r="5.5" />
              <circle cx="55.9" cy="61.8" r="5.5" />
              <circle cx="24.1" cy="61.8" r="5.5" />
              <circle cx="14.3" cy="31.7" r="5.5" />
            </svg>
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
