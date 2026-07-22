import "./styles.css";
import OpportunitiesClient from "./OpportunitiesClient";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("/opportunities");

export default function Opportunities() {
  return (
    <div className="pg-opportunities">
      <div className="opp-head rv">
        <div>
          <h1>Yield opportunities</h1>
          <p>Every live strategy for Yuzu assets across partner protocols: hold, LP, lend, loop. Each position earns its stated APY plus a daily Juice multiplier per dollar deployed.</p>
        </div>
        <span className="chip accent">JUICE ON EVERY ROW</span>
      </div>

      <div className="page-stats rv">
        <div><div className="k">Live opportunities</div><div className="v">16</div></div>
        <div><div className="k">Chains</div><div className="v">4</div></div>
        <div><div className="k">Combined TVL</div><div className="v" data-count="108.1" data-dec="1" data-prefix="$" data-suffix="M">$0</div></div>
        <div><div className="k">Top APY</div><div className="v" style={{ color: "var(--accent)" }}>27.00%</div></div>
      </div>

      <div className="opp-filters rv">
        <div className="frow" data-fgroup="chain">
          <span className="flbl">Chain</span>
          <button className="on" data-v="all">All</button>
          <button data-v="plasma"><img src="/assets/chains/plasma.svg" alt="" />Plasma</button>
          <button data-v="monad"><img src="/assets/chains/monad.svg" alt="" />Monad</button>
          <button data-v="ethereum"><img src="/assets/chains/ethereum.svg" alt="" />Ethereum</button>
          <button data-v="sei">SEI EVM</button>
          <span className="search"><input type="search" id="oppSearch" placeholder="Search…" aria-label="Search opportunities" /></span>
        </div>
        <div className="frow" data-fgroup="type">
          <span className="flbl">Activity</span>
          <button className="on" data-v="all">All</button>
          <button data-v="spot">Spot Holdings</button>
          <button data-v="deposit">Deposits</button>
          <button data-v="liquidity">Liquidity</button>
          <button data-v="lending">Lending</button>
          <button data-v="leverage">Leverage</button>
        </div>
        <div className="frow" data-fgroup="token">
          <span className="flbl">Token</span>
          <button className="on" data-v="all">All</button>
          <button data-v="yzusd"><img src="/assets/tokens/yzUSD.svg" alt="" />yzUSD</button>
          <button data-v="syzusd"><img src="/assets/tokens/syzUSD.svg" alt="" />syzUSD</button>
          <button data-v="yzpp"><img src="/assets/tokens/yzPP.svg" alt="" />yzPP</button>
          <button data-v="yzprime"><img src="/assets/tokens/yzPrime.svg" alt="" />yzPRIME</button>
        </div>
      </div>

      <div className="card opp-table rv">
        <div className="opp-cols">
          <span>Platform / Asset</span>
          <span>Activity</span>
          <button className="num" data-sort="apy">Current APY</button>
          <button className="num" data-sort="tvl">TVL</button>
          <button className="num" data-sort="pts">Points</button>
        </div>
        <div id="oppRows">

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzusd" data-apy="9.10" data-tvl="133840" data-pts="10">
            <div className="plat"><span className="pfp">P</span><div><b>Pendle · yzUSD YT 30JUL2026</b><small><img src="/assets/chains/ethereum.svg" alt="" />Pendle · Ethereum</small></div></div>
            <div className="act">Hold yzUSD YT 30JUL2026</div>
            <div className="apy">9.10%</div>
            <div className="tvl">$133,840</div>
            <div className="pts"><i></i>10</div>
          </div>

          <div className="opp" data-c="plasma" data-t="deposit" data-k="yzusd" data-apy="8.53" data-tvl="1621290" data-pts="3">
            <div className="plat"><span className="pfp">A</span><div><b>Accountable · USDC</b><small><img src="/assets/chains/plasma.svg" alt="" />Accountable · Plasma</small></div></div>
            <div className="act">Deposit into Accountable's Yuzu Money Vault</div>
            <div className="apy">8.53%</div>
            <div className="tvl">$1,621,290</div>
            <div className="pts"><i></i>3</div>
          </div>

          <div className="opp" data-c="plasma" data-t="leverage" data-k="syzusd" data-apy="22.65" data-tvl="8785730" data-pts="1">
            <div className="plat"><span className="pfp">F</span><div><b>Feather · syzUSD/PYUSD</b><small><img src="/assets/chains/plasma.svg" alt="" />Feather · Plasma</small></div></div>
            <div className="act">Loop syzUSD against PYUSD</div>
            <div className="apy">22.65%</div>
            <div className="tvl">$8,785,730</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="liquidity" data-k="yzusd" data-apy="6.80" data-tvl="2148552" data-pts="12">
            <div className="plat"><span className="tk-strip"><img src="/assets/tokens/yzUSD.svg" alt="" /><img src="/assets/tokens/usdt.svg" alt="" /></span><div><b>Curve · yzUSD/USDT</b><small><img src="/assets/chains/ethereum.svg" alt="" />Curve · Ethereum</small></div></div>
            <div className="act">Provide liquidity to the yzUSD/USDT pool</div>
            <div className="apy">6.80%</div>
            <div className="tvl">$2,148,552</div>
            <div className="pts"><i></i>12</div>
          </div>

          <div className="opp" data-c="plasma" data-t="lending" data-k="yzusd" data-apy="5.92" data-tvl="1082417" data-pts="6">
            <div className="plat"><span className="pfp">E</span><div><b>Euler · yzUSD</b><small><img src="/assets/chains/plasma.svg" alt="" />Euler · Plasma</small></div></div>
            <div className="act">Lend yzUSD on the Yuzu curated market</div>
            <div className="apy">5.92%</div>
            <div className="tvl">$1,082,417</div>
            <div className="pts"><i></i>6</div>
          </div>

          <div className="opp" data-c="sei" data-t="liquidity" data-k="yzusd" data-apy="11.20" data-tvl="384209" data-pts="9">
            <div className="plat"><span className="tk-strip"><img src="/assets/tokens/yzUSD.svg" alt="" /><img src="/assets/tokens/usdc.svg" alt="" /></span><div><b>DragonSwap · yzUSD/USDC</b><small>DragonSwap · SEI EVM</small></div></div>
            <div className="act">Provide liquidity to the yzUSD/USDC pool</div>
            <div className="apy">11.20%</div>
            <div className="tvl">$384,209</div>
            <div className="pts"><i></i>9</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="44546673" data-pts="8">
            <div className="plat"><img src="/assets/tokens/yzUSD.svg" alt="" /><div><b>Yuzu · yzUSD</b><small><img src="/assets/chains/plasma.svg" alt="" />Yuzu · Plasma</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$44,546,673</div>
            <div className="pts"><i></i>8</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="36960865" data-pts="1">
            <div className="plat"><img src="/assets/tokens/syzUSD.svg" alt="" /><div><b>Yuzu · syzUSD</b><small><img src="/assets/chains/plasma.svg" alt="" />Yuzu · Plasma</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$36,960,865</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="yzpp" data-apy="27.00" data-tvl="3918314" data-pts="1">
            <div className="plat"><img src="/assets/tokens/yzPP.svg" alt="" /><div><b>Yuzu · yzPP</b><small><img src="/assets/chains/plasma.svg" alt="" />Yuzu · Plasma</small></div></div>
            <div className="act">Hold yzPP</div>
            <div className="apy">27.00%</div>
            <div className="tvl">$3,918,314</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="0.1" data-pts="8">
            <div className="plat"><img src="/assets/tokens/yzUSD.svg" alt="" /><div><b>Yuzu · yzUSD</b><small><img src="/assets/chains/ethereum.svg" alt="" />Yuzu · Ethereum</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$0.10</div>
            <div className="pts"><i></i>8</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="1677689" data-pts="1">
            <div className="plat"><img src="/assets/tokens/syzUSD.svg" alt="" /><div><b>Yuzu · syzUSD</b><small><img src="/assets/chains/ethereum.svg" alt="" />Yuzu · Ethereum</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$1,677,689</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzpp" data-apy="27.00" data-tvl="0.126" data-pts="1">
            <div className="plat"><img src="/assets/tokens/yzPP.svg" alt="" /><div><b>Yuzu · yzPP</b><small><img src="/assets/chains/ethereum.svg" alt="" />Yuzu · Ethereum</small></div></div>
            <div className="act">Hold yzPP</div>
            <div className="apy">27.00%</div>
            <div className="tvl">$0.13</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzprime" data-apy="7.00" data-tvl="6214880" data-pts="4">
            <div className="plat"><img src="/assets/tokens/yzPrime.svg" alt="" /><div><b>Yuzu · yzPRIME</b><small><img src="/assets/chains/ethereum.svg" alt="" />Yuzu · Ethereum · Gated</small></div></div>
            <div className="act">Hold yzPRIME</div>
            <div className="apy">7.00%</div>
            <div className="tvl">$6,214,880</div>
            <div className="pts"><i></i>4</div>
          </div>

          <div className="opp" data-c="monad" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="23.772" data-pts="8">
            <div className="plat"><img src="/assets/tokens/yzUSD.svg" alt="" /><div><b>Yuzu · yzUSD</b><small><img src="/assets/chains/monad.svg" alt="" />Yuzu · Monad</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$23.77</div>
            <div className="pts"><i></i>8</div>
          </div>

          <div className="opp" data-c="monad" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="412096" data-pts="1">
            <div className="plat"><img src="/assets/tokens/syzUSD.svg" alt="" /><div><b>Yuzu · syzUSD</b><small><img src="/assets/chains/monad.svg" alt="" />Yuzu · Monad</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$412,096</div>
            <div className="pts"><i></i>1</div>
          </div>

          <div className="opp" data-c="sei" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="158441" data-pts="8">
            <div className="plat"><img src="/assets/tokens/yzUSD.svg" alt="" /><div><b>Yuzu · yzUSD</b><small>Yuzu · SEI EVM</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$158,441</div>
            <div className="pts"><i></i>8</div>
          </div>

        </div>
        <div className="opp-empty" id="oppEmpty">No opportunities match these filters.</div>
      </div>

      <p className="opp-note">Points shown are Juice multipliers per dollar per day. New integrations are announced on Telegram before they go live. APY is variable and set by each venue.</p>

      <OpportunitiesClient />
    </div>
  );
}
