import "./styles.css";
import WhitelistClient from "./WhitelistClient";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("/whitelist");

export default function Whitelist() {
  return (
    <div className="pg-whitelist">
      <section className="hub-hero" style={{ paddingBottom: 0 }}>
        <div>
          <h1>Capital only moves <span className="grad">where it&apos;s allowed</span>.</h1>
          <p className="lede">These lists are the boundaries of the mandate: each product keeps its own whitelist, and anything not on it is out of bounds. New entries pass a full risk review, then wait out a 7-day activation window in public view before any funds move. Underlying asset exposures only, not the routers, DEXs and bridges crossed during deployment.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
          <a className="btn btn-line" href="https://t.me/yuzumoney_stats" target="_blank" rel="noopener">Get whitelist alerts <span className="arr">↗</span></a>
        </div>
      </section>

      <div className="wl-alert rv" style={{ marginTop: 30 }}>
        <div>
          <div className="t">Ongoing whitelist activation</div>
          <div className="d">mGLOBAL (mGLO) enters the Alpha mandate in 4d 21h. Review the entry before any funds deploy.</div>
        </div>
        <a className="go" href="#wlTabs">Check it now ↓</a>
      </div>

      <div className="wl-tabs" id="wlTabs">
        <button className="on" data-t="alpha">Alpha <span className="n">33</span></button>
        <button data-t="prime">Prime <span className="n">16</span></button>
        <button data-t="cash">Cash <span className="n">2</span></button>
      </div>

      {/* ================= ALPHA ================= */}
      <section className="wl-panel on rv" data-t="alpha">
        <div className="wl-table-wrap">
          <table className="wl">
            <thead><tr><th>Protocol</th><th>Primary assets</th><th>Description</th><th>Whitelisted on</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td className="proto">mGLOBAL (mGLO)</td>
                <td className="assets">mGLO, mGLOBAL</td>
                <td className="desc">Tokenised strategy tracking Fasanara Capital&apos;s Global Diversified Alternative Debt: short-duration, investment-grade asset-backed credit from SMEs across 60+ countries.</td>
                <td className="date">14/07/2026</td>
                <td><span className="st activating">Activating</span><span className="st-left">4d 21h left</span></td>
              </tr>
              <tr>
                <td className="proto">yzSyrup</td>
                <td className="assets">syrupUSDC, syrupUSDT</td>
                <td className="desc">Vault executing a leveraged syrupUSDT/syrupUSDC farming strategy.</td>
                <td className="date">26/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Curvance</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Lending protocol where users deposit assets, borrow against them, and generate optimized yields through a unified platform.</td>
                <td className="date">25/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">yzAUSD</td>
                <td className="assets">AUSD, PT-AUSD</td>
                <td className="desc">Vault executing a leveraged AUSD/PT-AUSD farming strategy.</td>
                <td className="date">25/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Kamino</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Money market where major stablecoins are lent in exchange for lending yield and protocol rewards.</td>
                <td className="date">03/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Jupiter Lend</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Integrated DEX and money market, powered by Fluid, where major stablecoins earn lending yield and rewards.</td>
                <td className="date">03/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">M0</td>
                <td className="assets">M0</td>
                <td className="desc">Stablecoin infrastructure layer for institutions.</td>
                <td className="date">24/03/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Global Dollar</td>
                <td className="assets">USDG</td>
                <td className="desc">Regulated, 1:1 USD-pegged stablecoin issued by Paxos Digital Singapore, fully backed and redeemable.</td>
                <td className="date">19/03/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Centrifuge</td>
                <td className="assets">JAAA, JTRSY</td>
                <td className="desc">Ethereum protocol tokenizing real-world assets, enabling onchain finance for asset managers through issuance, liquidity and RWA partnerships.</td>
                <td className="date">23/02/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">WisdomTree</td>
                <td className="assets">WTGXX</td>
                <td className="desc">Global asset manager and ETF innovator with over $150 billion AUM, pioneering tokenized funds like WTGXX.</td>
                <td className="date">23/02/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Securitize</td>
                <td className="assets">BUIDL, VBILL, STAC</td>
                <td className="desc">The leading tokenization platform, bringing real-world assets onchain with over $4B tokenized, backed by BlackRock and Morgan Stanley.</td>
                <td className="date">20/02/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Dolomite</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Decentralized lending protocol where yield comes from borrowers paying interest to depositors, risk managed by overcollateralization.</td>
                <td className="date">23/01/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">World Liberty Financial</td>
                <td className="assets">USD1</td>
                <td className="desc">Stablecoin backed by dollars and U.S. Government Money Market Funds.</td>
                <td className="date">23/01/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Agora</td>
                <td className="assets">AUSD</td>
                <td className="desc">AUSD, the Agora Dollar, is a fully reserved digital dollar, minted 1:1 with U.S. dollars and other USD-denominated assets.</td>
                <td className="date">16/01/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Spark</td>
                <td className="assets">Borrow/lend venue, no Earn vaults</td>
                <td className="desc">Non-custodial liquidity protocol allowing users to lend assets for passive income or borrow overcollateralized loans.</td>
                <td className="date">08/01/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Sky Protocol</td>
                <td className="assets">USDS, sUSDS, DAI, sDAI</td>
                <td className="desc">Overcollateralized stablecoin backed by a diversified basket of onchain crypto collateral and tokenized real-world assets.</td>
                <td className="date">24/12/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">PayPal USD</td>
                <td className="assets">PYUSD</td>
                <td className="desc">Regulated fiat-backed stablecoin issued by Paxos, fully backed 1:1 by USD deposits, short-term Treasuries and cash equivalents.</td>
                <td className="date">19/12/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Superstate</td>
                <td className="assets">USCC, USTB</td>
                <td className="desc">USCC: tokenized fund backed by market-neutral basis trades on BTC, ETH, SOL, XRP. USTB: tokenized short-duration US T-Bills.</td>
                <td className="date">15/12/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Aave</td>
                <td className="assets">GHO</td>
                <td className="desc">Decentralized lending protocol where yield comes from borrowers paying interest to depositors, risk managed by overcollateralization.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">OpenEden</td>
                <td className="assets">cUSDO, PRISM</td>
                <td className="desc">RWA platform focused on tokenizing U.S. Treasury bills, where yield comes from the underlying T-Bill interest accrual.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Curve</td>
                <td className="assets">LP venue</td>
                <td className="desc">DeFi protocol for efficient stablecoin swaps and onchain liquidity.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Morpho</td>
                <td className="assets">Isolated vaults only</td>
                <td className="desc">Isolated-risk lending protocol with immutable market parameters. Deposits only into vaults with identifiable, isolated exposures.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Gearbox</td>
                <td className="assets">Isolated vaults only</td>
                <td className="desc">Composable leverage protocol where users borrow against collateral to run leveraged strategies across integrated DeFi protocols.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Hyperliquid</td>
                <td className="assets">Hedging exchange only</td>
                <td className="desc">Decentralized derivatives exchange offering perpetual futures and spot trading through an onchain orderbook. No vault deployment.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Fluid</td>
                <td className="assets">fUSDT, fUSDC</td>
                <td className="desc">Integrated DEX and money market where major stablecoins are lent in exchange for lending yield and protocol rewards.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Pendle</td>
                <td className="assets">PT / YT and LP venue</td>
                <td className="desc">Yield-tokenization protocol; yield comes from trading and locking tokenized future yield on interest-bearing assets.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Cap</td>
                <td className="assets">cUSD, stcUSD</td>
                <td className="desc">Insured undercollateralized lending platform where restakers put up restaked assets as collateral to protect depositors.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Theo</td>
                <td className="assets">thBILL</td>
                <td className="desc">RWA tokenization platform. thBILL is a basket of institutional-grade tokenized U.S. Treasury bills from regulated issuers.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Ethena</td>
                <td className="assets">USDe, sUSDe, USDM, USDtb</td>
                <td className="desc">Synthetic dollar protocol backed by market-neutral basis trades. Basis yield is streamed into sUSDe.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Ripple</td>
                <td className="assets">RLUSD</td>
                <td className="desc">Regulated fiat-backed stablecoin on XRPL and Ethereum, fully backed 1:1 by cash and short-term treasuries.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Euler</td>
                <td className="assets">Isolated vaults only</td>
                <td className="desc">Modular lending protocol built around isolated risk markets with independently parameterized asset pools.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Strata</td>
                <td className="assets">srUSDe, jrUSDe</td>
                <td className="desc">Yield tranching protocol splitting yield-bearing stablecoins into senior and junior tranches, starting with Ethena&apos;s sUSDe.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Maple</td>
                <td className="assets">syrupUSDC, syrupUSDT, syrupUSDG</td>
                <td className="desc">Institutional credit marketplace. Syrup tokens earn yield from lending against overcollateralized blue-chip assets.</td>
                <td className="date">25/11/2025</td>
                <td><span className="st active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= PRIME ================= */}
      <section className="wl-panel rv" data-t="prime">
        <div className="wl-table-wrap">
          <table className="wl">
            <thead><tr><th>Protocol</th><th>Primary assets</th><th>Description</th><th>Whitelisted on</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td className="proto">Sky Protocol</td>
                <td className="assets">USDS, sUSDS, DAI, sDAI</td>
                <td className="desc">Overcollateralized stablecoin backed by a diversified basket of onchain crypto collateral and tokenized real-world assets.</td>
                <td className="date">25/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">yzAUSD</td>
                <td className="assets">AUSD, PT-AUSD</td>
                <td className="desc">Vault executing a leveraged AUSD/PT-AUSD farming strategy.</td>
                <td className="date">25/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Curvance</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Lending protocol where users deposit assets, borrow against them, and generate optimized yields through a unified platform.</td>
                <td className="date">25/06/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Morpho</td>
                <td className="assets">Isolated vaults only</td>
                <td className="desc">Isolated-risk lending protocol with immutable market parameters. Deposits only into vaults with identifiable, isolated exposures.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Maple</td>
                <td className="assets">syrupUSDC, syrupUSDT, syrupUSDG</td>
                <td className="desc">Institutional credit marketplace. Syrup tokens earn yield from lending against overcollateralized blue-chip assets.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Euler</td>
                <td className="assets">Isolated vaults only</td>
                <td className="desc">Modular lending protocol built around isolated risk markets with independently parameterized asset pools.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Aave</td>
                <td className="assets">GHO</td>
                <td className="desc">Decentralized lending protocol where yield comes from borrowers paying interest to depositors, risk managed by overcollateralization.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Superstate</td>
                <td className="assets">USCC, USTB</td>
                <td className="desc">USCC: tokenized fund backed by market-neutral basis trades on BTC, ETH, SOL, XRP. USTB: tokenized short-duration US T-Bills.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Securitize</td>
                <td className="assets">BUIDL, VBILL, STAC</td>
                <td className="desc">The leading tokenization platform, bringing real-world assets onchain with over $4B tokenized, backed by BlackRock and Morgan Stanley.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Centrifuge</td>
                <td className="assets">JAAA, JTRSY</td>
                <td className="desc">Ethereum protocol tokenizing real-world assets, enabling onchain finance for asset managers through issuance, liquidity and RWA partnerships.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">WisdomTree</td>
                <td className="assets">WTGXX</td>
                <td className="desc">Global asset manager and ETF innovator with over $150 billion AUM, pioneering tokenized funds like WTGXX.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Global Dollar</td>
                <td className="assets">USDG</td>
                <td className="desc">Regulated, 1:1 USD-pegged stablecoin issued by Paxos Digital Singapore, fully backed and redeemable.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">M0</td>
                <td className="assets">M0</td>
                <td className="desc">Stablecoin infrastructure layer for institutions.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Agora</td>
                <td className="assets">AUSD</td>
                <td className="desc">AUSD, the Agora Dollar, is a fully reserved digital dollar, minted 1:1 with U.S. dollars and other USD-denominated assets.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">PayPal USD</td>
                <td className="assets">PYUSD</td>
                <td className="desc">Regulated fiat-backed stablecoin issued by Paxos, fully backed 1:1 by USD deposits, short-term Treasuries and cash equivalents.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">OpenEden</td>
                <td className="assets">cUSDO, PRISM</td>
                <td className="desc">RWA platform focused on tokenizing U.S. Treasury bills, where yield comes from the underlying T-Bill interest accrual.</td>
                <td className="date">05/05/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= CASH ================= */}
      <section className="wl-panel rv" data-t="cash">
        <div className="wl-table-wrap">
          <table className="wl">
            <thead><tr><th>Protocol</th><th>Primary assets</th><th>Description</th><th>Whitelisted on</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td className="proto">Agora</td>
                <td className="assets">AUSD</td>
                <td className="desc">AUSD, the Agora Dollar, is a fully reserved digital dollar, minted 1:1 with U.S. dollars and other USD-denominated assets.</td>
                <td className="date">14/07/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
              <tr>
                <td className="proto">Curvance</td>
                <td className="assets">Borrow/lend venue</td>
                <td className="desc">Lending protocol where users deposit assets, borrow against them, and generate optimized yields through a unified platform.</td>
                <td className="date">14/07/2026</td>
                <td><span className="st active">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 18 }}>Snapshot of the live whitelist, 16/07/2026. New product whitelists get their own tab as they launch.</p>

      <section className="section rv">
        <div className="section-head">
          <h2>How an asset earns its place</h2>
        </div>
        <div className="rules">
          <div className="card">
            <em>Review</em>
            <b>Full risk framework, no exceptions</b>
            <span>Oracle and price-feed design, smart contract risk, liquidity depth, counterparty and governance risk, and fit with the capital-preservation mandate. Collective sign-off required.</span>
          </div>
          <div className="card">
            <em>Activate</em>
            <b>7 days in the open</b>
            <span>Approved entries sit in &quot;Activating&quot; for a full week before any capital moves. You see the boundary change before the money does.</span>
          </div>
          <div className="card">
            <em>Re-review</em>
            <b>Downgrades happen in public too</b>
            <span>Protocol upgrades, oracle changes or governance incidents trigger a re-review. Entries can be paused or removed entirely, timestamped and visible.</span>
          </div>
        </div>
      </section>

      <WhitelistClient />
    </div>
  );
}
