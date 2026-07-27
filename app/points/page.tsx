import { Copy } from "lucide-react";
import "./styles.css";
import PointsClient from "./PointsClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";

export const metadata = pageMetadata("/points");

/* Demo leaderboard top 50 (deterministic để SSR ổn định). */
const shortAddr = (n: number) => {
  const h = ((n * 2246822519) >>> 0).toString(16).padStart(8, "0");
  return `0x${h.slice(0, 4)}…${h.slice(4, 8)}`;
};
const LEADERBOARD = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  addr: shortAddr(i + 7),
  pts: Math.round(9842 - (i * (9842 - 1080)) / 49),
}));

export default function Points() {
  return (
    <div className="pg-points">
      <div className="opp-head rv" style={{ marginBottom: 18 }}>
        <div>
          <h1>Points</h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: 13 }}>Track your Yuzu Juice, referral rewards and leaderboard standing across the season.</p>
        </div>
      </div>

      <div className="card juice-hero rv">
        <div>
          <div className="lbl">Your points</div>
          <div className="num">
            <span className="v" data-count="49092489">0</span>
            <span className="juice-ic" aria-hidden="true" />
            <span className="rank-pill">#95</span>
          </div>
        </div>
        <div className="right">
          <Button href="/opportunities">Earn Juice <span className="arr">→</span></Button>
        </div>
      </div>

      <div className="pts-grid">

        <div className="card panel rv">
          <div className="panel-head">
            <h2>Referral</h2>
            <span className="boost-pill" title="Referral boost applied to everything you earn">Active boost: <b>+5%</b></span>
          </div>

          <div className="ref-stats">
            <div><div className="k">My rewards</div><div className="v hi"><span data-count="75253682">0</span><span className="juice-ic" aria-hidden="true" /></div></div>
            <div><div className="k">My friends</div><div className="v">9</div></div>
          </div>

          <div className="copy-row">
            <span className="k">My referral code</span>
            <span className="v">92duHo7wVzkLik41</span>
            <button data-copy="92duHo7wVzkLik41" aria-label="Copy referral code"><Copy /></button>
          </div>
          <div className="copy-row">
            <span className="k">My referral link</span>
            <span className="v">app.yuzu.money/r/92duHo7wVzkLik41</span>
            <button data-copy="https://app.yuzu.money/r/92duHo7wVzkLik41" aria-label="Copy referral link"><Copy /></button>
          </div>

          <div className="ref-steps">
            <div>
              <span className="step-no">1</span>
              <div><b>Share your link</b><span>Send your code or link to friends before they create an account.</span></div>
            </div>
            <div>
              <span className="step-no">2</span>
              <div><b>Friends register</b><span>They sign up with your code and start earning Juice on their positions.</span></div>
            </div>
            <div>
              <span className="step-no">3</span>
              <div><b>Earn together</b><span>You collect 10% of their Juice as referral rewards, they get a +5% boost. Forever.</span></div>
            </div>
          </div>
        </div>

        <div className="card panel rv">
          <div className="panel-head">
            <h2>Leaderboard</h2>
          </div>
          <div className="lb-row you lb-you-pin"><span className="rk">#95</span><span className="addr">0x7bd4…9e2c<em>You</em></span><span className="amt">1,180<i className="juice-ic" aria-hidden="true" /></span></div>
          <div className="lb-rows">
            {LEADERBOARD.map(({ rank, addr, pts }) => (
              <div key={rank} className={`lb-row${rank <= 3 ? " top" : ""}`}>
                <span className="rk">#{rank}</span>
                <span className="addr">{addr}</span>
                <span className="amt">{pts.toLocaleString("en-US")}<i className="juice-ic" aria-hidden="true" /></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <PointsClient />
    </div>
  );
}
