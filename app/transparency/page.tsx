import Link from "next/link";
import "./styles.css";
import TransparencyClient from "./TransparencyClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import { SplitTable, WalletList, ChartLines } from "./parts";
import {
  ALPHA_SPLIT,
  PRIME_SPLIT,
  ALPHA_CHAINS,
  PRIME_CHAINS,
  ALPHA_WALLETS,
  PRIME_WALLETS,
  reserves,
  supply,
  ratio,
  apy,
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

      {/* ==================== HISTORY CHARTS ==================== */}
      <section className="section rv pro-only">
        <div className="section-head">
          <h2>Nine months of history</h2>
        </div>
        <div className="charts">
          <div className="card chart-card">
            <h4>Backing assets vs supply</h4>
            <div className="cv" style={{ color: "var(--alpha)" }}>$49.38M <span style={{ color: "var(--faint)", fontSize: 12 }}>vs $44.55M</span></div>
            <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-label="Backing assets and supply over time">
              <ChartLines
                series={[
                  { values: reserves, color: "var(--alpha)" },
                  { values: supply, color: "var(--faint)" },
                ]}
                min={assetsMin}
                max={assetsMax}
              />
            </svg>
            <div className="xlab"><span>OCT 15</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
          </div>
          <div className="card chart-card">
            <h4>Collateral ratio</h4>
            <div className="cv" style={{ color: "var(--good)" }}>110.82%</div>
            <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-label="Collateral ratio over time">
              <ChartLines series={[{ values: ratio, color: "var(--good)" }]} min={100} max={116} />
            </svg>
            <div className="xlab"><span>OCT 15</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
          </div>
          <div className="card chart-card">
            <h4>syzUSD weekly target APY</h4>
            <div className="cv" style={{ color: "var(--alpha)" }}>7.75%</div>
            <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-label="syzUSD weekly target APY over time">
              <ChartLines series={[{ values: apy, color: "var(--alpha)" }]} min={5} max={17} />
            </svg>
            <div className="xlab"><span>OCT 15</span><span>JAN</span><span>APR</span><span>JUL 15</span></div>
          </div>
        </div>
      </section>

      {/* ==================== REALIZED APY ==================== */}
      <section className="section rv pro-only">
        <div className="section-head">
          <h2>Realized APY</h2>
          <Link href="/docs#epochs">How targets work →</Link>
        </div>
        <div className="card tp-panel" style={{ margin: 0 }}>
          <table className="apy-table">
            <thead><tr><th>Token</th><th>Target</th><th>1d realized</th><th>7d realized</th><th>30d realized</th><th>Price</th></tr></thead>
            <tbody>
              <tr><td>syzUSD</td><td style={{ color: "var(--alpha)" }}>7.75%</td><td>8.05%</td><td>8.02%</td><td>7.78%</td><td>1.068436 yzUSD</td></tr>
              <tr><td>yzPP</td><td style={{ color: "var(--alpha)" }}>27.0%</td><td>27.0%</td><td>27.0%</td><td>26.0%</td><td>1.148527 USDT0</td></tr>
              <tr><td>yzPrime</td><td style={{ color: "var(--prime)" }}>7.00%</td><td>6.50%</td><td>6.90%</td><td>6.90%</td><td>$1.01243</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==================== ALPHA ==================== */}
      <section className="section rv">
        <div className="section-head">
          <h2 style={{ color: "var(--alpha)" }}>Alpha</h2>
          <Link href="/alpha">Go to product →</Link>
        </div>

        <div className="card tp-panel">
          <div className="phead">
            <h3>Backing assets vs supply</h3>
          </div>
          <div className="tp-grid">
            <div><div className="k">yzUSD TVL</div><div className="v" data-count="44554443" data-prefix="$">$0</div></div>
            <div><div className="k">yzUSD staked</div><div className="v">98.29%</div></div>
            <div className="pro-only"><div className="k">Staked yzUSD</div><div className="v" data-count="43793316">0</div></div>
            <div><div className="k">yzPP TVL</div><div className="v" data-count="3916352" data-prefix="$">$0</div></div>
            <div className="pro-only"><div className="k">Alpha yield paid</div><div className="v" data-count="2544038" data-prefix="$">$0</div></div>
            <div className="pro-only"><div className="k">Reserve Fund</div><div className="v" data-count="500523" data-prefix="$">$0</div></div>
          </div>
          <div className="bvs">
            <div className="bvs-row">
              <span className="name">Backing assets<small>yzUSD + yzPP + Reserve</small></span>
              <span className="bar"><i data-w="100%" style={{ background: "var(--alpha)" }}></i></span>
              <span className="amt">$49,375,157</span>
            </div>
            <div className="bvs-row">
              <span className="name">Supply<small>yzUSD in circulation</small></span>
              <span className="bar"><i data-w="90.2%" style={{ background: "var(--faint)" }}></i></span>
              <span className="amt">$44,554,443</span>
            </div>
          </div>
          <p className="surplus-note">Surplus of $4,820,702 stands between yzUSD holders and any loss.</p>
        </div>

        <div className="card tp-panel pro-only">
          <div className="phead">
            <h3>Strategy breakdown, position by position</h3>
          </div>
          <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 8px", maxWidth: "70ch" }}>Every position backing Alpha, as attested on 2026-07-16. Names map to entries on the <Link href="/whitelist" style={{ color: "var(--citrus)" }}>public whitelist</Link>; "Loop" positions are leveraged deployments in isolated markets.</p>
          <SplitTable rows={ALPHA_SPLIT} colorVar="--alpha" />
        </div>

        <div className="card tp-panel pro-only">
          <div className="phead">
            <h3>Backing by chain</h3>
          </div>
          <div className="two-col">
            <SplitTable rows={ALPHA_CHAINS} colorVar="--alpha" />
            <div>
              <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 12px" }}>Backing assets are deployed across 8+ chains, while all yzUSD supply lives on Plasma. The verification feed reads every chain independently.</p>
              <div className="tp-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div><div className="k">Supply chain</div><div className="v">Plasma</div></div>
                <div><div className="k">Supply</div><div className="v">$44.55M</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRIME ==================== */}
      <section className="section rv">
        <div className="section-head">
          <h2 style={{ color: "var(--prime)" }}>Prime</h2>
          <Link href="/prime">Go to product →</Link>
        </div>
        <div className="card tp-panel">
          <div className="phead">
            <h3>Assets against liabilities</h3>
          </div>
          <div className="tp-grid">
            <div><div className="k">Assets / liabilities</div><div className="v" style={{ color: "var(--good)" }}>100.28%</div></div>
            <div><div className="k">yzPrime TVL</div><div className="v" data-count="6142108" data-prefix="$">$0</div></div>
            <div><div className="k">Prime yield paid</div><div className="v" data-count="15804" data-prefix="$">$0</div></div>
          </div>
          <div className="bvs">
            <div className="bvs-row">
              <span className="name">Assets<small>Collateral pool</small></span>
              <span className="bar"><i data-w="100%" style={{ background: "var(--prime)" }}></i></span>
              <span className="amt">$6,159,080</span>
            </div>
            <div className="bvs-row">
              <span className="name">Liabilities<small>yzPrime supply</small></span>
              <span className="bar"><i data-w="99.72%" style={{ background: "var(--faint)" }}></i></span>
              <span className="amt">$6,142,108</span>
            </div>
          </div>
          <p className="surplus-note">Assets exceed liabilities by $16,971.</p>

          <div className="pro-only">
            <div className="phead" style={{ marginTop: 26 }}><h3>Strategy breakdown</h3></div>
            <SplitTable rows={PRIME_SPLIT} colorVar="--prime" />

            <div className="phead" style={{ marginTop: 26 }}><h3>Backing by chain</h3></div>
            <SplitTable rows={PRIME_CHAINS} colorVar="--prime" />
          </div>
        </div>
      </section>

      {/* ==================== SECURITY POLICY ==================== */}
      <section className="section rv pro-only">
        <div className="section-head">
          <h2>Custody policy, verified</h2>
          <Link href="/docs#security">Security stack →</Link>
        </div>
        <div className="two-col">
          <div className="card tp-panel" style={{ margin: 0 }}>
            <div className="phead"><h3>Fordefi MPC workspace</h3></div>
            <p style={{ fontSize: "12.5px", color: "var(--muted)", lineHeight: 1.6, margin: "0 0 12px" }}>The verification feed also attests the wallet policy itself: what the protocol's keys are allowed to do, and how many signers it takes.</p>
            <div className="tp-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div><div className="k">Default action</div><div className="v" style={{ color: "var(--risk)" }}>BLOCK</div></div>
              <div><div className="k">Approval threshold</div><div className="v">4 signers</div></div>
              <div><div className="k">Policy created</div><div className="v">06/10/2025</div></div>
              <div><div className="k">Last modified</div><div className="v">14/07/2026</div></div>
            </div>
            <p style={{ fontSize: "11.5px", color: "var(--faint)", lineHeight: 1.6, margin: "14px 0 0" }}>Default BLOCK means any transaction not explicitly allowed by policy is rejected. Changes to the policy are themselves timestamped and attested.</p>
          </div>
          <div className="card tp-panel" style={{ margin: 0 }}>
            <div className="phead"><h3>Attestation chain</h3></div>
            <div className="verify-meta" style={{ border: "none" }}>
              <div><span className="k">Enclave</span><span className="v">AMD SEV, key-sealed</span></div>
              <div><span className="k">Snapshot</span><span className="v">Collateral + liabilities, signed</span></div>
              <div><span className="k">Merkle root</span><span className="v">Published + signed</span></div>
              <div><span className="k">ZK proof</span><span className="v">Solvency without exposure</span></div>
            </div>
            <p style={{ fontSize: "11.5px", color: "var(--faint)", lineHeight: 1.6, margin: "14px 0 0" }}>Each 15-minute cycle produces a signed snapshot, a Merkle root of all balances and a zero-knowledge proof, so the numbers above cannot be tampered with after the fact.</p>
          </div>
        </div>
      </section>

      {/* ==================== WALLETS ==================== */}
      <section className="section rv pro-only">
        <div className="section-head">
          <h2>Every NAV wallet, public</h2>
          <a href="https://yuzu.accountable.capital/" target="_blank" rel="noopener">Verify balances ↗</a>
        </div>
        <div className="two-col">
          <div className="card tp-panel" style={{ margin: 0 }}>
            <div className="phead"><h3>Alpha wallets</h3></div>
            <WalletList wallets={ALPHA_WALLETS} />
          </div>
          <div className="card tp-panel" style={{ margin: 0 }}>
            <div className="phead"><h3>Prime wallets</h3></div>
            <WalletList wallets={PRIME_WALLETS} />
            <div className="phead" style={{ marginTop: 22 }}><h3>Core contracts</h3></div>
            <div className="wl-list">
              <a href="https://plasmascan.to/token/0x6695c0f8706c5ace3bdf8995073179cca47926dc" target="_blank" rel="noopener"><span className="wname">yzUSD, Plasma</span><span className="addr">0x6695...26dc ↗</span></a>
              <a href="https://plasmascan.to/token/0xC8A8DF9B210243c55D31c73090F06787aD0A1Bf6" target="_blank" rel="noopener"><span className="wname">syzUSD, Plasma</span><span className="addr">0xC8A8...1Bf6 ↗</span></a>
              <a href="https://plasmascan.to/token/0xebfc8c2fe73c431ef2a371aea9132110aab50dca" target="_blank" rel="noopener"><span className="wname">yzPP, Plasma</span><span className="addr">0xEbFC...0DCa ↗</span></a>
              <a href="https://monadscan.com/token/0xc9ea90692757831d98ac629f2a0140e02b80a7da" target="_blank" rel="noopener"><span className="wname">yzPrime, Monad</span><span className="addr">0xc9ea...A7DA ↗</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW ==================== */}
      <section className="section rv pro-only">
        <div className="section-head">
          <h2>How the verification works</h2>
        </div>
        <div className="how">
          <div className="card">
            <em>Collect</em>
            <b>Data enters secure enclaves</b>
            <span>Wallet balances, positions and supplies are read inside hardware-isolated environments. Nobody, including Yuzu, can tamper with what the enclave sees.</span>
          </div>
          <div className="card">
            <em>Prove</em>
            <b>Zero-knowledge attestation</b>
            <span>Each snapshot is verified through zkTLS and zero-knowledge proofs before publication, without exposing private positions or trading strategy.</span>
          </div>
          <div className="card">
            <em>Publish</em>
            <b>A tamper-proof feed, every 15 minutes</b>
            <span>The published numbers reflect the protocol's true state at attestation time. What you see here is what the chain holds.</span>
          </div>
        </div>
      </section>

      <TransparencyClient />
    </div>
  );
}
