/**
 * Dữ liệu proof-of-reserves đã xác thực (snapshot cache.accountable.capital/dashboard/yuzu,
 * 2026-07-16 05:03 UTC). Tách khỏi UI để trang render thuần từ dữ liệu (không innerHTML).
 */

/** [tên, mô tả, USD] cho breakdown chiến lược; [tên, USD] cho breakdown theo chain. */
export type SplitRow = [string, string, number] | [string, number];

/** Alpha strategy positions (exposure_split), USD. */
export const ALPHA_SPLIT: SplitRow[] = [
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
  ["PayPal PYUSD Loop", "Stablecoin carry, leveraged", 60087],
];

/** Prime strategy positions (exposure_split_rwa), USD. */
export const PRIME_SPLIT: SplitRow[] = [
  ["Sky USDS", "Overcollateralized stablecoin", 2299575],
  ["Maple syrupUSDT Loop", "Institutional lending, leveraged", 1074519],
  ["Superstate USTB Loop", "Tokenized T-Bills, leveraged", 1011969],
  ["Centrifuge deJAAA Loop", "AAA CLOs, leveraged", 223189],
  ["Centrifuge JAAA Loop", "AAA CLOs, leveraged", 83087],
  ["Other and in transit", "Settlement and rebalancing", 1466741],
];

/** Backing by chain (reserves_split), USD. */
export const ALPHA_CHAINS: SplitRow[] = [
  ["Ethereum", 16211220], ["Monad", 8341128], ["Plasma", 7572957],
  ["Hood", 6057082], ["Mantle", 4665139], ["Base", 3828835],
  ["Solana", 2494774], ["Sei", 198234], ["Other chains", 5787],
];
export const PRIME_CHAINS: SplitRow[] = [
  ["Ethereum", 3658351], ["Monad", 1324403], ["Plasma", 680572],
  ["Mantle", 272662], ["Base", 223092],
];

/** Ví NAV: [nhãn, địa chỉ]. */
export const ALPHA_WALLETS: [string, string][] = [
  ["Main Wallet 1", "0x815f5BB257e88b67216a344C7C83a3eA4EE74748"], ["Main Wallet 2", "0x015CC48cC8bC37D80AAFf4e43061dbaF94192308"],
  ["Main Wallet 3", "0x502D222e8e4DaEF69032f55F0c1A999EFFd78fB3"], ["Main Wallet 4", "0xCf0a12CBd8088fc5f84ad431E71787157041cD69"],
  ["Main Wallet 5", "0xb6cbe8b123392eF6Aa72897bb85bd6515d2e8db7"], ["Main Wallet 6", "0xfAA7744b9Ed973290A36eE815b5AcC76856583a0"],
  ["Main Wallet 7", "0x424323D25d30C687BDf79Bb333da1D41C0373F37"], ["Main Wallet 8", "0x3145CB0695416effe6eC9585e706f47b6C3c6599"],
  ["Main Wallet 9", "0xa89527A5f78cD782c736a34F4877C8437d992d86"], ["Solana Wallet 1", "GLJiCkZ8ABATXQiNcu8NKVanGWQZx9FGXwHRJauZZQ3K"],
  ["Reserve Fund", "0xDAeF005ae017Be5B938A2b321Db3dEC96e684f68"], ["Instant Redemption Buffer", "0x6695c0f8706C5ACe3Bdf8995073179cCA47926dc"],
  ["Liquidity Buffer", "0x09bfBC374C37c927909a0E7B278eE7Fdf47A380a"], ["yzUSD Mint Wallet", "0x0879Aa9e47d3209Ce36aDDCf6561196040A73d8f"],
  ["yzPP Mint Wallet", "0x8d8d4441F1E7dbF05d0e4448f2dd635BEC0a478d"],
];
export const PRIME_WALLETS: [string, string][] = [
  ["Main Fund 1", "0xa0a6282a3ADBc3d6b76cd1129CD17607316dc2C1"], ["Main Fund 2", "0xD6161EecC6b5D89115A408f19F27EdAD54766495"],
  ["Main Fund 3", "0x83f30762F7cc672A72291Bd2C227be823F520EEd"], ["Main Fund 4", "0xbd469d0A2F8E11b6f146c919fC1cE941044Eca39"],
  ["Main Fund 5", "0x4206Bd4b518aD524401eFa01F4a36022c1C61d00"], ["External OTC Mint/Redeem 1", "0xba4f5974d4f97d3FC7beFae1165343Dd768C875b"],
  ["yzPrime Mint Wallet", "0x886C2709013b1A447c61eB9595448Bb1DE77d9EF"],
];

/** Timeline (downsampled): [date, reserves, supply, ratio, syzUSD APY]. */
export const SERIES: [string, number, number, number, number][] = [
  ["2025-10-15", 16868207, 15896242, 1.06, 16], ["2025-10-20", 21950656, 20982902, 1.05, 16], ["2025-10-25", 25208145, 24243877, 1.04, 14],
  ["2025-10-30", 25899135, 24957598, 1.04, 14], ["2025-11-04", 27157092, 26267215, 1.03, 14], ["2025-11-09", 21572329, 20761187, 1.04, 12],
  ["2025-11-14", 17395963, 16572771, 1.05, 12], ["2025-11-19", 18139116, 17327398, 1.05, 12], ["2025-11-24", 17928454, 17079129, 1.05, 12],
  ["2025-11-29", 17988091, 17107478, 1.05, 12.5], ["2025-12-04", 18505342, 17141758, 1.08, 13], ["2025-12-09", 20155599, 18792036, 1.07, 13],
  ["2025-12-14", 21711264, 20487847, 1.06, 13], ["2025-12-19", 29759203, 28353702, 1.05, 13], ["2025-12-24", 32968787, 31617675, 1.04, 12],
  ["2025-12-29", 41092154, 39651318, 1.04, 12], ["2026-01-03", 41693892, 40227126, 1.04, 11], ["2026-01-08", 45252036, 43007707, 1.05, 11],
  ["2026-01-13", 50396348, 46500679, 1.08, 11], ["2026-01-18", 58007382, 55917087, 1.04, 11], ["2026-01-23", 62234173, 59211469, 1.05, 11],
  ["2026-01-28", 62203590, 59148995, 1.05, 11], ["2026-02-02", 66524352, 62936379, 1.06, 11], ["2026-02-07", 66847042, 63174006, 1.06, 10.5],
  ["2026-02-12", 59932565, 57414460, 1.04, 8], ["2026-02-17", 62858359, 58974694, 1.07, 7], ["2026-02-22", 58835670, 54870174, 1.07, 7.5],
  ["2026-02-27", 61825975, 57818168, 1.07, 7.5], ["2026-03-04", 66166722, 62191868, 1.06, 7.5], ["2026-03-09", 67687098, 63581764, 1.06, 7.5],
  ["2026-03-14", 66154431, 63223205, 1.05, 8], ["2026-03-19", 68958354, 65833981, 1.05, 8], ["2026-03-24", 64553663, 61425449, 1.05, 7],
  ["2026-03-29", 61974818, 58810405, 1.05, 7.5], ["2026-04-03", 68463319, 66297400, 1.03, 7.5], ["2026-04-08", 70209806, 66923686, 1.05, 7.5],
  ["2026-04-13", 66505107, 63191352, 1.05, 7], ["2026-04-18", 66007504, 61484415, 1.07, 7], ["2026-04-23", 65835941, 61484415, 1.07, 7],
  ["2026-04-28", 65839620, 61484415, 1.07, 7], ["2026-05-03", 41687060, 37867541, 1.10, 7], ["2026-05-08", 41268834, 37988984, 1.09, 7.5],
  ["2026-05-13", 46615607, 42686998, 1.09, 7.5], ["2026-05-18", 46028520, 42522630, 1.08, 8], ["2026-05-23", 44864438, 42497167, 1.06, 8],
  ["2026-05-28", 44234420, 41613721, 1.06, 8], ["2026-06-02", 43696935, 41333058, 1.06, 8], ["2026-06-07", 42980724, 40047213, 1.07, 8],
  ["2026-06-12", 41997576, 39239700, 1.07, 7.5], ["2026-06-17", 42090568, 39181390, 1.07, 7.5], ["2026-06-22", 46998227, 44357542, 1.06, 7.5],
  ["2026-06-27", 47747787, 44686154, 1.07, 7.5], ["2026-07-02", 48579562, 45470619, 1.07, 7.5], ["2026-07-07", 49356433, 44661772, 1.11, 7.5],
  ["2026-07-12", 50599439, 45758169, 1.11, 7.75], ["2026-07-15", 49375157, 44554443, 1.11, 7.75],
];

/* ---------- helpers thuần ---------- */

/** Định dạng USD gọn: $x.xxM / $x.xK / $x. */
export function usd(n: number): string {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
  return "$" + Math.round(n);
}

/** Rút gọn địa chỉ: 0x1234...abcd. */
export const shortAddr = (a: string) => a.slice(0, 6) + "..." + a.slice(-4);

/** Link explorer theo loại ví (Solana vs EVM). */
export const walletHref = (a: string) =>
  a.indexOf("0x") !== 0 ? "https://solscan.io/account/" + a : "https://debank.com/profile/" + a;

/** Chuỗi giá trị lấy từ timeline cho biểu đồ. */
export const reserves = SERIES.map((r) => r[1]);
export const supply = SERIES.map((r) => r[2]);
export const ratio = SERIES.map((r) => r[3] * 100);
export const apy = SERIES.map((r) => r[4]);
/** yzPP theo dõi cùng nhịp với syzUSD nhưng ~3.48x (27% vs 7.75%). */
export const apyPP = SERIES.map((r) => +(r[4] * 3.48).toFixed(1));
export const assetsMin = Math.min(...supply) * 0.9;
export const assetsMax = Math.max(...reserves) * 1.02;
