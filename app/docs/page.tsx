import Link from "next/link";
import "./styles.css";
import DocsClient from "./DocsClient";

export default function Docs() {
  return (
    <div className="pg-docs">
      <div className="docs-layout">

        <nav className="docs-nav" aria-label="Documentation">
          <div>
            <h6>Start here</h6>
            <ul>
              <li><a href="#overview" className="on">What is Yuzu Money</a></li>
            </ul>
          </div>
          <div>
            <h6>Yuzu Alpha</h6>
            <ul>
              <li><a href="#yzusd">yzUSD</a></li>
              <li><a href="#syzusd">syzUSD, staking</a></li>
              <li><a href="#yzpp">yzPP, first loss</a></li>
              <li><a href="#epochs">Weekly epochs</a></li>
              <li><a href="#reserve">Reserve Fund</a></li>
            </ul>
          </div>
          <div>
            <h6>Yuzu Prime</h6>
            <ul>
              <li><a href="#prime">yzPrime</a></li>
              <li><a href="#eligibility">Eligibility</a></li>
            </ul>
          </div>
          <div>
            <h6>Marketplace</h6>
            <ul>
              <li><a href="#marketplace">Curated vaults</a></li>
            </ul>
          </div>
          <div>
            <h6>Protocol</h6>
            <ul>
              <li><a href="#access">Access &amp; KYC</a></li>
              <li><a href="#strategies">Underlying strategies</a></li>
              <li><a href="#oracles">Oracles</a></li>
              <li><a href="#liquidity">Liquidity buffer</a></li>
              <li><a href="#security">Security stack</a></li>
              <li><a href="#addresses">Key addresses</a></li>
              <li><a href="#audits">Audits</a></li>
            </ul>
          </div>
        </nav>

        <article className="doc">

          <section id="overview">
            <h2>What is Yuzu Money</h2>
            <p>Yuzu Money offers <strong>risk-curated, onchain strategies</strong> packaged as structured yield products, suitable for different investor risk profiles. The investment philosophy puts capital preservation first, with risk coverage across smart contracts, wallet infrastructure and the strategies themselves.</p>
            <p>The protocol runs three distinct products on one shared security stack:</p>
            <ul className="list">
              <li><strong>Yuzu Alpha</strong>: an overcollateralized, yield-bearing stablecoin system (yzUSD, syzUSD, yzPP) with senior and junior tranches.</li>
              <li><strong>Yuzu Prime</strong>: enhanced institutional-grade fixed income on tokenized traditional finance assets, for Eligible Investors.</li>
              <li><strong>Yuzu Marketplace</strong>: a curated, permissionless venue of hand-picked vault strategies across chains.</li>
            </ul>
          </section>

          <section id="yzusd">
            <h2>yzUSD</h2>
            <p>yzUSD is an overcollateralized, stable-value token targeting <strong>US$1</strong>. In base form it does not bear yield. Collateral lives entirely onchain, and a proof-of-reserves feed verifies that every yzUSD is backed by more than one dollar of eligible assets.</p>
            <h3>Mint and redeem</h3>
            <p>Primary mint and redeem happens 1:1 against USDT0, restricted to Eligible Investors after KYC and screening. Once in circulation, yzUSD trades freely on secondary markets like Curve and Pendle, where anyone can acquire it without KYC.</p>
            <div className="callout">The Collateral Pool receives all inflows, then deploys into curated DeFi strategies under the public asset whitelist mandate.</div>
          </section>

          <section id="syzusd">
            <h2>syzUSD, staked yzUSD</h2>
            <p>Staking converts yzUSD into <strong>syzUSD</strong>, a liquid ERC-4626 vault token built for DeFi composability. Yield accrues to the syzUSD exchange rate; the wrapper itself confers no rights beyond representing the staked position.</p>
            <p>Unstaking back to yzUSD is a single step and completes near instantly.</p>
          </section>

          <section id="yzpp">
            <h2>yzPP, the junior tranche</h2>
            <p>yzPP is Alpha's <strong>first-loss tranche</strong>. Depositors accept priority exposure to losses on the underlying strategies in exchange for a higher target yield. yzPP sits inside the backing pool alongside yzUSD, strengthening the overall collateralization ratio.</p>
            <h3>Reward mechanism</h3>
            <p>yzPP earns the syzUSD base yield plus an additional protocol-funded budget, sized by a fixed <strong>15% risk premium</strong> policy. At a 110% collateral ratio, yzPP yield is estimated above 200% of syzUSD's.</p>
            <h3>How first loss works</h3>
            <p>Take a pool worth $110 backing 100 yzUSD (110% ratio) with $10 of yzPP. A $5 loss is absorbed by yzPP, which falls to $5. The pool stays at $105, the ratio stays above 100%, and yzUSD keeps redeeming at par. Without yzPP, that same loss would leave every yzUSD backed by only $0.95.</p>
            <h3>Redemption conditions</h3>
            <ul className="list">
              <li>Redeemable at any time, subject to a <strong>30-day redemption period</strong>. Yield keeps accruing during the window.</li>
              <li>Minimum order size: <strong>5,000 yzPP</strong>.</li>
              <li>Pending orders can be cancelled 24 hours after the request and resubmitted; only the most recent order is fulfilled.</li>
              <li>If the Collateral Pool takes a loss, all yzPP minting and redemptions pause until a full assessment completes.</li>
            </ul>
          </section>

          <section id="epochs">
            <h2>Weekly epochs</h2>
            <p>Every Friday at 04:00 UTC, the protocol announces a <strong>weekly target yield</strong> and the corresponding dollar amount to distribute, calculated on TVL at epoch start. This gives holders a stable, predictable yield profile.</p>
            <p>Because the dollar amount is fixed, realized APY moves opposite to TVL during the week: shrinking TVL pushes realized APY above target, growing TVL pushes it below.</p>
          </section>

          <section id="reserve">
            <h2>Reserve Fund</h2>
            <p>The Reserve Fund is Alpha's balance-sheet buffer and treasury. Surplus weeks (realized P&amp;L above distributed yield) grow it; deficit weeks draw from it. Its uses include value accrual to the governance token, operating costs, ecosystem growth, and absorbing losses beyond yzPP's first-loss protection.</p>
            <p>A <strong>Liquidity Buffer</strong> of up to 5% of backing assets maintains onchain liquidity for yzUSD, syzUSD and yzPP across Curve, Balancer V3, Pendle and Uniswap V3 pools.</p>
          </section>

          <section id="prime">
            <h2>Yuzu Prime, yzPrime</h2>
            <p>yzPrime targets returns above SOFR and T-Bill rates through leveraged strategies on a basket of institutional-grade tokenized assets:</p>
            <ul className="list">
              <li>U.S. Treasury Bills, tokenized by leading asset managers.</li>
              <li>A-grade investment credit: AAA-rated CLOs with zero principal loss in their 30+ year history.</li>
              <li>Overcollateralized lending via Maple Finance, to recourse, KYC'd institutional borrowers.</li>
            </ul>
            <p>Unlike Alpha, yield distribution is <strong>continuous</strong>: no weekly epochs. Eligible Investors mint and redeem yzPrime for USDC at prevailing NAV.</p>
          </section>

          <section id="eligibility">
            <h2>Eligibility</h2>
            <p>Primary minting and redeeming of yzUSD, yzPP and yzPrime are restricted to <strong>Accredited, Qualified, Institutional or Sophisticated Investors</strong>, based on country of residence or incorporation. Access requires KYC or KYB, sanctions screening, AML/CFT checks and Source-of-Funds verification, plus a signed declaration of status.</p>
            <p>Yuzu Money may decline, pause or revoke access at any time to remain compliant. Retail users are not eligible for primary flows, but may hold and trade the tokens on secondary markets that choose to list them.</p>
          </section>

          <section id="marketplace">
            <h2>Yuzu Marketplace</h2>
            <p>The Marketplace is a curated venue of vault strategies spanning multiple chains and assets. Every vault is sourced, diligenced and structured by the Yuzu team, with the research published before listing.</p>
            <ul className="list">
              <li><strong>Permissionless</strong>: no gating or eligibility screening to deposit or withdraw. You interact with the vault contract from your own wallet.</li>
              <li><strong>Priority access</strong>: yzUSD and yzPrime holders get whitelisting and early subscription windows on capacity-constrained vaults.</li>
              <li><strong>Per-vault liquidity</strong>: many vaults redeem continuously; structured-credit vaults run fixed subscription and redemption cycles, shown on each vault page.</li>
            </ul>
          </section>

          <section id="access">
            <h2>Access and KYC, at a glance</h2>
            <p>Only primary mint and redeem flows are gated. Everything downstream of a token already in circulation is open.</p>
            <div className="doc-table-wrap">
              <table className="doc-t">
                <thead><tr><th>Action</th><th>KYC required</th><th>Who</th></tr></thead>
                <tbody>
                  <tr><td><b>Stake / unstake syzUSD</b></td><td style={{ color: "var(--good)" }}>No</td><td>Anyone holding yzUSD</td></tr>
                  <tr><td><b>Buy yzUSD, syzUSD or yzPP on DEXs</b></td><td style={{ color: "var(--good)" }}>No</td><td>Anyone, secondary markets</td></tr>
                  <tr><td><b>Marketplace: deposit / withdraw yzCash, yzSyrup</b></td><td style={{ color: "var(--good)" }}>No</td><td>Anyone, 100% public</td></tr>
                  <tr><td><b>Mint / redeem yzUSD (primary)</b></td><td style={{ color: "var(--prime)" }}>Yes</td><td>Eligible Investors</td></tr>
                  <tr><td><b>Mint / redeem yzPP (primary)</b></td><td style={{ color: "var(--prime)" }}>Yes</td><td>Eligible Investors</td></tr>
                  <tr><td><b>Mint / redeem yzPrime</b></td><td style={{ color: "var(--prime)" }}>Yes</td><td>Eligible Investors</td></tr>
                </tbody>
              </table>
            </div>
            <div className="callout">Practical consequence: a retail user can hold and earn with every Yuzu token by acquiring it on secondary markets or staking, without ever touching a gated flow.</div>
          </section>

          <section id="strategies">
            <h2>Underlying strategies</h2>
            <p>All strategies are 100% onchain and verifiable, bound by the <Link href="/whitelist" style={{ color: "var(--citrus)" }}>asset whitelist</Link>, and prioritize capital preservation over yield.</p>
            <div className="doc-table-wrap">
              <table className="doc-t">
                <thead><tr><th>Strategy bucket</th><th>Alpha</th><th>Prime</th></tr></thead>
                <tbody>
                  <tr><td><b>Tokenized U.S. T-Bills</b></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td><b>AAA CLOs</b></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td><b>Overcollateralized lending</b></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td><b>Funding-rate arbitrage</b></td><td>Yes</td><td>No</td></tr>
                  <tr><td><b>Leveraged positions</b></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td><b>Cross-chain stablecoin arbitrage</b></td><td>Yes</td><td>No</td></tr>
                </tbody>
              </table>
            </div>
            <p>Pricing relies on RedStone as primary oracle provider, alongside Chainlink and Pyth feeds. Leveraged positions use fundamental or hardcoded oracles, eliminating market-driven liquidation risk.</p>
          </section>

          <section id="oracles">
            <h2>Oracles</h2>
            <p>Accurate pricing is fundamental to every strategy, so Yuzu uses <strong>RedStone</strong> as its primary data provider, alongside Chainlink and Pyth feeds. Yuzu's own assets are priced by dedicated feeds:</p>
            <div className="doc-table-wrap">
              <table className="doc-t">
                <thead><tr><th>Asset</th><th>Feed</th><th>Chains</th></tr></thead>
                <tbody>
                  <tr><td><b>yzUSD</b></td><td>RedStone Fundamental · Chainlink yzUSD/USD</td><td>Plasma, Monad</td></tr>
                  <tr><td><b>syzUSD</b></td><td>RedStone Fundamental + syzUSD/USD · Chainlink syzUSD/yzUSD</td><td>Plasma, Monad, Ethereum, HyperEVM, Sei</td></tr>
                  <tr><td><b>yzPP</b></td><td>Chainlink yzPP/USDT0 exchange rate</td><td>Plasma, Monad</td></tr>
                </tbody>
              </table>
            </div>
            <p>Leveraged positions use fundamental or hardcoded oracles for price marking, eliminating market-driven liquidation risk.</p>
          </section>

          <section id="liquidity">
            <h2>Liquidity buffer</h2>
            <p>Up to <strong>5% of total backing assets</strong> maintains onchain liquidity for Alpha tokens across key pools, so entering and exiting on secondary markets stays cheap:</p>
            <div className="doc-table-wrap">
              <table className="doc-t">
                <thead><tr><th>Pool</th><th>Venue</th><th>Chain</th></tr></thead>
                <tbody>
                  <tr><td><b>yzUSD / USDT0</b></td><td>Curve</td><td>Plasma</td></tr>
                  <tr><td><b>yzPP / USDT0</b></td><td>Curve</td><td>Plasma</td></tr>
                  <tr><td><b>syzUSD / USDT0</b></td><td>Balancer V3</td><td>Plasma</td></tr>
                  <tr><td><b>syzUSD / wnAUSD</b></td><td>Balancer V3</td><td>Monad</td></tr>
                  <tr><td><b>yzUSD, syzUSD 30JUL2026</b></td><td>Pendle</td><td>Plasma</td></tr>
                  <tr><td><b>syzUSD / PYUSD0</b></td><td>Uniswap V3</td><td>SeiEVM</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="security">
            <h2>Security stack</h2>
            <h3>Accountable, proof of reserves</h3>
            <p>An independent verification network attests to protocol assets and key metrics in near real time. Data is processed inside secure enclaves and verified via zkTLS and zero-knowledge proofs before publication. See the <Link href="/transparency" style={{ color: "var(--citrus)" }}>transparency page</Link>.</p>
            <h3>Hypernative + Sentinel, threat response</h3>
            <p>Hypernative monitors threats across 70+ chains, catching attack patterns in the mempool before block inclusion, with a 99.5% detection rate. On top of it, Yuzu built <strong>Sentinel</strong>: when a threat is confirmed, pre-authorized withdrawal transactions execute automatically through the Fordefi wallet, moving funds to safety in seconds.</p>
            <h3>Fordefi, MPC wallet infrastructure</h3>
            <p>All protocol funds sit behind multi-party computation key management: no single point of failure, whitelisted destinations, per-strategy transaction policies, full audit trail. SOC 2 Type II certified, insured through Munich Re.</p>
            <h3>Chainlink CCIP, cross-chain transfers</h3>
            <p>syzUSD and yzPrime move across chains under the Cross-Chain Token standard. Yuzu owns its token pools and per-lane rate limits; transfers are burn-and-mint with zero slippage and no pooled liquidity to defend. See the <Link href="/bridge" style={{ color: "var(--citrus)" }}>bridge</Link>.</p>
          </section>

          <section id="addresses">
            <h2>Key addresses</h2>
            <div className="doc-table-wrap">
              <table className="doc-t">
                <thead><tr><th>Token</th><th>Chain</th><th>Address</th></tr></thead>
                <tbody>
                  <tr><td><b>yzUSD</b></td><td>Plasma</td><td className="mono">0x6695c0f8706C5ACe3Bdf8995073179cCA47926dc</td></tr>
                  <tr><td><b>syzUSD</b></td><td>Plasma</td><td className="mono">0xC8A8DF9B210243c55D31c73090F06787aD0A1Bf6</td></tr>
                  <tr><td><b>yzPP</b></td><td>Plasma</td><td className="mono">0xEbFC8C2Fe73C431Ef2A371AeA9132110aaB50DCa</td></tr>
                  <tr><td><b>syzUSD (OFT)</b></td><td>Monad</td><td className="mono">0x484be0540aD49f351eaa04eeB35dF0f937D4E73f</td></tr>
                  <tr><td><b>syzUSD (OFT)</b></td><td>Ethereum</td><td className="mono">0x6DFF69eb720986E98Bb3E8b26cb9E02Ec1a35D12</td></tr>
                  <tr><td><b>syzUSD (OFT)</b></td><td>HyperEVM</td><td className="mono">0x34C07f50c4f55B322E85DEeb265d278E6af112E4</td></tr>
                  <tr><td><b>syzUSD (OFT)</b></td><td>SeiEVM</td><td className="mono">0xB98b14d316d13f012d52f30A3d46641092AC6944</td></tr>
                  <tr><td><b>syzUSD (OFT)</b></td><td>Pharos</td><td className="mono">0x54df79d8edf36d15cd83fbedbdd90807fc828934</td></tr>
                  <tr><td><b>yzPrime / yzSyrup</b></td><td>Monad</td><td className="mono">0xc9ea90692757831d98Ac629F2A0140E02b80A7DA</td></tr>
                </tbody>
              </table>
            </div>
            <p>NAV wallets, liquidity pools and the full address book are listed on the <Link href="/transparency" style={{ color: "var(--citrus)" }}>transparency page</Link> and verified through Accountable.</p>
          </section>

          <section id="audits">
            <h2>Audits</h2>
            <p>Security comes first: Yuzu works only with established auditors, and every contract in the product suite ships after independent review. Audit reports are published in the research library as they complete.</p>
            <div className="callout">Found something? Responsible disclosures are rewarded. Reach the team through the contact channels in the footer before publishing.</div>
          </section>

        </article>

      </div>
      <DocsClient />
    </div>
  );
}
