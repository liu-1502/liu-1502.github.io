import "./styles.css";
import TransparencyClient from "./TransparencyClient";
import { pageMetadata } from "@/lib/pages";
import { ArrowUpRight, Info } from "lucide-react";

/* Pixel-art monogram (theo phong cách icon của Accountable). '#' = ô đặc. */
function Pix({ rows }: { rows: string[] }) {
  const w = rows[0].length;
  const h = rows.length;
  const cells: [number, number][] = [];
  rows.forEach((r, y) => [...r].forEach((c, x) => c === "#" && cells.push([x, y])));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="20" height="20" aria-hidden="true">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x + 0.06} y={y + 0.06} width={0.88} height={0.88} rx={0.16} fill="currentColor" />
      ))}
    </svg>
  );
}
const PIX_MERKLE = ["#...#", "##.##", "#.#.#", "#...#", "#...#"];
const PIX_NODE = [".###.", "#...#", "#.#.#", "#...#", ".###."];
const PIX_ZK = ["###.#.#", "..#.##.", ".#..#..", "#...##.", "###.#.#"];
import { LineChart, StackedBar } from "./parts";
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
  primeAssets,
  primeLiab,
  primeApy,
  primeApy1D,
  primeApy7D,
  primeApy30D,
  usd,
} from "./data";

const sumSplit = (rows: typeof ALPHA_SPLIT) => rows.reduce((a, r) => a + (r[r.length - 1] as number), 0);
const ALPHA_TOTAL = sumSplit(ALPHA_SPLIT);
const PRIME_TOTAL = sumSplit(PRIME_SPLIT);

export const metadata = pageMetadata("/transparency");

const DATES = SERIES.map((r) => r[0]);

export default function Transparency() {
  return (
    <div className="pg-transparency">
      <section className="hub-hero">
        <div>
          <h1>Independent<br /><span className="hero-grad" data-type>Proof of Solvency</span></h1>
          <p className="lede">An independent proof of solvency, live: assets and liabilities across Yuzu Alpha and Prime are attested every 15 minutes by Accountable, a verification network using secure enclaves and zero-knowledge proofs. This page renders their verified feed, position by position.</p>
          <a className="tp-hero-cta" href="https://yuzu.accountable.capital/" target="_blank" rel="noopener">Official Accountable dashboard <ArrowUpRight size={15} strokeWidth={2.2} /></a>
        </div>
        <img className="tp-hero-illus" src="/assets/illus/proof-of-solvency.svg" alt="" aria-hidden="true" />
      </section>

      {/* ==================== PRODUCT TABS ==================== */}
      <div className="tp-tabs rv" data-tp-tabs>
        <button className="on" data-tp-tab="alpha">Alpha</button>
        <button data-tp-tab="prime">Prime</button>
      </div>

      {/* ==================== ALPHA PANEL ==================== */}
      <div data-tp-panel="alpha">

        {/* Summary */}
        <section className="section rv">
          <div className="card tp-summary6">
            <div className="s6"><div className="k">Backing Assets</div><div className="v" data-count="49375157" data-prefix="$">$0</div></div>
            <div className="s6"><div className="k">Collateral Ratio</div><div className="v" style={{ color: "var(--good)" }}>110.82%</div></div>
            <div className="s6"><div className="k">Yield Distributed</div><div className="v" data-count="2544038" data-prefix="$">$0</div></div>
            <div className="s6"><div className="k">syzUSD APY <span className="s6-info"><Info /><span className="s6-tip">syzUSD is the senior tranche of Yuzu Alpha</span></span></div><div className="v" style={{ color: "var(--good)" }}>7.75%</div></div>
            <div className="s6"><div className="k">yzPP APY <span className="s6-info"><Info /><span className="s6-tip">yzPP is the junior / first-loss tranche of Yuzu Alpha</span></span></div><div className="v" style={{ color: "var(--good)" }}>27.0%</div></div>
            <div className="s6"><div className="k">Days since Inception</div><div className="v" data-days-since>—</div></div>
          </div>
        </section>

        <div className="tp-charts2">
        {/* Backing assets vs supply */}
        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead">
              <h3>Backing assets vs supply</h3>
            </div>
            <div className="tp-readout">
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-backing)" }} />Backing assets</span><b className="rv">$49,375,157</b></div>
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-supply)" }} />Supply</span><b className="rv">$44,554,443</b></div>
            </div>
            <div className="tp-chart">
              <LineChart
                series={[
                  { k: "b", label: "Backing", color: "var(--tp-backing)", values: reserves },
                  { k: "s", label: "Supply", color: "var(--tp-supply)", values: supply },
                ]}
                min={Math.min(...supply) * 0.985}
                max={Math.max(...reserves) * 1.015}
                dates={DATES}
                fmt="money"
              />
            </div>
          </div>
        </section>

        {/* APY */}
        <section className="section rv">
          <div className="card tp-panel apy-card" data-apy>
            <div className="phead">
              <h3>APY</h3>
              <div className="tp-subtabs" data-apy-tabs>
                <button className="on" data-apy-token="syz" data-wt="7.75%">syzUSD</button>
                <button data-apy-token="pp" data-wt="27.0%">yzPP</button>
              </div>
            </div>
            <div className="tp-readout" data-apy-readout>
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-green)" }} />Weekly Target</span><b className="rv">7.75%</b></div>
            </div>
            <div className="tp-chart" data-apy-svg="syz">
              <LineChart
                series={[
                  { k: "wt", label: "Weekly Target", color: "var(--tp-green)", values: apy },
                  { k: "1d", label: "1D", color: "var(--tp-amber)", values: apy1D },
                  { k: "7d", label: "7D", color: "var(--tp-blue)", values: apy7D },
                  { k: "30d", label: "30D", color: "var(--tp-red)", values: apy30D },
                ]}
                min={4}
                max={18}
                dates={DATES}
                fmt="pct"
                toggleable
              />
            </div>
            <div className="tp-chart" data-apy-svg="pp" style={{ display: "none" }}>
              <LineChart
                series={[
                  { k: "wt", label: "Weekly Target", color: "var(--tp-green)", values: apyPP },
                  { k: "1d", label: "1D", color: "var(--tp-amber)", values: apyPP1D },
                  { k: "7d", label: "7D", color: "var(--tp-blue)", values: apyPP7D },
                  { k: "30d", label: "30D", color: "var(--tp-red)", values: apyPP30D },
                ]}
                min={12}
                max={64}
                dates={DATES}
                fmt="pct"
                toggleable
              />
            </div>
            <div className="apy-series" data-apy-series>
              <button className="on locked" data-line="wt" data-label="Weekly Target" data-syz="7.75%" data-pp="27.0%" style={{ ["--c"]: "var(--tp-green)" } as React.CSSProperties}><i />Weekly Target</button>
              <button data-line="1d" data-label="1D" data-syz="8.05%" data-pp="27.0%" style={{ ["--c"]: "var(--tp-amber)" } as React.CSSProperties}><i />1D</button>
              <button data-line="7d" data-label="7D" data-syz="8.02%" data-pp="27.0%" style={{ ["--c"]: "var(--tp-blue)" } as React.CSSProperties}><i />7D</button>
              <button data-line="30d" data-label="30D" data-syz="7.78%" data-pp="26.0%" style={{ ["--c"]: "var(--tp-red)" } as React.CSSProperties}><i />30D</button>
            </div>
          </div>
        </section>
        </div>{/* .tp-charts2 */}

        {/* Top strategies */}
        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Yuzu Alpha Strategy Breakdown</h3><span className="tp-total-h">Total<b>{usd(ALPHA_TOTAL)}</b></span></div>
            <StackedBar rows={ALPHA_SPLIT} topN={4} />
          </div>
        </section>
      </div>{/* .alpha panel */}

      {/* ==================== PRIME PANEL ==================== */}
      <div data-tp-panel="prime" style={{ display: "none" }}>

        <section className="section rv">
          <div className="card tp-summary6">
            <div className="s6"><div className="k">Assets / liabilities</div><div className="v" style={{ color: "var(--good)" }}>100.12%</div></div>
            <div className="s6"><div className="k">Assets</div><div className="v" data-count="7659180" data-prefix="$">$0</div></div>
            <div className="s6"><div className="k">Liabilities</div><div className="v" data-count="7650000" data-prefix="$">$0</div></div>
            <div className="s6"><div className="k">Yield distributed</div><div className="v" data-count="18300" data-prefix="$">$0</div></div>
            <div className="s6"><div className="k">NAV</div><div className="v">$1.01243</div></div>
            <div className="s6"><div className="k">APY</div><div className="v" style={{ color: "var(--prime)" }}>7.00%</div></div>
          </div>
        </section>

        <div className="tp-charts2">
        {/* Assets vs Liabilities */}
        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Assets vs Liabilities</h3></div>
            <div className="tp-readout">
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-backing)" }} />Assets</span><b className="rv">$7,659,180</b></div>
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-supply)" }} />Liabilities</span><b className="rv">$7,650,000</b></div>
            </div>
            <div className="tp-chart">
              <LineChart
                series={[
                  { k: "a", label: "Assets", color: "var(--tp-backing)", values: primeAssets },
                  { k: "l", label: "Liabilities", color: "var(--tp-supply)", values: primeLiab },
                ]}
                min={Math.min(...primeLiab) * 0.985}
                max={Math.max(...primeAssets) * 1.015}
                dates={DATES}
                fmt="money"
              />
            </div>
          </div>
        </section>

        {/* APY */}
        <section className="section rv">
          <div className="card tp-panel apy-card" data-apy data-apy-default="pr">
            <div className="phead">
              <h3>APY</h3>
            </div>
            <div className="tp-readout" data-apy-readout>
              <div className="tp-readout-item"><span className="rl"><i style={{ background: "var(--tp-green)" }} />Weekly Target</span><b className="rv">7.00%</b></div>
            </div>
            <div className="tp-chart" data-apy-svg="pr">
              <LineChart
                series={[
                  { k: "wt", label: "Weekly Target", color: "var(--tp-green)", values: primeApy },
                  { k: "1d", label: "1D", color: "var(--tp-amber)", values: primeApy1D },
                  { k: "7d", label: "7D", color: "var(--tp-blue)", values: primeApy7D },
                  { k: "30d", label: "30D", color: "var(--tp-red)", values: primeApy30D },
                ]}
                min={5}
                max={8}
                dates={DATES}
                fmt="pct"
                toggleable
              />
            </div>
            <div className="apy-series" data-apy-series>
              <button className="on locked" data-line="wt" data-label="Weekly Target" data-pr="7.00%" style={{ ["--c"]: "var(--tp-green)" } as React.CSSProperties}><i />Weekly Target</button>
              <button data-line="1d" data-label="1D" data-pr="7.12%" style={{ ["--c"]: "var(--tp-amber)" } as React.CSSProperties}><i />1D</button>
              <button data-line="7d" data-label="7D" data-pr="7.05%" style={{ ["--c"]: "var(--tp-blue)" } as React.CSSProperties}><i />7D</button>
              <button data-line="30d" data-label="30D" data-pr="6.82%" style={{ ["--c"]: "var(--tp-red)" } as React.CSSProperties}><i />30D</button>
            </div>
          </div>
        </section>
        </div>{/* .tp-charts2 */}

        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Yuzu Prime Strategy Breakdown</h3><span className="tp-total-h">Total<b>{usd(PRIME_TOTAL)}</b></span></div>
            <StackedBar rows={PRIME_SPLIT} topN={4} />
          </div>
        </section>
      </div>{/* .prime panel */}

      {/* ==================== ATTESTATION FOOTER ==================== */}
      <section className="section rv">
        <div className="card tp-panel">
          <div className="phead"><h3>Verification methods</h3></div>
          <div className="tp-attest">
          <div className="tp-attest-item">
            <span className="tp-attest-ic"><Pix rows={PIX_MERKLE} /></span>
            <div className="tp-attest-txt"><b>Merkle Root Hash</b><span>Cryptographic data integrity</span></div>
          </div>
          <div className="tp-attest-item">
            <span className="tp-attest-ic"><Pix rows={PIX_NODE} /></span>
            <div className="tp-attest-txt"><b>Enclave Attestation</b><span>Hardware-level verification</span></div>
          </div>
          <div className="tp-attest-item">
            <span className="tp-attest-ic"><Pix rows={PIX_ZK} /></span>
            <div className="tp-attest-txt"><b>Zero Knowledge Proofs</b><span>Privacy-preserving validation</span></div>
          </div>
          </div>
        </div>
      </section>

      <TransparencyClient />
    </div>
  );
}
