import Link from "next/link";
import "./dashboard.css";
import { pageMetadata } from "@/lib/pages";
import TokenStrip from "@/components/ui/TokenStrip";

export const metadata = pageMetadata("/");

export default function Dashboard() {
  return (
    <div className="pg-dashboard">
      <div className="dash-head">
        <Link className="verified" href="/transparency" title="Open the live proof-of-reserves feed">
          <span className="pulse"></span>RESERVES VERIFIED · 15 MIN<span className="arr">→</span>
        </Link>
      </div>

      <div className="page-stats rv">
        <div>
          <div className="k">Total TVL</div>
          <div className="v" data-count="54612904" data-prefix="$">$0</div>
        </div>
        <div>
          <div className="k">Yield distributed</div>
          <div className="v" data-count="2559843" data-prefix="$">$0</div>
        </div>
        <div>
          <div className="k">Alpha collateral ratio</div>
          <div className="v" style={{ color: "var(--good)" }}>110.82%</div>
        </div>
        <div>
          <div className="k">Prime backing</div>
          <div className="v" style={{ color: "var(--good)" }}>100.28%</div>
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
              <TokenStrip syms={["yzUSD", "syzUSD", "yzPP"]} />
              <span>
                <b>Alpha</b>
                <small>Stablecoin engine · Open</small>
              </span>
            </span>
            <p className="desc">
              Overcollateralized yzUSD with two tranches. Stake into syzUSD for weekly yield with no
              KYC. yzPP absorbs any loss first so yzUSD stays fully backed, and earns a premium for
              standing in front.
            </p>
            <span className="apy">
              <span className="v">7.75-27%</span>
              <span className="k">Target range</span>
            </span>
            <span className="cta">
              Open <span className="arr">→</span>
            </span>
          </Link>
          <Link className="card ticked prod-row prime" href="/prime">
            <span className="id">
              <TokenStrip syms={["yzPrime"]} />
              <span>
                <b>Prime</b>
                <small>Fixed income · Gated KYC</small>
              </span>
            </span>
            <p className="desc">
              Leveraged exposure to tokenized T-Bills, AAA CLOs and overcollateralized lending.
              Continuous yield at NAV, reserved to Eligible Investors.
            </p>
            <span className="apy">
              <span className="v">7.00%</span>
              <span className="k">Target APY</span>
            </span>
            <span className="cta">
              Open <span className="arr">→</span>
            </span>
          </Link>
          <Link className="card ticked prod-row mkt" href="/marketplace">
            <span className="id">
              <TokenStrip syms={["yzCash", "yzSyrup"]} />
              <span>
                <b>Marketplace</b>
                <small>Curated strategies · Permissionless</small>
              </span>
            </span>
            <p className="desc">
              Hand-picked strategies packaged as single tokens: yzCash for T-Bill cash management,
              yzSyrup for leveraged Maple lending. Diligence published pre-listing.
            </p>
            <span className="apy">
              <span className="v">4.90 / 8.53%</span>
              <span className="k">Current APY</span>
            </span>
            <span className="cta">
              Open <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section rv">
        <div className="section-head">
          <h2>The security stack</h2>
          <Link href="/docs#security">Details →</Link>
        </div>
        <div className="trust">
          <div>
            <em>Proof of reserves</em>
            <b>Accountable</b>
            <span>
              Independent, near real-time attestation of assets and liabilities using secure enclaves
              and zero-knowledge proofs.
            </span>
          </div>
          <div>
            <em>Threat response</em>
            <b>Hypernative + Sentinel</b>
            <span>
              Real-time exploit detection wired to automated withdrawals. Threats flagged minutes
              before they land onchain.
            </span>
          </div>
          <div>
            <em>Key management</em>
            <b>Fordefi MPC</b>
            <span>
              No single point of failure on protocol funds. SOC 2 certified wallet infrastructure with
              granular policies.
            </span>
          </div>
          <div>
            <em>Cross-chain</em>
            <b>Chainlink CCIP</b>
            <span>
              Issuer-owned token pools with per-lane rate limits. Burn and mint transfers, zero
              slippage.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
