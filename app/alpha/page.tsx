import Link from "next/link";
import "./styles.css";
import AlphaClient from "./AlphaClient";
import { pageMetadata } from "@/lib/pages";
import TokenPill from "@/components/ui/TokenPill";
import Button from "@/components/ui/Button";
import SegmentedTabs from "@/components/ui/SegmentedTabs";

export const metadata = pageMetadata("/alpha");

export default function Alpha() {
  return (
    <div className="pg-alpha">

      <div className="gate" data-alpha-banner style={{ marginTop: 12 }}>
        <div>
          <div className="t">Eligibility verification required for primary mint and redeem</div>
          <div className="d">Minting and redeeming yzUSD and yzPP is reserved to Eligible Investors after KYC and Source-of-Funds screening. Staking syzUSD needs nothing: no KYC, ever. You can also acquire any Alpha token on Curve without KYC.</div>
        </div>
        <Button>Verify eligibility <span className="arr">→</span></Button>
      </div>

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <SegmentedTabs
            className="xchg-tabs"
            attr="data-tab"
            id="alphaTabs"
            items={[
              { id: "yzusd", label: "Mint / Redeem yzUSD" },
              { id: "yzpp", label: "Mint / Redeem yzPP" },
              { id: "syzusd", label: "Stake / Unstake syzUSD" },
            ]}
          />

          {/* ============ yzUSD ============ */}
          <div className="xchg-body" data-panel="yzusd">
            <div className="dir-row">
              <SegmentedTabs
                className="dir-switch"
                attr="data-dir"
                items={[
                  { id: "mint", label: "Mint" },
                  { id: "redeem", label: "Redeem" },
                ]}
              />
              <span className="chip gated">KYC gated</span>
            </div>

            <div data-dirpanel="mint">
              <div className="xfield">
                <div className="xlabel"><span>You deposit</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to deposit"/>
                  <TokenPill sym="usdt" label="USDT0" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                  <TokenPill sym="yzUSD" label="yzUSD" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">Rate</span><span className="v">1:1 at par</span></div>
                <div><span className="k">Access</span><span className="v">Eligible Investors, KYC</span></div>
                <div><span className="k">Alternative</span><span className="v hi">Swap on Curve, no KYC</span></div>
                <div><span className="k">Network</span><span className="v">Plasma</span></div>
              </div>
              <Button block className="gcta" disabled>Verify eligibility to continue</Button>
            </div>

            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="xfield">
                <div className="xlabel"><span>You redeem</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to redeem"/>
                  <TokenPill sym="yzUSD" label="yzUSD" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                  <TokenPill sym="usdt" label="USDT0" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">Rate</span><span className="v">1:1 at par</span></div>
                <div><span className="k">Access</span><span className="v">Eligible Investors, KYC</span></div>
                <div><span className="k">Alternative</span><span className="v hi">Swap on Curve, no KYC</span></div>
              </div>
              <Button block className="gcta" disabled>Verify eligibility to continue</Button>
            </div>
          </div>

          {/* ============ yzPP ============ */}
          <div className="xchg-body" data-panel="yzpp" style={{ display: "none" }}>
            <div className="dir-row">
              <SegmentedTabs
                className="dir-switch"
                attr="data-dir"
                items={[
                  { id: "mint", label: "Mint" },
                  { id: "redeem", label: "Redeem" },
                ]}
              />
              <span className="chip gated">KYC gated</span>
            </div>

            <div data-dirpanel="mint">
              <div className="xfield">
                <div className="xlabel"><span>You deposit</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to deposit"/>
                  <TokenPill sym="usdt" label="USDT0" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                  <TokenPill sym="yzPP" label="yzPP" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">yzPP price</span><span className="v">1 yzPP = 1.148527 USDT0</span></div>
                <div><span className="k">Estimated APY</span><span className="v hi">27.0%</span></div>
                <div><span className="k">Role</span><span className="v">Junior tranche, absorbs losses first</span></div>
                <div><span className="k">Access</span><span className="v">Eligible Investors, KYC</span></div>
              </div>
              <Button block className="gcta" disabled>Verify eligibility to continue</Button>
            </div>

            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="xfield">
                <div className="xlabel"><span>You redeem</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to redeem"/>
                  <TokenPill sym="yzPP" label="yzPP" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                  <TokenPill sym="usdt" label="USDT0" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">Redemption window</span><span className="v">30 days, yield keeps accruing</span></div>
                <div><span className="k">Minimum order</span><span className="v">5,000 yzPP</span></div>
                <div><span className="k">During a loss event</span><span className="v">Redemptions pause until assessed</span></div>
                <div><span className="k">Access</span><span className="v">Eligible Investors, KYC</span></div>
              </div>
              <Button block className="gcta" disabled>Verify eligibility to continue</Button>
            </div>
          </div>

          {/* ============ syzUSD ============ */}
          <div className="xchg-body" data-panel="syzusd" style={{ display: "none" }}>
            <div className="dir-row">
              <SegmentedTabs
                className="dir-switch"
                attr="data-dir"
                items={[
                  { id: "stake", label: "Stake" },
                  { id: "unstake", label: "Unstake" },
                ]}
              />
              <span className="chip open">No KYC</span>
            </div>

            <div data-dirpanel="stake">
              <div className="xfield">
                <div className="xlabel"><span>You stake</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="0.9361" aria-label="Amount to stake"/>
                  <TokenPill sym="yzUSD" label="yzUSD" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received"/>
                  <TokenPill sym="syzUSD" label="syzUSD" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">Exchange rate</span><span className="v">1 yzUSD = 0.9361 syzUSD</span></div>
                <div><span className="k">Weekly target yield</span><span className="v hi">7.75%</span></div>
                <div><span className="k">Unstaking</span><span className="v">One step, near instant</span></div>
                <div><span className="k">Network</span><span className="v">Plasma</span></div>
              </div>
              <Button block>Connect Wallet</Button>
            </div>

            <div data-dirpanel="unstake" style={{ display: "none" }}>
              <div className="xfield">
                <div className="xlabel"><span>You unstake</span><span>Balance 0.00 <button type="button">Max</button></span></div>
                <div className="xrow">
                  <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to unstake"/>
                  <TokenPill sym="syzUSD" label="syzUSD" />
                </div>
                <div className="xusd">≈ $0.00</div>
              </div>
              <div className="xdivider"><span>↓</span></div>
              <div className="xfield">
                <div className="xlabel"><span>You receive</span></div>
                <div className="xrow">
                  <input type="text" placeholder="0.00" readOnly aria-label="Amount received"/>
                  <TokenPill sym="yzUSD" label="yzUSD" />
                </div>
              </div>
              <div className="xmeta">
                <div><span className="k">Exchange rate</span><span className="v">1 syzUSD = 1.0683 yzUSD</span></div>
                <div><span className="k">Settlement</span><span className="v">Near instant</span></div>
              </div>
              <Button block>Connect Wallet</Button>
            </div>
          </div>
        </div>

        <aside className="rv">
          <div className="aside-card">
            <h4>Yield cadence</h4>
            <p>syzUSD yield is decided every Friday and covers the week that follows. yzPP earns the same base yield plus a protocol-funded premium, budgeted daily at 04:00 UTC.</p>
            <div className="rows">
              <div><span className="k">syzUSD weekly target</span><span className="v" style={{ color: "var(--alpha)" }}>7.75%</span></div>
              <div><span className="k">syzUSD epoch</span><span className="v">Fri 04:00 to Fri 03:59 UTC</span></div>
              <div><span className="k">yzPP estimated APY</span><span className="v" style={{ color: "var(--alpha)" }}>27.0%</span></div>
              <div><span className="k">yzPP premium budget</span><span className="v">Daily, 04:00 UTC</span></div>
            </div>
          </div>
          <div className="aside-card">
            <h4>Backing, verified live</h4>
            <p>Every yzUSD is backed by more than one dollar of onchain assets, attested every 15 minutes by Accountable.</p>
            <div className="rows">
              <div><span className="k">Collateral ratio</span><span className="v" style={{ color: "var(--good)" }}>110.82%</span></div>
              <div><span className="k">First-loss buffer</span><span className="v">yzPP + Reserve Fund</span></div>
              <div><span className="k">Proof of reserves</span><span className="v" style={{ color: "var(--good)" }}><Link href="/transparency" style={{ color: "inherit", textDecoration: "none" }}>Live →</Link></span></div>
            </div>
          </div>
          <div className="aside-card">
            <h4>Composability</h4>
            <p>syzUSD is an ERC-4626 vault token. Use it as collateral, loop it, or provide liquidity on Pendle, Balancer and Curve while it keeps accruing.</p>
          </div>
        </aside>

      </div>


      <div className="page-stats rv">
        <div><div className="k">Alpha TVL</div><div className="v" data-count="48470795" data-prefix="$">$0</div></div>
        <div><div className="k">Collateral ratio</div><div className="v" style={{ color: "var(--good)" }}>110.82%</div></div>
        <div><div className="k">syzUSD target</div><div className="v" style={{ color: "var(--alpha)" }}>7.75%</div></div>
        <div><div className="k">yzPP target</div><div className="v" style={{ color: "var(--alpha)" }}>27.0%</div></div>
        <div className="pro-only"><div className="k">Next epoch</div><div className="v">FRI 04:00</div></div>
      </div>

      <div className="wl-alert rv pro-only">
        <div>
          <div className="t">Ongoing whitelist activation</div>
          <div className="d">mGLOBAL (mGLO) enters the Alpha mandate in 4d 21h. Review the entry before any funds deploy.</div>
        </div>
        <Link className="go" href="/whitelist">Check it now →</Link>
      </div>


      <section className="section rv pro-only">
        <div className="section-head">
          <h2>What backs Alpha</h2>
          <Link href="/transparency">Live breakdown →</Link>
        </div>
        <div className="card compo">
          <p>Backing assets are deployed across curated strategy buckets under the public whitelist mandate. The live, wallet-by-wallet breakdown is published on the Accountable dashboard.</p>
          <div className="compo-rows">
            <div className="compo-row">
              <span className="name">Leveraged stable strategies
                <span className="sub">yzAUSD, USDe loops in isolated markets, fundamental oracles</span>
              </span>
              <span className="bar"><i style={{ width: "34%" }}></i></span>
              <span className="pct">34%</span>
            </div>
            <div className="compo-row">
              <span className="name">Overcollateralized lending
                <span className="sub">Maple Syrup, Curvance, Kamino, Jupiter Lend</span>
              </span>
              <span className="bar"><i style={{ width: "28%" }}></i></span>
              <span className="pct">28%</span>
            </div>
            <div className="compo-row">
              <span className="name">Tokenized T-Bills and AAA CLOs
                <span className="sub">BUIDL, VBILL, mGLOBAL and peers</span>
              </span>
              <span className="bar"><i style={{ width: "22%" }}></i></span>
              <span className="pct">22%</span>
            </div>
            <div className="compo-row">
              <span className="name">Funding-rate arbitrage
                <span className="sub">Ethena, Hyperliquid</span>
              </span>
              <span className="bar"><i style={{ width: "10%" }}></i></span>
              <span className="pct">10%</span>
            </div>
            <div className="compo-row">
              <span className="name">Stablecoin arbitrage and liquidity buffer
                <span className="sub">Curve, Balancer, Pendle pools</span>
              </span>
              <span className="bar"><i style={{ width: "6%" }}></i></span>
              <span className="pct">6%</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <Button href="/whitelist" variant="line">See all whitelisted assets and protocols <span className="arr">→</span></Button>
          </div>
        </div>
      </section>

      <AlphaClient/>
    </div>
  );
}
