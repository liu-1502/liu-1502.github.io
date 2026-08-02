import Link from "next/link";
import "./styles.css";
import TransparencyClient from "./TransparencyClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import { ChartLines, ApyLines, StackedBar } from "./parts";
import {
  ALPHA_SPLIT,
  PRIME_SPLIT,
  SERIES,
  reserves,
  supply,
  apy,
  apyPP,
  apy1D,
  apy7D,
  apy30D,
  apyPP1D,
  apyPP7D,
  apyPP30D,
  usd,
} from "./data";

const sumSplit = (rows: typeof ALPHA_SPLIT) => rows.reduce((a, r) => a + (r[r.length - 1] as number), 0);
const ALPHA_TOTAL = sumSplit(ALPHA_SPLIT);
const PRIME_TOTAL = sumSplit(PRIME_SPLIT);

export const metadata = pageMetadata("/transparency");

const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fmtDate = (d: string) => {
  const [, m, day] = d.split("-");
  return `${MON[+m - 1]} ${+day}`;
};

const DATES = SERIES.map((r) => r[0]);
/** Các khoảng thời gian cho chart (giống Accountable): cắt N điểm cuối của timeline. */
const RANGES = [
  { k: "1m", n: 7, lab: "1M" },
  { k: "3m", n: 18, lab: "3M" },
  { k: "6m", n: 36, lab: "6M" },
  { k: "all", n: reserves.length, lab: "All" },
];

export default function Transparency() {
  return (
    <div className="pg-transparency">
      <section className="hub-hero">
        <div>
          <h1>Independent Proof of Solvency</h1>
          <p className="lede">An independent proof of solvency, live: assets and liabilities across Yuzu Alpha and Prime are attested every 15 minutes by Accountable, a verification network using secure enclaves and zero-knowledge proofs. This page renders their verified feed, position by position.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <Button href="https://yuzu.accountable.capital/" target="_blank" rel="noopener" variant="solid"><img src="/assets/partners/accountable-fav.png" alt="" style={{ width: 18, height: 18, filter: "brightness(0) invert(1)" }} />Official Accountable dashboard <span className="arr">↗</span></Button>
          </div>
        </div>
      </section>

      <div className="statwall rv card">
        <div className="bigstat">
          <div className="k">Total TVL</div>
          <div className="v" data-count="56.30" data-dec="2" data-prefix="$" data-suffix="M">$0</div>
        </div>
        <div className="bigstat">
          <div className="k">Total Assets / Backing</div>
          <div className="v" data-count="55.98" data-dec="2" data-prefix="$" data-suffix="M">$0</div>
        </div>
        <div className="bigstat">
          <div className="k">Total Yield Distributed</div>
          <div className="v" data-count="2.69" data-dec="2" data-prefix="$" data-suffix="M">$0</div>
        </div>
        <div className="bigstat">
          <div className="k">Products Verified</div>
          <div className="v" data-count="2" data-suffix=" / 2">0</div>
        </div>
      </div>

      {/* ==================== PRODUCT TABS ==================== */}
      <div className="tp-tabs rv" data-tp-tabs>
        <button className="on" data-tp-tab="alpha">Alpha</button>
        <button data-tp-tab="prime">Prime</button>
      </div>

      {/* ==================== ALPHA PANEL ==================== */}
      <div data-tp-panel="alpha">

        {/* Summary */}
        <section className="section rv">
          <div className="card tp-summary">
            <div className="tp-summary-lead">
              <div className="tp-lead-pct" style={{ color: "var(--good)" }}>110.82%</div>
              <div className="tp-lead-lbl">Collateral ratio</div>
            </div>
            <div className="tp-summary-stats">
              <div><div className="k">Backing assets</div><div className="v" data-count="49375157" data-prefix="$">$0</div></div>
              <div><div className="k">Supply</div><div className="v" data-count="44554443" data-prefix="$">$0</div></div>
              <div><div className="k">Yield distributed</div><div className="v" data-count="2544038" data-prefix="$">$0</div></div>
              <div><div className="k">yzUSD staked</div><div className="v">98.29%</div></div>
              <div><div className="k">APY (syzUSD)</div><div className="v" style={{ color: "var(--alpha)" }}>7.75%</div></div>
              <div><div className="k">Surplus buffer</div><div className="v" style={{ color: "var(--good)" }} data-count="4820702" data-prefix="$">$0</div></div>
            </div>
          </div>
        </section>

        {/* Backing assets vs supply */}
        <section className="section rv">
          <div className="card tp-panel" data-bk>
            <div className="phead">
              <h3>Backing assets vs supply</h3>
              <div className="tp-range" data-bk-range>
                {RANGES.map((r) => (
                  <button key={r.k} className={r.k === "all" ? "on" : ""} data-r={r.k}>{r.lab}</button>
                ))}
              </div>
            </div>
            <div className="tp-chart-head">
              <div className="tp-legend">
                <div><span className="dot" style={{ background: "var(--tp-backing)" }} /><span className="l">Backing assets</span><b>$49,375,157</b></div>
                <div><span className="dot" style={{ background: "var(--tp-supply)" }} /><span className="l">Supply</span><b>$44,554,443</b></div>
              </div>
            </div>
            {RANGES.map((r) => {
              const rs = reserves.slice(-r.n);
              const sp = supply.slice(-r.n);
              const ds = DATES.slice(-r.n);
              const mn = Math.min(...sp) * 0.985;
              const mx = Math.max(...rs) * 1.015;
              const yT = [0, 1, 2, 3].map((i) => {
                const v = mn + ((mx - mn) * i) / 3;
                return { v, y: 124 - (118 * (v - mn)) / (mx - mn) };
              });
              const xIdx = [0, 1, 2, 3, 4, 5].map((k) => Math.round((k * (ds.length - 1)) / 5));
              return (
                <div key={r.k} className="tp-chart" data-bk-svg={r.k} style={r.k === "all" ? undefined : { display: "none" }}>
                  <div className="tp-plot" data-series={JSON.stringify({ d: ds, b: rs, s: sp, mn, mx })}>
                    <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-label="Backing assets and supply over time">
                      <g className="tp-grid">
                        {yT.map((t) => <line key={`h${t.y}`} x1="6" x2="294" y1={t.y} y2={t.y} />)}
                        {xIdx.map((i) => {
                          const x = 6 + (288 * i) / (ds.length - 1);
                          return <line key={`v${i}`} x1={x} x2={x} y1="6" y2="124" />;
                        })}
                      </g>
                      <ChartLines
                        series={[
                          { values: rs, color: "var(--tp-backing)" },
                          { values: sp, color: "var(--tp-supply)" },
                        ]}
                        min={mn}
                        max={mx}
                      />
                    </svg>
                    <div className="tp-yticks">
                      {yT.map((t) => <span key={t.y} style={{ top: `${(t.y / 130) * 100}%` }}>{usd(t.v)}</span>)}
                    </div>
                    <span className="tp-guide" />
                    <span className="tp-hdot b" />
                    <span className="tp-hdot s" />
                    <div className="tp-tip" />
                  </div>
                  <div className="xlab">
                    {xIdx.map((i) => <span key={i}>{fmtDate(ds[i])}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* APY */}
        <section className="section rv">
          <div className="card tp-panel apy-card" data-apy>
            <div className="phead">
              <h3>APY</h3>
            </div>
            <div className="tp-subtabs" data-apy-tabs>
              <button className="on" data-apy-token="syz" data-wt="7.75%">syzUSD</button>
              <button data-apy-token="pp" data-wt="27.0%">yzPP</button>
            </div>
            <div className="apy-readout">
              <div className="cv" data-apy-value style={{ color: "var(--alpha)" }}>7.75%</div>
              <span className="apy-readout-lbl">Weekly Target</span>
            </div>
            <div className="tp-chart">
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" data-apy-svg="syz" aria-label="syzUSD APY over time">
                <ApyLines wt={apy} d1={apy1D} d7={apy7D} d30={apy30D} min={4} max={18} />
              </svg>
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" data-apy-svg="pp" style={{ display: "none" }} aria-label="yzPP APY over time">
                <ApyLines wt={apyPP} d1={apyPP1D} d7={apyPP7D} d30={apyPP30D} min={12} max={64} />
              </svg>
              <div className="xlab"><span>OCT 16</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
            </div>
            <div className="apy-series" data-apy-series>
              <button className="on locked" data-line="wt" style={{ ["--c"]: "var(--tp-green)" } as React.CSSProperties}><i />Weekly Target</button>
              <button data-line="1d" style={{ ["--c"]: "var(--tp-amber)" } as React.CSSProperties}><i />1D</button>
              <button data-line="7d" style={{ ["--c"]: "var(--tp-blue)" } as React.CSSProperties}><i />7D</button>
              <button data-line="30d" style={{ ["--c"]: "var(--tp-red)" } as React.CSSProperties}><i />30D</button>
            </div>
          </div>
        </section>

        {/* Top strategies */}
        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Alpha top strategies</h3><span className="tp-total-h">Total<b>{usd(ALPHA_TOTAL)}</b></span></div>
            <StackedBar rows={ALPHA_SPLIT} topN={4} />
          </div>
        </section>
      </div>{/* .alpha panel */}

      {/* ==================== PRIME PANEL ==================== */}
      <div data-tp-panel="prime" style={{ display: "none" }}>

        <section className="section rv">
          <div className="card tp-summary">
            <div className="tp-summary-lead">
              <div className="tp-lead-pct" style={{ color: "var(--good)" }}>100.28%</div>
              <div className="tp-lead-lbl">Assets / liabilities</div>
            </div>
            <div className="tp-summary-stats">
              <div><div className="k">Assets</div><div className="v" data-count="6159080" data-prefix="$">$0</div></div>
              <div><div className="k">Liabilities</div><div className="v" data-count="6142108" data-prefix="$">$0</div></div>
              <div><div className="k">Yield distributed</div><div className="v" data-count="15804" data-prefix="$">$0</div></div>
              <div><div className="k">NAV</div><div className="v">$1.01243</div></div>
              <div><div className="k">APY (yzPrime)</div><div className="v" style={{ color: "var(--prime)" }}>7.00%</div></div>
              <div><div className="k">Surplus buffer</div><div className="v" style={{ color: "var(--good)" }} data-count="16971" data-prefix="$">$0</div></div>
            </div>
          </div>
        </section>

        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Prime top strategies</h3><span className="tp-total-h">Total<b>{usd(PRIME_TOTAL)}</b></span></div>
            <StackedBar rows={PRIME_SPLIT} topN={4} />
          </div>
        </section>
      </div>{/* .prime panel */}

      {/* ==================== ATTESTATION FOOTER ==================== */}
      <section className="section rv">
        <div className="tp-attest">
          <div className="card">
            <em>Merkle Root Hash</em>
            <b>Every balance, committed</b>
            <span>Each 15-minute cycle publishes a Merkle root of all wallet balances and positions, so the numbers above cannot be altered after the fact.</span>
          </div>
          <div className="card">
            <em>Enclave Attestation</em>
            <b>Read inside secure hardware</b>
            <span>Balances are read within AMD SEV enclaves and key-sealed. Nobody, including Yuzu, can tamper with what the enclave sees.</span>
          </div>
          <div className="card">
            <em>Zero Knowledge Proofs</em>
            <b>Solvency without exposure</b>
            <span>zkTLS and zero-knowledge proofs verify solvency each cycle without revealing private positions or trading strategy.</span>
          </div>
        </div>
      </section>

      <TransparencyClient />
    </div>
  );
}
