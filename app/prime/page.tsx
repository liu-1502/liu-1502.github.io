import Link from "next/link";
import "./styles.css";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("/prime");

export default function Prime() {
  return (
    <div className="pg-prime">
      <div className="gate" data-gate-banner>
        <div>
          <div className="t">Eligibility verification required</div>
          <div className="d">Minting and redeeming yzPrime is reserved to Accredited, Qualified, Institutional or Sophisticated Investors. Complete identity and Source-of-Funds screening to unlock this desk.</div>
        </div>
        <button className="btn btn-accent">Verify eligibility <span className="arr">→</span></button>
      </div>

      <div className="app-layout" style={{ paddingTop: 26 }}>

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <div className="xchg-tabs">
            <button className="on" data-tab="mint">Mint</button>
            <button data-tab="redeem">Redeem</button>
          </div>

          <div className="xchg-body" data-panel="mint">
            <div className="xfield">
              <div className="xlabel">
                <span>You deposit</span>
                <span>Balance 0.00 <button type="button">Max</button></span>
              </div>
              <div className="xrow">
                <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="0.9860" aria-label="Amount to deposit"/>
                <span className="token"><img src="/assets/tokens/usdc.svg" alt=""/>USDC</span>
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>

            <div className="xdivider"><span>↓</span></div>

            <div className="xfield">
              <div className="xlabel"><span>You receive</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received"/>
                <span className="token"><img src="/assets/tokens/yzPrime.svg" alt=""/>yzPrime</span>
              </div>
            </div>

            <div className="xmeta">
              <div><span className="k">Prevailing NAV</span><span className="v">1 yzPrime = $1.01243</span></div>
              <div><span className="k">Yield accrual</span><span className="v hi">Continuous, no epochs</span></div>
              <div><span className="k">Mandate</span><span className="v">Asset whitelist, public</span></div>
              <div><span className="k">Network</span><span className="v">Monad</span></div>
            </div>

            <button className="btn btn-accent btn-block" data-gate-cta disabled>Verify eligibility to mint</button>
          </div>

          <div className="xchg-body" data-panel="redeem" style={{ display: "none" }}>
            <div className="xfield">
              <div className="xlabel">
                <span>You redeem</span>
                <span>Balance 0.00 <button type="button">Max</button></span>
              </div>
              <div className="xrow">
                <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to redeem"/>
                <span className="token"><img src="/assets/tokens/yzPrime.svg" alt=""/>yzPrime</span>
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>
            <div className="xdivider"><span>↓</span></div>
            <div className="xfield">
              <div className="xlabel"><span>You receive</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                <span className="token"><img src="/assets/tokens/usdc.svg" alt=""/>USDC</span>
              </div>
            </div>
            <div className="xmeta">
              <div><span className="k">Prevailing NAV</span><span className="v">1 yzPrime = $1.01243</span></div>
              <div><span className="k">Settlement</span><span className="v">Per program rules</span></div>
            </div>
            <button className="btn btn-accent btn-block" data-gate-cta disabled>Verify eligibility to continue</button>
          </div>
        </div>

        <aside className="rv">
          <div className="aside-card">
            <h4>Who can mint</h4>
            <p>Accredited, Qualified, Institutional or Sophisticated Investors, depending on your jurisdiction. Screening covers KYC or KYB, sanctions, AML and Source-of-Funds. Once verified, you mint and redeem at NAV.</p>
          </div>
          <div className="aside-card">
            <h4>Where your USDC goes</h4>
            <p>Deposits enter the Collateral Pool, then deploy into tokenized T-Bills, AAA CLOs and overcollateralized lending under the public whitelist mandate. Nothing moves off-list.</p>
          </div>
          <div className="aside-card">
            <h4>Verify, always</h4>
            <p>Assets and liabilities are attested in near real time. Check the backing before and after you mint.</p>
            <div className="rows">
              <div><span className="k">Proof of reserves</span><span className="v" style={{ color: "var(--good)" }}><Link href="/transparency" style={{ color: "inherit", textDecoration: "none" }}>Live →</Link></span></div>
            </div>
          </div>
        </aside>

      </div>


      <div className="page-stats rv">
        <div><div className="k">yzPrime TVL</div><div className="v" data-count="6142108" data-prefix="$">$0</div></div>
        <div><div className="k">Assets / liabilities</div><div className="v" style={{ color: "var(--good)" }}>100.28%</div></div>
        <div><div className="k">Target APY</div><div className="v" style={{ color: "var(--prime)" }}>7.00%</div></div>
        <div className="pro-only"><div className="k">Distribution</div><div className="v">Continuous</div></div>
        <div className="pro-only"><div className="k">Collateral</div><div className="v">100% onchain</div></div>
      </div>


      <section className="section rv pro-only">
        <div className="section-head">
          <h2>What backs yzPrime</h2>
          <Link href="/transparency">Live breakdown →</Link>
        </div>
        <div className="card compo">
          <p>Deposits are deployed into a basket of institutional-grade tokenized instruments, under a public mandate. Live exposure is published on the Accountable dashboard.</p>
          <div className="compo-rows">
            <div className="compo-row">
              <span className="name">Tokenized U.S. T-Bills
                <span className="sub">BUIDL, VBILL, WTGXX, JTRSY</span>
              </span>
              <span className="bar"><i style={{ width: "45%" }}></i></span>
              <span className="pct">45%</span>
            </div>
            <div className="compo-row">
              <span className="name">AAA-rated CLOs
                <span className="sub">Zero principal loss in 30+ years, via JAAA, STAC</span>
              </span>
              <span className="bar"><i style={{ width: "25%" }}></i></span>
              <span className="pct">25%</span>
            </div>
            <div className="compo-row">
              <span className="name">Overcollateralized lending
                <span className="sub">Maple Finance, KYC institutional borrowers only</span>
              </span>
              <span className="bar"><i style={{ width: "30%" }}></i></span>
              <span className="pct">30%</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <Link className="btn btn-line" href="/whitelist">See all whitelisted assets and protocols <span className="arr">→</span></Link>
          </div>
          <p className="prime-note">Primary minting and redeeming of yzPrime are restricted to Eligible Investors. Yuzu Money may decline, pause or revoke access to remain compliant. Retail users are not eligible to mint, subscribe or redeem yzPrime. Secondary-market activity is not operated by Yuzu and remains subject to third-party venue rules and applicable law.</p>
        </div>
      </section>

    </div>
  );
}
