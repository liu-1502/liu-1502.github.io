import Link from "next/link";
import "./styles.css";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("/marketplace");

export default function Marketplace() {
  return (
    <div className="pg-marketplace">
      <div className="vaults" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <Link className="card ticked vault rv" href="/vault" style={{ padding: 26 }}>
          <div className="vhead">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/assets/tokens/yzSyrup.svg" alt="yzSyrup" style={{ width: 40, height: 40, borderRadius: "50%" }} />
              <div>
                <h3>yzSyrup</h3>
                <div className="venue">MAPLE SYRUP LENDING · MONAD</div>
              </div>
            </div>
            <span className="chip risk-b">Balanced</span>
          </div>
          <p className="strat">Overcollateralized lending to KYC institutional borrowers through Maple Syrup, wrapped for Monad as a single yield-bearing token. Loans are secured by liquid digital assets, with recourse.</p>
          <div className="vstats">
            <div><div className="k">APY</div><div className="v apy">8.53%</div></div>
            <div><div className="k">Chain</div><div className="v">Monad</div></div>
            <div><div className="k">Redeem</div><div className="v">Open</div></div>
          </div>
        </Link>

        <Link className="card ticked vault rv" href="/vault-yzcash" style={{ padding: 26 }}>
          <div className="vhead">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/assets/tokens/yzCash.svg" alt="yzCash" style={{ width: 40, height: 40, borderRadius: "50%" }} />
              <div>
                <h3>yzCash</h3>
                <div className="venue">TOKENIZED T-BILL CASH · MULTI-CHAIN</div>
              </div>
            </div>
            <span className="chip risk-c">Conservative</span>
          </div>
          <p className="strat">The U.S. sovereign rate, onchain. A cash-management token backed by tokenized T-Bills from leading issuers, with near-instant liquidity and no lockups. Park stables, earn the risk-free rate.</p>
          <div className="vstats">
            <div><div className="k">APY</div><div className="v apy">4.90%</div></div>
            <div><div className="k">Liquidity</div><div className="v">Instant</div></div>
            <div><div className="k">Redeem</div><div className="v">Open</div></div>
          </div>
        </Link>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 14 }}>More curated strategies in diligence. New listings are announced on Telegram before they open.</p>
    </div>
  );
}
