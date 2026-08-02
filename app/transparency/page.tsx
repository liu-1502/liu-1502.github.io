import Link from "next/link";
import "./styles.css";
import TransparencyClient from "./TransparencyClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import { ChartLines, Donut, StackedBar } from "./parts";
import {
  ALPHA_SPLIT,
  PRIME_SPLIT,
  reserves,
  supply,
  apy,
  apyPP,
  assetsMin,
  assetsMax,
} from "./data";

export const metadata = pageMetadata("/transparency");

export default function Transparency() {
  return (
    <div className="pg-transparency">
      <section className="hub-hero">
        <div>
          <h1>Transparency</h1>
          <p className="lede">An independent proof of solvency, live: assets and liabilities across Yuzu Alpha and Prime are attested every 15 minutes by Accountable, a verification network using secure enclaves and zero-knowledge proofs. This page renders their verified feed, position by position.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
            <Button href="https://yuzu.accountable.capital/" target="_blank" rel="noopener" variant="solid"><img src="/assets/partners/accountable-fav.png" alt="" style={{ width: 18, height: 18, filter: "brightness(0) invert(1)" }} />Official Accountable dashboard <span className="arr">↗</span></Button>
          </div>
        </div>
        <div className="verify-meta rv">
          <div><span className="k">Verifier</span><span className="v">Accountable DVN</span></div>
          <div><span className="k">Quorum</span><span className="v" style={{ color: "var(--good)" }}>Active, locked</span></div>
          <div><span className="k">Interval</span><span className="v">15 minutes</span></div>
          <div><span className="k">Attestation</span><span className="v">SEV enclave + Merkle root</span></div>
          <div><span className="k">Proof</span><span className="v">zkTLS + ZK snapshot</span></div>
          <div><span className="k">Verifiability</span><span className="v" style={{ color: "var(--good)" }}>100%</span></div>
          <div><span className="k">Last update</span><span className="v">2026-07-16 05:03:30</span></div>
        </div>
      </section>

      <div className="statwall rv">
        <div className="card bigstat">
          <div className="k">Total TVL</div>
          <div className="v" data-count="54612904" data-prefix="$">$0</div>
        </div>
        <div className="card bigstat">
          <div className="k">Total yield distributed</div>
          <div className="v" data-count="2559843" data-prefix="$">$0</div>
        </div>
        <div className="card bigstat">
          <div className="k">Alpha collateral ratio</div>
          <div className="v" style={{ color: "var(--good)" }} data-count="110.82" data-dec="2" data-suffix="%">0%</div>
          <div className="sub">+$4,820,702 surplus</div>
        </div>
        <div className="card bigstat">
          <div className="k">Reserve Fund</div>
          <div className="v" data-count="500523" data-prefix="$">$0</div>
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
            <div className="tp-summary-donut">
              <Donut ratio={110.82} colorVar="--good" />
              <div className="tp-donut-center">
                <b>110.82%</b>
                <span className="tp-donut-tag">Well Backed</span>
                <small>Collateral ratio</small>
              </div>
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
          <div className="card tp-panel">
            <div className="phead"><h3>Backing assets vs supply</h3></div>
            <div className="tp-chart-head">
              <div><span className="dot" style={{ background: "var(--alpha)" }} /><span className="l">Backing assets</span><b>$49,375,157</b></div>
              <div><span className="dot" style={{ background: "var(--prime)" }} /><span className="l">Supply</span><b>$44,554,443</b></div>
            </div>
            <div className="tp-chart">
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-label="Backing assets and supply over time">
                <ChartLines
                  series={[
                    { values: reserves, color: "var(--alpha)" },
                    { values: supply, color: "var(--prime)" },
                  ]}
                  min={assetsMin}
                  max={assetsMax}
                />
              </svg>
              <div className="xlab"><span>OCT 16</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
            </div>
          </div>
        </section>

        {/* APY */}
        <section className="section rv">
          <div className="card tp-panel apy-card" data-apy>
            <div className="phead">
              <h3>APY</h3>
              <div className="tp-subtabs" data-apy-tabs>
                <button className="on" data-apy-token="syz">syzUSD</button>
                <button data-apy-token="pp">yzPP</button>
              </div>
            </div>
            <div className="apy-readout">
              <div className="cv" data-apy-value style={{ color: "var(--alpha)" }}>7.75%</div>
              <div className="apy-range" data-apy-range>
                <button data-r="1d" data-syz="8.05%" data-pp="27.0%">1D</button>
                <button data-r="7d" data-syz="8.02%" data-pp="27.0%">7D</button>
                <button data-r="30d" data-syz="7.78%" data-pp="26.0%">30D</button>
                <button className="on" data-r="wt" data-syz="7.75%" data-pp="27.0%">Weekly Target</button>
              </div>
            </div>
            <div className="tp-chart">
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" data-apy-svg="syz" aria-label="syzUSD APY over time">
                <ChartLines series={[{ values: apy, color: "var(--alpha)" }]} min={5} max={17} />
              </svg>
              <svg viewBox="0 0 300 130" preserveAspectRatio="none" data-apy-svg="pp" style={{ display: "none" }} aria-label="yzPP APY over time">
                <ChartLines series={[{ values: apyPP, color: "var(--alpha)" }]} min={15} max={60} />
              </svg>
              <div className="xlab"><span>OCT 16</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
            </div>
          </div>
        </section>

        {/* Top strategies */}
        <section className="section rv">
          <div className="card tp-panel">
            <div className="phead"><h3>Alpha top strategies</h3></div>
            <StackedBar rows={ALPHA_SPLIT} topN={4} colorVar="--alpha" />
          </div>
        </section>
      </div>{/* .alpha panel */}

      {/* ==================== PRIME PANEL ==================== */}
      <div data-tp-panel="prime" style={{ display: "none" }}>

        <section className="section rv">
          <div className="card tp-summary">
            <div className="tp-summary-donut">
              <Donut ratio={100.28} colorVar="--good" />
              <div className="tp-donut-center">
                <b>100.28%</b>
                <span className="tp-donut-tag">Well Backed</span>
                <small>Assets / liabilities</small>
              </div>
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
            <div className="phead"><h3>Prime top strategies</h3></div>
            <StackedBar rows={PRIME_SPLIT} topN={4} colorVar="--prime" />
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
