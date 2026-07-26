import Link from "next/link";
import { Copy } from "lucide-react";
import "./styles.css";
import PointsClient from "./PointsClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";

export const metadata = pageMetadata("/points");

export default function Points() {
  return (
    <div className="pg-points">
      <svg className="pts-illus" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Hộp quà (dáng lucide gift, phóng to) + badge % ở góc phải dưới */}
        <g transform="translate(2 4) scale(4)">
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </g>
        <circle cx="98" cy="98" r="18" fill="var(--surface)" />
        <line x1="89" y1="107" x2="107" y2="89" />
        <circle cx="91.5" cy="91.5" r="2.6" />
        <circle cx="104.5" cy="104.5" r="2.6" />
      </svg>
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
            <span className="chip plain">SEASON 1</span>
          </div>
          <div className="lb-rows">
            <div className="lb-row top"><span className="rk">#1</span><span className="addr">0x4352…3b4f</span><span className="amt">13.52B</span></div>
            <div className="lb-row top"><span className="rk">#2</span><span className="addr">0x9f1a…bd1a</span><span className="amt">1.88B</span></div>
            <div className="lb-row top"><span className="rk">#3</span><span className="addr">0x8714…1e13</span><span className="amt">1.53B</span></div>
            <div className="lb-row"><span className="rk">#4</span><span className="addr">0xd1e7…0f7a</span><span className="amt">1.50B</span></div>
            <div className="lb-row"><span className="rk">#5</span><span className="addr">0xd93e…e5d2</span><span className="amt">1.46B</span></div>
            <div className="lb-row"><span className="rk">#6</span><span className="addr">0x02f3…9eca</span><span className="amt">1.10B</span></div>
            <div className="lb-row"><span className="rk">#7</span><span className="addr">0xb00f…f58d</span><span className="amt">908.28M</span></div>
            <div className="lb-row"><span className="rk">#8</span><span className="addr">0x08c6…364c</span><span className="amt">879.49M</span></div>
            <div className="lb-row"><span className="rk">#9</span><span className="addr">0xec0d…ae08</span><span className="amt">852.45M</span></div>
            <div className="lb-row"><span className="rk">#10</span><span className="addr">0x10f0…9c1f</span><span className="amt">773.46M</span></div>
            <div className="lb-gap">···</div>
            <div className="lb-row you"><span className="rk">#95</span><span className="addr">0x7bd4…9e2c<em>You</em></span><span className="amt">49.09M</span></div>
          </div>
        </div>

      </div>

      <section className="section rv">
        <div className="section-head">
          <h2>Ways to earn</h2>
          <Link href="/opportunities">All opportunities →</Link>
        </div>
        <div className="earn-cards">
          <Link className="card earn-card" href="/alpha">
            <em>Hold &amp; stake</em>
            <b>yzUSD, syzUSD &amp; yzPP</b>
            <span>Every dollar held or staked accrues Juice daily. yzUSD earns the highest base rate; tranches keep earning while they yield.</span>
            <span className="go">Open Alpha →</span>
          </Link>
          <Link className="card earn-card" href="/opportunities">
            <em>Deploy in DeFi</em>
            <b>Yield opportunities</b>
            <span>LP, lend, loop or lock Yuzu assets across partner protocols. Boosted multipliers on curated integrations, up to 12×.</span>
            <span className="go">Browse opportunities →</span>
          </Link>
          <a className="card earn-card" href="#top">
            <em>Refer friends</em>
            <b>10% referral rewards</b>
            <span>Share your code: you earn 10% of everything your referrals make, and they get a permanent +5% boost.</span>
            <span className="go">Copy your link ↑</span>
          </a>
        </div>
      </section>

      <PointsClient />
    </div>
  );
}
