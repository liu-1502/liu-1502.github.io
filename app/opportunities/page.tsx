import "./styles.css";
import { Rows2, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import OpportunitiesClient from "./OpportunitiesClient";
import { pageMetadata } from "@/lib/pages";

export const metadata = pageMetadata("/opportunities");

export default function Opportunities() {
  return (
    <div className="pg-opportunities">
      <svg className="opp-illus" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Vòng ngoài (đứt nét) */}
        <circle cx="60" cy="46" r="40" strokeDasharray="54 13" />
        {/* Đồng xu + ký hiệu $ */}
        <circle cx="60" cy="46" r="24" />
        <path d="M60 32 V60" />
        <path d="M66 39C66 35 62 34 58.5 34C54 34 51 36.5 51 40C51 43.5 54.5 44.5 60 45.5C65.5 46.5 68 48 68 51.5C68 55 64.5 57 60 57C55.5 57 52 55.5 52 52" />
        {/* Mầm 2 lá + thân + mặt đất */}
        <path d="M60 87C44 87 33 77 35 62C50 65 60 73 60 87Z" />
        <path d="M60 87C76 87 87 77 85 62C70 65 60 73 60 87Z" />
        <path d="M60 108 V75" />
        <path d="M32 108 H88" />
      </svg>
      <div className="opp-head rv">
        <div>
          <h1>Yield opportunities</h1>
          <p>Every live strategy for Yuzu assets across partner protocols: hold, LP, lend, loop. Each position earns its stated APY plus a daily Juice multiplier per dollar deployed.</p>
        </div>
      </div>

      <div className="card opp-table rv">
        <div className="opp-thead">
          <span className="search"><input type="search" id="oppSearch" placeholder="Search opportunities…" aria-label="Search opportunities" /></span>
          <div className="view-toggle" role="group" aria-label="View mode">
            <button type="button" className="on" data-view="list" aria-label="List view">
              <Rows2 />
            </button>
            <button type="button" data-view="card" aria-label="Card view">
              <LayoutGrid />
            </button>
          </div>
        </div>
        <div className="opp-filters">
          <div className="frow" data-fgroup="chain">
            <span className="flbl">Chain</span>
            <button data-v="plasma"><img src="/assets/chains/plasma.svg" alt="" />Plasma</button>
            <button data-v="monad"><img src="/assets/chains/monad.svg" alt="" />Monad</button>
            <button data-v="ethereum"><img src="/assets/chains/ethereum.svg" alt="" />Ethereum</button>
            <button data-v="sei">SEI EVM</button>
          </div>
          <div className="frow" data-fgroup="type">
            <span className="flbl">Activity</span>
            <button data-v="spot">Spot Holdings</button>
            <button data-v="deposit">Deposits</button>
            <button data-v="liquidity">Liquidity</button>
            <button data-v="lending">Lending</button>
            <button data-v="leverage">Leverage</button>
          </div>
        </div>
        <div className="opp-cols">
          <span>Platform / Asset</span>
          <span>Activity</span>
          <button className="num" data-sort="apy">Current APY</button>
          <button className="num" data-sort="tvl">TVL</button>
          <button className="num" data-sort="pts">Points</button>
        </div>
        <div id="oppRows">

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzusd" data-apy="9.10" data-tvl="133840" data-pts="3200">
            <div className="plat"><span className="plat-ic"><span className="pfp">P</span><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Pendle · yzUSD YT 30JUL2026</b><small>Ethereum</small></div></div>
            <div className="act">Hold yzUSD YT 30JUL2026</div>
            <div className="apy">9.10%</div>
            <div className="tvl">$133,840</div>
            <div className="pts"><i></i>3,200</div>
          </div>

          <div className="opp" data-c="plasma" data-t="deposit" data-k="yzusd" data-apy="8.53" data-tvl="1621290" data-pts="1050">
            <div className="plat"><span className="plat-ic"><img className="plat-logo" src="/assets/partners/accountable-fav.png" alt="" /><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Accountable · USDC</b><small>Plasma</small></div></div>
            <div className="act">Deposit into Accountable's Yuzu Money Vault</div>
            <div className="apy">8.53%</div>
            <div className="tvl">$1,621,290</div>
            <div className="pts"><i></i>1,050</div>
          </div>

          <div className="opp" data-c="plasma" data-t="leverage" data-k="syzusd" data-apy="22.65" data-tvl="8785730" data-pts="5400">
            <div className="plat"><span className="plat-ic"><span className="pfp">F</span><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Feather · syzUSD/PYUSD</b><small>Plasma</small></div></div>
            <div className="act">Loop syzUSD against PYUSD</div>
            <div className="apy">22.65%</div>
            <div className="tvl">$8,785,730</div>
            <div className="pts"><i></i>5,400</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="liquidity" data-k="yzusd" data-apy="6.80" data-tvl="2148552" data-pts="8750">
            <div className="plat"><span className="plat-ic"><span className="tk-strip"><img src="/assets/tokens/yzUSD.svg" alt="" /><img src="/assets/tokens/usdt.svg" alt="" /></span><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Curve · yzUSD/USDT</b><small>Ethereum</small></div></div>
            <div className="act">Provide liquidity to the yzUSD/USDT pool</div>
            <div className="apy">6.80%</div>
            <div className="tvl">$2,148,552</div>
            <div className="pts"><i></i>8,750</div>
          </div>

          <div className="opp" data-c="plasma" data-t="lending" data-k="yzusd" data-apy="5.92" data-tvl="1082417" data-pts="2300">
            <div className="plat"><span className="plat-ic"><span className="pfp">E</span><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Euler · yzUSD</b><small>Plasma</small></div></div>
            <div className="act">Lend yzUSD on the Yuzu curated market</div>
            <div className="apy">5.92%</div>
            <div className="tvl">$1,082,417</div>
            <div className="pts"><i></i>2,300</div>
          </div>

          <div className="opp" data-c="sei" data-t="liquidity" data-k="yzusd" data-apy="11.20" data-tvl="384209" data-pts="1900">
            <div className="plat"><span className="plat-ic"><span className="tk-strip"><img src="/assets/tokens/yzUSD.svg" alt="" /><img src="/assets/tokens/usdc.svg" alt="" /></span></span><div><b>DragonSwap · yzUSD/USDC</b><small>SEI EVM</small></div></div>
            <div className="act">Provide liquidity to the yzUSD/USDC pool</div>
            <div className="apy">11.20%</div>
            <div className="tvl">$384,209</div>
            <div className="pts"><i></i>1,900</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="44546673" data-pts="12500">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Yuzu · yzUSD</b><small>Plasma</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$44,546,673</div>
            <div className="pts"><i></i>12,500</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="36960865" data-pts="6800">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/syzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Yuzu · syzUSD</b><small>Plasma</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$36,960,865</div>
            <div className="pts"><i></i>6,800</div>
          </div>

          <div className="opp" data-c="plasma" data-t="spot" data-k="yzpp" data-apy="27.00" data-tvl="3918314" data-pts="4100">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzPP.svg" alt="" /><img className="plat-badge" src="/assets/chains/plasma.svg" alt="" /></span><div><b>Yuzu · yzPP</b><small>Plasma</small></div></div>
            <div className="act">Hold yzPP</div>
            <div className="apy">27.00%</div>
            <div className="tvl">$3,918,314</div>
            <div className="pts"><i></i>4,100</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="0.1" data-pts="1200">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Yuzu · yzUSD</b><small>Ethereum</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$0.10</div>
            <div className="pts"><i></i>1,200</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="1677689" data-pts="2700">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/syzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Yuzu · syzUSD</b><small>Ethereum</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$1,677,689</div>
            <div className="pts"><i></i>2,700</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzpp" data-apy="27.00" data-tvl="0.126" data-pts="3600">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzPP.svg" alt="" /><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Yuzu · yzPP</b><small>Ethereum</small></div></div>
            <div className="act">Hold yzPP</div>
            <div className="apy">27.00%</div>
            <div className="tvl">$0.13</div>
            <div className="pts"><i></i>3,600</div>
          </div>

          <div className="opp" data-c="ethereum" data-t="spot" data-k="yzprime" data-apy="7.00" data-tvl="6214880" data-pts="9400">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzPrime.svg" alt="" /><img className="plat-badge" src="/assets/chains/ethereum.svg" alt="" /></span><div><b>Yuzu · yzPRIME</b><small>Ethereum · Gated</small></div></div>
            <div className="act">Hold yzPRIME</div>
            <div className="apy">7.00%</div>
            <div className="tvl">$6,214,880</div>
            <div className="pts"><i></i>9,400</div>
          </div>

          <div className="opp" data-c="monad" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="23.772" data-pts="1500">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/monad.svg" alt="" /></span><div><b>Yuzu · yzUSD</b><small>Monad</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$23.77</div>
            <div className="pts"><i></i>1,500</div>
          </div>

          <div className="opp" data-c="monad" data-t="spot" data-k="syzusd" data-apy="7.75" data-tvl="412096" data-pts="2050">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/syzUSD.svg" alt="" /><img className="plat-badge" src="/assets/chains/monad.svg" alt="" /></span><div><b>Yuzu · syzUSD</b><small>Monad</small></div></div>
            <div className="act">Hold syzUSD</div>
            <div className="apy">7.75%</div>
            <div className="tvl">$412,096</div>
            <div className="pts"><i></i>2,050</div>
          </div>

          <div className="opp" data-c="sei" data-t="spot" data-k="yzusd" data-apy="0" data-tvl="158441" data-pts="1800">
            <div className="plat"><span className="plat-ic"><img src="/assets/tokens/yzUSD.svg" alt="" /></span><div><b>Yuzu · yzUSD</b><small>SEI EVM</small></div></div>
            <div className="act">Hold yzUSD</div>
            <div className="apy zero">0.00%</div>
            <div className="tvl">$158,441</div>
            <div className="pts"><i></i>1,800</div>
          </div>

        </div>
        <div className="opp-empty" id="oppEmpty">No opportunities match these filters.</div>

        <div className="opp-foot">
          <span className="opp-count">Showing 20 of 316 results</span>
          <nav className="opp-pager" aria-label="Pagination">
            <button type="button" className="pg-nav" disabled><ChevronLeft />Previous</button>
            <button type="button" className="pg-num on" aria-current="page">1</button>
            <button type="button" className="pg-num">2</button>
            <button type="button" className="pg-num">3</button>
            <span className="pg-dots">…</span>
            <button type="button" className="pg-num">20</button>
            <button type="button" className="pg-nav">Next<ChevronRight /></button>
          </nav>
        </div>

        <p className="opp-disclaimer"><b>Disclaimer:</b> Opportunities shown here are offered by third-party platforms and may involve additional risks, including but not limited to smart contract, leverage, and liquidity risk. These platforms are not operated or controlled by Yuzu Money, which does not endorse or guarantee their safety or performance. Users should conduct their own research and proceed at their own discretion.</p>
      </div>

      <OpportunitiesClient />
    </div>
  );
}
