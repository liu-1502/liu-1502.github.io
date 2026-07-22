"use client";

import { useEffect } from "react";
import { watchVisible } from "@/lib/watchVisible";

export default function TransparencyClient() {
  useEffect(() => {
    /* ============ Verified snapshot from cache.accountable.capital/dashboard/yuzu, 2026-07-16 05:03 UTC ============ */

    /* Alpha strategy positions (exposure_split), USD */
    const ALPHA_SPLIT: [string, string, number][] = [
      ["Ethena USDe Loop", "Funding-rate carry, leveraged", 9872982],
      ["Ethena sUSDe Loop", "Staked USDe, leveraged", 9340391],
      ["Maple syrupUSDT Loop", "Institutional lending, leveraged", 7111549],
      ["Maple syrupUSDC Loop", "Institutional lending, leveraged", 6214739],
      ["Superstate USTB Loop", "Tokenized T-Bills, leveraged", 3764113],
      ["Yuzu yzPrime", "Internal allocation to Prime", 3030078],
      ["Sky USDS", "Overcollateralized stablecoin", 2182835],
      ["Agora PT-AUSD", "Pendle principal token", 2079366],
      ["Aave USDC", "Money market lending", 1500120],
      ["Liquidity Buffer", "Curve, Balancer, Pendle pools", 1250182],
      ["Agora PT-AUSD Loop", "PT-AUSD, leveraged", 624220],
      ["Maple syrupUSDG Loop", "Institutional lending, leveraged", 620490],
      ["Aave USDT", "Money market lending", 500141],
      ["Rest of assets", "Small and transitional positions", 166360],
      ["Securitize VBILL Loop", "Tokenized T-Bills, leveraged", 124441],
      ["Aave AUSD", "Money market lending", 69995],
      ["PayPal PYUSD Loop", "Stablecoin carry, leveraged", 60087]
    ];

    /* Prime strategy positions (exposure_split_rwa), USD */
    const PRIME_SPLIT: [string, string, number][] = [
      ["Sky USDS", "Overcollateralized stablecoin", 2299575],
      ["Maple syrupUSDT Loop", "Institutional lending, leveraged", 1074519],
      ["Superstate USTB Loop", "Tokenized T-Bills, leveraged", 1011969],
      ["Centrifuge deJAAA Loop", "AAA CLOs, leveraged", 223189],
      ["Centrifuge JAAA Loop", "AAA CLOs, leveraged", 83087],
      ["Other and in transit", "Settlement and rebalancing", 1466741]
    ];

    /* Backing by chain (reserves_split), USD */
    const ALPHA_CHAINS: [string, number][] = [
      ["Ethereum", 16211220], ["Monad", 8341128], ["Plasma", 7572957],
      ["Hood", 6057082], ["Mantle", 4665139], ["Base", 3828835],
      ["Solana", 2494774], ["Sei", 198234], ["Other chains", 5787]
    ];
    const PRIME_CHAINS: [string, number][] = [
      ["Ethereum", 3658351], ["Monad", 1324403], ["Plasma", 680572],
      ["Mantle", 272662], ["Base", 223092]
    ];

    /* Timeline (downsampled from 275 verified points): [date, reserves, supply, ratio, syzUSD APY] */
    const SERIES: [string, number, number, number, number][] = [
    ["2025-10-15",16868207,15896242,1.06,16],["2025-10-20",21950656,20982902,1.05,16],["2025-10-25",25208145,24243877,1.04,14],
    ["2025-10-30",25899135,24957598,1.04,14],["2025-11-04",27157092,26267215,1.03,14],["2025-11-09",21572329,20761187,1.04,12],
    ["2025-11-14",17395963,16572771,1.05,12],["2025-11-19",18139116,17327398,1.05,12],["2025-11-24",17928454,17079129,1.05,12],
    ["2025-11-29",17988091,17107478,1.05,12.5],["2025-12-04",18505342,17141758,1.08,13],["2025-12-09",20155599,18792036,1.07,13],
    ["2025-12-14",21711264,20487847,1.06,13],["2025-12-19",29759203,28353702,1.05,13],["2025-12-24",32968787,31617675,1.04,12],
    ["2025-12-29",41092154,39651318,1.04,12],["2026-01-03",41693892,40227126,1.04,11],["2026-01-08",45252036,43007707,1.05,11],
    ["2026-01-13",50396348,46500679,1.08,11],["2026-01-18",58007382,55917087,1.04,11],["2026-01-23",62234173,59211469,1.05,11],
    ["2026-01-28",62203590,59148995,1.05,11],["2026-02-02",66524352,62936379,1.06,11],["2026-02-07",66847042,63174006,1.06,10.5],
    ["2026-02-12",59932565,57414460,1.04,8],["2026-02-17",62858359,58974694,1.07,7],["2026-02-22",58835670,54870174,1.07,7.5],
    ["2026-02-27",61825975,57818168,1.07,7.5],["2026-03-04",66166722,62191868,1.06,7.5],["2026-03-09",67687098,63581764,1.06,7.5],
    ["2026-03-14",66154431,63223205,1.05,8],["2026-03-19",68958354,65833981,1.05,8],["2026-03-24",64553663,61425449,1.05,7],
    ["2026-03-29",61974818,58810405,1.05,7.5],["2026-04-03",68463319,66297400,1.03,7.5],["2026-04-08",70209806,66923686,1.05,7.5],
    ["2026-04-13",66505107,63191352,1.05,7],["2026-04-18",66007504,61484415,1.07,7],["2026-04-23",65835941,61484415,1.07,7],
    ["2026-04-28",65839620,61484415,1.07,7],["2026-05-03",41687060,37867541,1.10,7],["2026-05-08",41268834,37988984,1.09,7.5],
    ["2026-05-13",46615607,42686998,1.09,7.5],["2026-05-18",46028520,42522630,1.08,8],["2026-05-23",44864438,42497167,1.06,8],
    ["2026-05-28",44234420,41613721,1.06,8],["2026-06-02",43696935,41333058,1.06,8],["2026-06-07",42980724,40047213,1.07,8],
    ["2026-06-12",41997576,39239700,1.07,7.5],["2026-06-17",42090568,39181390,1.07,7.5],["2026-06-22",46998227,44357542,1.06,7.5],
    ["2026-06-27",47747787,44686154,1.07,7.5],["2026-07-02",48579562,45470619,1.07,7.5],["2026-07-07",49356433,44661772,1.11,7.5],
    ["2026-07-12",50599439,45758169,1.11,7.75],["2026-07-15",49375157,44554443,1.11,7.75]
    ];

    const css = getComputedStyle(document.documentElement);
    function col(v: string) { return css.getPropertyValue(v).trim(); }
    function usd(n: number) {
      if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
      if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
      return "$" + Math.round(n);
    }

    /* ---- split tables with bars ---- */
    function renderSplit(id: string, rows: (string | number)[][], colorVar: string) {
      const total = rows.reduce(function (a, r) { return a + (r[r.length - 1] as number); }, 0);
      const max = Math.max.apply(null, rows.map(function (r) { return r[r.length - 1] as number; }));
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = rows.map(function (r, i) {
        const name = r[0], sub = r.length === 3 ? r[1] : "", v = r[r.length - 1] as number;
        const pct = (v / total * 100);
        const w = (v / max * 100).toFixed(1);
        const op = Math.max(0.25, 1 - i * 0.055);
        return "<tr>" +
          '<td class="nm">' + name + (sub ? "<small>" + sub + "</small>" : "") + "</td>" +
          '<td class="bar-cell"><span class="bar"><i style="width:' + w + '%; background:var(' + colorVar + '); opacity:' + op.toFixed(2) + ';"></i></span></td>' +
          '<td class="amt">' + usd(v) + "</td>" +
          '<td class="pct">' + (pct < 0.1 ? "<0.1" : pct.toFixed(1)) + "%</td>" +
          "</tr>";
      }).join("");
    }
    renderSplit("alphaSplit", ALPHA_SPLIT, "--alpha");
    renderSplit("primeSplit", PRIME_SPLIT, "--prime");
    renderSplit("alphaChains", ALPHA_CHAINS, "--alpha");
    renderSplit("primeChains", PRIME_CHAINS, "--prime");

    /* ---- wallets ---- */
    const AW: [string, string][] = [
      ["Main Wallet 1","0x815f5BB257e88b67216a344C7C83a3eA4EE74748"],["Main Wallet 2","0x015CC48cC8bC37D80AAFf4e43061dbaF94192308"],
      ["Main Wallet 3","0x502D222e8e4DaEF69032f55F0c1A999EFFd78fB3"],["Main Wallet 4","0xCf0a12CBd8088fc5f84ad431E71787157041cD69"],
      ["Main Wallet 5","0xb6cbe8b123392eF6Aa72897bb85bd6515d2e8db7"],["Main Wallet 6","0xfAA7744b9Ed973290A36eE815b5AcC76856583a0"],
      ["Main Wallet 7","0x424323D25d30C687BDf79Bb333da1D41C0373F37"],["Main Wallet 8","0x3145CB0695416effe6eC9585e706f47b6C3c6599"],
      ["Main Wallet 9","0xa89527A5f78cD782c736a34F4877C8437d992d86"],["Solana Wallet 1","GLJiCkZ8ABATXQiNcu8NKVanGWQZx9FGXwHRJauZZQ3K"],
      ["Reserve Fund","0xDAeF005ae017Be5B938A2b321Db3dEC96e684f68"],["Instant Redemption Buffer","0x6695c0f8706C5ACe3Bdf8995073179cCA47926dc"],
      ["Liquidity Buffer","0x09bfBC374C37c927909a0E7B278eE7Fdf47A380a"],["yzUSD Mint Wallet","0x0879Aa9e47d3209Ce36aDDCf6561196040A73d8f"],
      ["yzPP Mint Wallet","0x8d8d4441F1E7dbF05d0e4448f2dd635BEC0a478d"]
    ];
    const PW: [string, string][] = [
      ["Main Fund 1","0xa0a6282a3ADBc3d6b76cd1129CD17607316dc2C1"],["Main Fund 2","0xD6161EecC6b5D89115A408f19F27EdAD54766495"],
      ["Main Fund 3","0x83f30762F7cc672A72291Bd2C227be823F520EEd"],["Main Fund 4","0xbd469d0A2F8E11b6f146c919fC1cE941044Eca39"],
      ["Main Fund 5","0x4206Bd4b518aD524401eFa01F4a36022c1C61d00"],["External OTC Mint/Redeem 1","0xba4f5974d4f97d3FC7beFae1165343Dd768C875b"],
      ["yzPrime Mint Wallet","0x886C2709013b1A447c61eB9595448Bb1DE77d9EF"]
    ];
    function renderWallets(id: string, rows: [string, string][]) {
      const el = document.getElementById(id);
      if (!el) return;
      el.innerHTML = rows.map(function (r) {
        const isSol = r[1].indexOf("0x") !== 0;
        const href = isSol ? "https://solscan.io/account/" + r[1] : "https://debank.com/profile/" + r[1];
        const short = r[1].slice(0, 6) + "..." + r[1].slice(-4);
        return '<a href="' + href + '" target="_blank" rel="noopener"><span class="wname">' + r[0] + '</span><span class="addr">' + short + ' &nearr;</span></a>';
      }).join("");
    }
    renderWallets("alphaWallets", AW);
    renderWallets("primeWallets", PW);

    /* ---- SVG line charts ---- */
    function line(svgId: string, values: number[], color: string, opts?: { min?: number; max?: number }) {
      const svg = document.getElementById(svgId);
      if (!svg) return;
      opts = opts || {};
      const W = 300, Hh = 130, pad = 6;
      const min = opts.min != null ? opts.min : Math.min.apply(null, values);
      let max = opts.max != null ? opts.max : Math.max.apply(null, values);
      if (max === min) max = min + 1;
      function pt(i: number, v: number) {
        const x = pad + (W - 2 * pad) * i / (values.length - 1);
        const y = Hh - pad - (Hh - 2 * pad) * (v - min) / (max - min);
        return x.toFixed(1) + "," + y.toFixed(1);
      }
      const pts = values.map(function (v, i) { return pt(i, v); }).join(" ");
      const area = pad + "," + (Hh - pad) + " " + pts + " " + (W - pad) + "," + (Hh - pad);
      const lastY = pt(values.length - 1, values[values.length - 1]).split(",")[1];
      svg.innerHTML +=
        '<polygon points="' + area + '" fill="' + color + '" opacity="0.09"/>' +
        '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.6" vector-effect="non-scaling-stroke"/>' +
        '<circle cx="' + (W - pad) + '" cy="' + lastY + '" r="2.6" fill="' + color + '"/>';
    }
    const reserves = SERIES.map(function (r) { return r[1]; });
    const supply = SERIES.map(function (r) { return r[2]; });
    const ratio = SERIES.map(function (r) { return r[3] * 100; });
    const apy = SERIES.map(function (r) { return r[4]; });
    const lo = Math.min.apply(null, supply), hi = Math.max.apply(null, reserves);
    line("chartAssets", reserves, col("--alpha"), { min: lo * 0.9, max: hi * 1.02 });
    line("chartAssets", supply, col("--faint"), { min: lo * 0.9, max: hi * 1.02 });
    line("chartRatio", ratio, col("--good"), { min: 100, max: 116 });
    line("chartApy", apy, col("--alpha"), { min: 5, max: 17 });

    /* ---- backing bars: reveal widths when scrolled into view ---- */
    const barEls = document.querySelectorAll<HTMLElement>(".bvs-row .bar i");
    const applyBar = (bar: Element) => {
      (bar as HTMLElement).style.width = bar.getAttribute("data-w") || "";
    };
    const stopWatch = watchVisible(barEls, applyBar, 30);

    return () => {
      stopWatch();
    };
  }, []);

  return null;
}
