import { Copy } from "lucide-react";
import "./styles.css";
import PointsClient from "./PointsClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";

export const metadata = pageMetadata("/points");

export default function Points() {
  return (
    <div className="pg-points">
      <div className="opp-head rv" style={{ marginBottom: 18 }}>
        <div>
          <h1>Points</h1>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 13 }}>Track your Yuzu Juice, referral rewards and leaderboard standing across the season.</p>
        </div>
      </div>

      <div className="card juice-hero rv">
        <div>
          <div className="lbl">Your points</div>
          <div className="num">
            <span className="juice-ic" aria-hidden="true" />
            <span className="v" data-count="49092489">0</span>
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
            <div><div className="k">My rewards</div><div className="v hi"><span className="juice-ic" aria-hidden="true" /><span data-count="75253682">0</span></div></div>
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
            <div className="lb-row top"><span className="rk">#1</span><span className="addr">0x4352…3b4f</span><span className="amt">9,842<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row top"><span className="rk">#2</span><span className="addr">0x9f1a…bd1a</span><span className="amt">8,610<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row top"><span className="rk">#3</span><span className="addr">0x8714…1e13</span><span className="amt">7,935<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#4</span><span className="addr">0xd1e7…0f7a</span><span className="amt">6,720<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#5</span><span className="addr">0xd93e…e5d2</span><span className="amt">5,880<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#6</span><span className="addr">0x02f3…9eca</span><span className="amt">5,140<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#7</span><span className="addr">0xb00f…f58d</span><span className="amt">4,505<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#8</span><span className="addr">0x08c6…364c</span><span className="amt">3,970<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#9</span><span className="addr">0xec0d…ae08</span><span className="amt">3,240<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-row"><span className="rk">#10</span><span className="addr">0x10f0…9c1f</span><span className="amt">2,610<i className="juice-ic" aria-hidden="true" /></span></div>
            <div className="lb-gap">···</div>
            <div className="lb-row you"><span className="rk">#95</span><span className="addr">0x7bd4…9e2c<em>You</em></span><span className="amt">1,180<i className="juice-ic" aria-hidden="true" /></span></div>
          </div>
        </div>

      </div>

      <PointsClient />
    </div>
  );
}
