import Link from "next/link";
import "./styles.css";
import AlphaClient from "./AlphaClient";
import { pageMetadata } from "@/lib/pages";
import Button from "@/components/ui/Button";
import { ArrowUpDown, ArrowDown, ArrowDownRight, ArrowUpRight, ArrowLeftRight, ArrowRight, ArrowLeft, ShieldCheck, ExternalLink, Search, History as HistoryIcon, X, Settings, Wallet, WalletCards, Bookmark, Sun, Globe, Route, Fuel, Percent, DollarSign, Split, ChevronRight, ChevronDown, Check, Sparkles } from "lucide-react";

export const metadata = pageMetadata("/alpha");

/* Ô nhập tiền (deposit / receive) theo layout Figma mới. */
function Field({
  label,
  sym,
  symLabel,
  balance,
  deposit = false,
  input = {},
}: {
  label: string;
  sym: string;
  symLabel: string;
  balance?: string;
  deposit?: boolean;
  input?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="mfield">
      <div className="mfield-l">
        <span className="lbl">{label}</span>
        <input type="text" placeholder="0" aria-label={label} {...input} />
        <div className="xusd">≈ $0.00</div>
      </div>
      <div className="mfield-r">
        {deposit && (
          <div className="pct-opts">
            <button type="button" className="pct">25%</button>
            <button type="button" className="pct">50%</button>
            <button type="button" className="pct">75%</button>
            <button type="button" className="pct">Max</button>
          </div>
        )}
        <span className="token" data-sym={sym}>
          <img src={sym === "usdt" ? "/assets/tokens/usdt0.png" : `/assets/tokens/${sym}.svg`} alt="" />
          {symLabel}
        </span>
        {balance && (
          <div className="bal">
            Balance: <span className="v">{balance}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SwapCircle() {
  return (
    <button type="button" className="swap-circle" data-swap aria-label="Swap direction">
      <ArrowUpDown />
    </button>
  );
}

function OrderItem({
  kind,
  label,
  amount,
  date,
  tx,
  status,
}: {
  kind: "mint" | "redeem";
  label: string;
  amount: string;
  date: string;
  tx: string;
  status: "success" | "failed";
}) {
  const Icon = kind === "mint" ? ArrowDownRight : ArrowUpRight;
  const negative = kind === "redeem"; // Redeem = tiền ra (âm), Mint = tiền vào (dương)
  const badgeLabel = status === "success" ? "Success" : "Failed";
  return (
    <div className="ord" role="button" tabIndex={0} data-kind={kind} data-status={status}>
      <span className="oicon"><Icon /></span>
      <div className="oleft">
        <span className="ot">{label}</span>
        <span className="oa">{date}<span className="odot" /><span className="otx">{tx}<ExternalLink /></span></span>
      </div>
      <div className="oright">
        <span className="ov">{negative ? "−" : "+"}{amount}</span>
        <span className={`badge ${status}`}>{badgeLabel}</span>
      </div>
    </div>
  );
}

/* Lịch sử activity (demo). Mint/Redeem yzUSD chỉ có 2 trạng thái: success / failed.
   Mặc định hiện 3, "Show more" sổ thêm 10 mỗi lần. */
const ACTIVITIES: {
  kind: "mint" | "redeem"; label: string; amount: string; date: string; tx: string;
  status: "success" | "failed";
}[] = [
  { kind: "redeem", label: "Redeem yzUSD", amount: "$2,000.00", date: "03 Aug 2026, 12:59", tx: "0x9ed0…7f1a", status: "success" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$1,000.00", date: "30 Jul 2026, 23:08", tx: "0xc843…3c36", status: "success" },
  { kind: "mint", label: "Mint yzUSD", amount: "$1,000.50", date: "30 Jul 2026, 21:10", tx: "0xeED43…AbbA", status: "failed" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$500.00", date: "29 Jul 2026, 18:22", tx: "0x71bC8…9Ae0", status: "success" },
  { kind: "mint", label: "Mint yzUSD", amount: "$3,200.00", date: "29 Jul 2026, 09:05", tx: "0x4aF0…2b1c", status: "failed" },
  { kind: "mint", label: "Mint yzUSD", amount: "$750.00", date: "28 Jul 2026, 20:41", tx: "0x1b7E…9c02", status: "success" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$4,120.00", date: "28 Jul 2026, 14:30", tx: "0x88aa…3d1f", status: "success" },
  { kind: "mint", label: "Mint yzUSD", amount: "$960.00", date: "27 Jul 2026, 11:12", tx: "0x2fc9…7ab4", status: "failed" },
  { kind: "mint", label: "Mint yzUSD", amount: "$12,000.00", date: "27 Jul 2026, 08:03", tx: "0x5e10…b2c8", status: "success" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$300.00", date: "26 Jul 2026, 22:57", tx: "0x9d44…1e6a", status: "success" },
  { kind: "mint", label: "Mint yzUSD", amount: "$2,500.00", date: "26 Jul 2026, 16:19", tx: "0x77bd…4f90", status: "success" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$1,800.00", date: "25 Jul 2026, 13:44", tx: "0x0ac1…8d33", status: "failed" },
  { kind: "mint", label: "Mint yzUSD", amount: "$640.00", date: "25 Jul 2026, 10:05", tx: "0x3ee2…5b71", status: "success" },
  { kind: "redeem", label: "Redeem yzUSD", amount: "$5,000.00", date: "24 Jul 2026, 19:26", tx: "0xa190…c7e2", status: "success" },
  { kind: "mint", label: "Mint yzUSD", amount: "$980.00", date: "24 Jul 2026, 09:51", tx: "0x6bf3…2a08", status: "success" },
];

/* Thông tin chi tiết từng token (cột phải, luôn hiện, đổi theo tab). */
const TOKENS = [
  {
    key: "yzusd", name: "yzUSD", logo: "/assets/tokens/yzUSD.svg",
    badge: "Senior · Par stable",
    tagline: "Fully-backed 1:1 USD stablecoin, over-collateralized and attested live.",
    stats: [ { k: "Your Balance", v: "$12,480.00" }, { k: "Peg", v: "1:1" }, { k: "Collateral ratio", v: "108.92%", tone: "good" } ],
    info: [
      { k: "Rate", v: "1:1 at par" },
      { k: "Access", v: "Eligible Investors, KYC" },
      { k: "Alternative", v: "Swap on Curve, no KYC", hi: true },
      { k: "Redemption window", v: "Up to 3 days" },
      { k: "Network", v: "Plasma", icon: "/assets/chains/plasma.svg" },
    ],
    note: {
      title: "Backing, verified live",
      body: "Every yzUSD is backed by more than one dollar of onchain assets, attested every 15 minutes by Accountable.",
      rows: [
        { k: "Collateral ratio", v: "108.92%" },
        { k: "First-loss buffer", v: "yzPP + Reserve Fund" },
      ],
    },
  },
  {
    key: "yzpp", name: "yzPP", logo: "/assets/tokens/yzPP.svg",
    badge: "Junior tranche",
    tagline: "Junior tranche that absorbs first loss in exchange for a higher yield.",
    stats: [ { k: "Your Balance", v: "$3,250.00" }, { k: "Est. APY", v: "29.0%", tone: "hi" }, { k: "Price", v: "1.1867" }, { k: "Role", v: "Junior" } ],
    info: [
      { k: "yzPP price", v: "1 yzPP = 1.186682 USDT0" },
      { k: "Estimated APY", v: "29.0%", hi: true },
      { k: "Role", v: "Junior tranche, absorbs losses first" },
      { k: "Redemption window", v: "30 days, yield accrues" },
      { k: "Minimum order", v: "5,000 yzPP" },
      { k: "Deposit fee", v: "0%" },
      { k: "Management fee", v: "0% / yr" },
      { k: "Performance fee", v: "0%" },
      { k: "Access", v: "Eligible Investors, KYC" },
    ],
  },
  {
    key: "syzusd", name: "syzUSD", logo: "/assets/tokens/syzUSD.svg",
    badge: "Staked yield",
    tagline: "Staked yzUSD, the senior tranche, that accrues the weekly yield target.",
    stats: [ { k: "Your Balance", v: "$8,900.00" }, { k: "Weekly target", v: "7.75%", tone: "hi" }, { k: "Rate", v: "0.9361" }, { k: "Network", v: "Plasma", icon: "/assets/chains/plasma.svg" } ],
    info: [
      { k: "Exchange rate", v: "1 yzUSD = 0.9361 syzUSD" },
      { k: "Weekly target yield", v: "7.75%", hi: true },
      { k: "Yield epoch", v: "Fri 04:00 → Fri 03:59 UTC" },
      { k: "Unstaking", v: "One step, near instant" },
      { k: "Network", v: "Plasma", icon: "/assets/chains/plasma.svg" },
    ],
  },
];

/* Cặp token cho phép đổi qua lại trong cùng tab gộp (yzUSD ⇄ syzUSD). */
const SWITCH_PAIR: Record<string, string> = { yzusd: "syzusd", syzusd: "yzusd" };

function TokenDetail({ t }: { t: (typeof TOKENS)[number] }) {
  const switchKey = SWITCH_PAIR[t.key];
  const switchTok = switchKey ? TOKENS.find((x) => x.key === switchKey) : undefined;
  return (
    <div className="av-detail" data-panel={t.key} style={t.key === TOKENS[0].key ? undefined : { display: "none" }}>
      {/* Overview */}
      <section className="vd-sec">
        <div className="vd-head">
          <div className="vd-head-row">
            <span className="vt-logo"><img src={t.logo} alt="" /></span>
            {switchTok && (
              <button type="button" className="vd-switch" data-switch-panel={switchTok.key}>
                <img src={switchTok.logo} alt="" /> Switch to {switchTok.name} <ArrowLeftRight />
              </button>
            )}
          </div>
          <div className="vd-head-main">
            <div className="vd-head-top"><h3>{t.name}</h3></div>
            <p className="vd-desc">{t.tagline}</p>
          </div>
        </div>
        <div className="vd-stats">
          {t.stats.map((s: { k: string; v: string; tone?: string; icon?: string }) => (
            <div key={s.k}>
              <span className="k">{s.k}</span>
              <b className={s.tone ?? ""}>{s.icon && <img className="vd-stat-ic" src={s.icon} alt="" />}{s.v}</b>
            </div>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="vd-sec">
        <h4 className="vd-title">Details</h4>
        <div className="vd-info">
          {t.info.map((r) => (
            <div key={r.k}><span className="k">{r.k}</span><span className={`v${r.hi ? " hi" : ""}`}>{r.icon && <img className="v-ic" src={r.icon} alt="" />}{r.v}</span></div>
          ))}
        </div>
      </section>

      {/* Note (backing / loss) — chỉ hiện khi token có */}
      {t.note && (
        <section className="vd-sec">
          <h4 className="vd-title">{t.note.title}</h4>
          <p className="vd-desc">{t.note.body}</p>
          {t.note.rows && (
            <div className="vd-info">
              {t.note.rows.map((r) => (
                <div key={r.k}><span className="k">{r.k}</span><span className="v">{r.v}</span></div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default function Alpha() {
  return (
    <div className="pg-alpha">

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        <div className="xchg rv">
          <div className="av-grid">
          <div className="av-left">

          {/* Icon history (bo tròn) — góc trên phải form, ngang hàng Mint/Redeem; mở dialog lịch sử */}
          <button type="button" className="hist-btn" data-history-open aria-label="Transaction history" aria-expanded="false"><HistoryIcon /></button>

          {/* ============ yzUSD ============ */}
          <div className="xchg-body" data-panel="yzusd">
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="mint">Mint</button>
                <button data-dir="redeem">Redeem</button>
                <button data-dir="swap">Swap</button>
              </div>
            </div>
            <div data-dirpanel="mint">
              <div className="mfields">
                <Field label="You deposit" sym="usdt" symLabel="USDT0" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzUSD" symLabel="yzUSD" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <div className="mint-sum" data-sum data-mint-fee="0.001" data-stake-fee="0.005" data-stake-rate="0.9361" data-stake-sym="syzUSD" hidden>
                <button type="button" className="msum-bar" data-sum-toggle aria-expanded="false">
                  <span className="msum-rate" data-sum-rate />
                  <span className="msum-bar-r"><b className="msum-feeval" data-sum-totalfee>$0.00</b><ChevronDown className="msum-chev" /></span>
                </button>
                <div className="msum-detail" data-sum-detail hidden>
                  <div className="msum-row"><span>You&rsquo;ll receive</span><b data-sum-stake>0 syzUSD</b></div>
                  <div className="msum-row"><span>Mint fee <i>0.10%</i></span><b data-sum-mintfee>$0.00</b></div>
                  <div className="msum-row"><span>Stake fee <i>0.50%</i></span><b data-sum-stakefee>$0.00</b></div>
                </div>
              </div>
              <div className="gcta-stack">
                <Button block variant="line" className="gcta gcta-2nd" data-mint-confirm>Connect wallet</Button>
                <Button block className="gcta" data-cta-fixed>Mint &amp; Stake</Button>
              </div>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzUSD" symLabel="yzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <div className="mint-sum" data-sum data-redeem-fee="0.001" hidden>
                <button type="button" className="msum-bar" data-sum-toggle aria-expanded="false">
                  <span className="msum-rate" data-sum-rate />
                  <span className="msum-bar-r"><b className="msum-feeval" data-sum-totalfee>$0.00</b><ChevronDown className="msum-chev" /></span>
                </button>
                <div className="msum-detail" data-sum-detail hidden>
                  <div className="msum-row"><span>Redeem amount</span><b data-sum-redeem>0 USDT0</b></div>
                  <div className="msum-row"><span>Redeem fee <i>0.10%</i></span><b data-sum-redeemfee>$0.00</b></div>
                </div>
              </div>
              <Button block className="gcta">Connect wallet</Button>
            </div>
            {/* Swap (Exchange) — powered by LI.FI */}
            <div data-dirpanel="swap" style={{ display: "none" }}>
              <div className="swapx">
                <div className="swapx-head">
                  <b className="swapx-title">Exchange</b>
                  <button type="button" className="swapx-gear" data-swap-open="settings" aria-label="Settings"><Settings /></button>
                </div>
                <div className="swapx-io">
                  <button type="button" className="swapx-box swapx-from" data-swap-open="from" aria-haspopup="dialog">
                    <span className="swapx-lbl">From</span>
                    <span className="swapx-tok">
                      <span className="swapx-avatar"><span className="swapx-ic swapx-ic-empty" data-from-ic /><img className="swapx-badge" src="/assets/chains/plasma.svg" alt="" /></span>
                      <span className="swapx-name muted" data-from-name>Select…</span>
                    </span>
                  </button>
                  <span className="swapx-arrow"><ArrowRight /></span>
                  <div className="swapx-box">
                    <span className="swapx-lbl">To</span>
                    <span className="swapx-tok">
                      <span className="swapx-avatar"><img className="swapx-ic" src="/assets/tokens/yzUSD.svg" alt="" /><img className="swapx-badge" src="/assets/chains/plasma.svg" alt="" /></span>
                      <span className="swapx-name"><b>yzUSD</b><small>Plasma</small></span>
                    </span>
                  </div>
                </div>
                <div className="swapx-box swapx-send">
                  <span className="swapx-lbl">Send</span>
                  <div className="swapx-send-main"><span className="swapx-avatar"><span className="swapx-ic swapx-ic-empty" data-from-ic /><img className="swapx-badge" src="/assets/chains/plasma.svg" alt="" /></span><span className="swapx-amt">0</span></div>
                  <span className="swapx-usd">$0.00</span>
                </div>
                <div className="swapx-cta">
                  <Button block className="gcta">Connect wallet</Button>
                  <button type="button" className="swapx-wallet" data-swap-open="wallet" aria-label="Wallet"><Wallet /></button>
                </div>
                <div className="swapx-powered">Powered by <b>LI.FI</b></div>

                {/* ---- Sheet: Exchange from (chọn token nguồn) ---- */}
                <div className="swapx-sheet" data-swap-sheet="from" hidden>
                  <div className="swapx-sheet-head">
                    <button type="button" className="swapx-back" data-swap-back aria-label="Back"><ArrowLeft /></button>
                    <b>Exchange from</b>
                  </div>
                  <div className="swapx-chains">
                    {[
                      { k: "all", label: "All chains", multi: true },
                      { k: "eth", label: "Ethereum", icon: "/assets/chains/ethereum.svg" },
                      { k: "monad", label: "Monad", icon: "/assets/chains/monad.svg" },
                      { k: "plasma", label: "Plasma", icon: "/assets/chains/plasma.svg", on: true },
                      { k: "pharos", label: "Pharos", icon: "/assets/chains/pharos.svg" },
                    ].map((c) => (
                      <button type="button" key={c.k} className={`swapx-chain${c.on ? " on" : ""}`} aria-label={c.label} title={c.label}>
                        {c.multi ? (
                          <span className="swapx-chain-multi">
                            <img src="/assets/chains/ethereum.svg" alt="" />
                            <img src="/assets/chains/plasma.svg" alt="" />
                            <img src="/assets/chains/monad.svg" alt="" />
                            <img src="/assets/chains/pharos.svg" alt="" />
                          </span>
                        ) : (
                          <img src={c.icon} alt="" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="swapx-search"><Search className="ic" /><input type="text" placeholder="Search by token or address" aria-label="Search token" /></div>
                  <div className="swapx-list">
                    {[
                      { sym: "XPL", name: "Plasma", icon: "/assets/chains/plasma.svg", bal: "1,204.5" },
                      { sym: "USDT0", name: "USD₮0", icon: "/assets/tokens/usdt0.png", bal: "10,000.00" },
                      { sym: "yzUSD", name: "Yuzu USD", icon: "/assets/tokens/yzUSD.svg", bal: "12,480.20" },
                      { sym: "yzPP", name: "Yuzu Protection Pool", icon: "/assets/tokens/yzPP.svg", bal: "3,150.00" },
                      { sym: "syzUSD", name: "Staked Yuzu USD", icon: "/assets/tokens/syzUSD.svg", bal: "8,900.00" },
                    ].map((t) => (
                      <button type="button" key={t.sym} className="swapx-item" data-swap-token={t.sym} data-token-icon={t.icon}>
                        <img src={t.icon} alt="" />
                        <span className="nm"><b>{t.sym}</b><small>{t.name}</small></span>
                        <span className="bal">{t.bal}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ---- Sheet: Send to wallet ---- */}
                <div className="swapx-sheet" data-swap-sheet="wallet" hidden>
                  <div className="swapx-sheet-head">
                    <button type="button" className="swapx-back" data-swap-back aria-label="Back"><ArrowLeft /></button>
                    <b>Send to wallet</b>
                  </div>
                  <div className="swapx-addr">
                    <input type="text" placeholder="Enter address or wallet domain" aria-label="Wallet address" />
                    <div className="swapx-addr-row">
                      <button type="button" className="swapx-done">Done</button>
                      <button type="button" className="swapx-bookmark" aria-label="Bookmark"><Bookmark /></button>
                    </div>
                  </div>
                  <div className="swapx-list">
                    <button type="button" className="swapx-item swapx-item-nav"><WalletCards /><span className="nm"><b>Recent wallets</b></span><ChevronRight className="chev" /></button>
                    <button type="button" className="swapx-item swapx-item-nav"><Wallet /><span className="nm"><b>Connected wallets</b></span><ChevronRight className="chev" /></button>
                    <button type="button" className="swapx-item swapx-item-nav"><Bookmark /><span className="nm"><b>Bookmarked wallets</b></span><ChevronRight className="chev" /></button>
                  </div>
                </div>

                {/* ---- Sheet: Settings ---- */}
                <div className="swapx-sheet" data-swap-sheet="settings" hidden>
                  <div className="swapx-sheet-head">
                    <button type="button" className="swapx-back" data-swap-back aria-label="Back"><ArrowLeft /></button>
                    <b>Settings</b>
                  </div>
                  <div className="swapx-set">
                    <button type="button" className="swapx-set-row"><Sun /><span className="nm">Appearance</span><span className="val">Light</span></button>
                    <button type="button" className="swapx-set-row"><Globe /><span className="nm">Language</span><span className="val">English</span></button>
                    <button type="button" className="swapx-set-row"><Route /><span className="nm">Route priority</span><span className="val">Best Return</span></button>
                    <button type="button" className="swapx-set-row"><Fuel /><span className="nm">Gas price</span><span className="val">Normal</span></button>
                    <button type="button" className="swapx-set-row"><Percent /><span className="nm">Max. slippage</span><span className="val">Auto</span></button>
                    <div className="swapx-set-row"><DollarSign /><span className="nm">Hide small balances</span><span className="swapx-toggle" role="switch" aria-checked="false" tabIndex={0}><i /></span></div>
                    <button type="button" className="swapx-set-row"><Split /><span className="nm">Bridges</span><span className="val">35/35</span></button>
                    <button type="button" className="swapx-set-row"><ArrowLeftRight /><span className="nm">Exchanges</span><span className="val">36/36</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ yzPP ============ */}
          <div className="xchg-body" data-panel="yzpp" style={{ display: "none" }}>
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="mint">Mint</button>
                <button data-dir="redeem">Redeem</button>
              </div>
            </div>
            <div data-dirpanel="mint">
              <div className="mfields">
                <Field label="You deposit" sym="usdt" symLabel="USDT0" balance="$10,000.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzPP" symLabel="yzPP" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
            </div>
            <div data-dirpanel="redeem" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You redeem" sym="yzPP" symLabel="yzPP" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="usdt" symLabel="USDT0" balance="$10,000.00" input={{ readOnly: true }} />
              </div>
              <Button block className="gcta">Connect wallet</Button>
            </div>
          </div>

          {/* ============ syzUSD ============ */}
          <div className="xchg-body" data-panel="syzusd" style={{ display: "none" }}>
            <div className="dir-row">
              <div className="dir-switch">
                <button className="on" data-dir="stake">Stake</button>
                <button data-dir="unstake">Unstake</button>
              </div>
            </div>
            <div data-dirpanel="stake">
              <div className="mfields">
                <Field label="You stake" sym="yzUSD" symLabel="yzUSD" balance="$0.00" deposit input={{ inputMode: "decimal", "data-src": true, "data-rate": "0.9361" } as React.InputHTMLAttributes<HTMLInputElement>} />
                <SwapCircle />
                <Field label="You receive" sym="syzUSD" symLabel="syzUSD" balance="$0.00" input={{ readOnly: true, "data-dst": true } as React.InputHTMLAttributes<HTMLInputElement>} />
              </div>
              <Button block>Connect Wallet</Button>
            </div>
            <div data-dirpanel="unstake" style={{ display: "none" }}>
              <div className="mfields">
                <Field label="You unstake" sym="syzUSD" symLabel="syzUSD" balance="$0.00" deposit input={{ inputMode: "decimal" }} />
                <SwapCircle />
                <Field label="You receive" sym="yzUSD" symLabel="yzUSD" balance="$0.00" input={{ readOnly: true }} />
              </div>
              <Button block>Connect Wallet</Button>
            </div>
          </div>

          {/* Stats ngay dưới card mint/redeem */}
          <div className="page-stats rv">
            <div><div className="k">Alpha TVL</div><div className="v" data-count="48470795" data-prefix="$">$0</div></div>
            <div><div className="k">Collateral ratio</div><div className="v" style={{ color: "var(--good)" }}>108.92%</div></div>
            <div><div className="k">syzUSD target</div><div className="v" style={{ color: "var(--alpha)" }}>7.75%</div></div>
            <div><div className="k">yzPP target</div><div className="v" style={{ color: "var(--alpha)" }}>27.0%</div></div>
            <div className="pro-only"><div className="k">Next epoch</div><div className="v">FRI 04:00</div></div>
          </div>

          </div>{/* .av-left */}

          <div className="av-right">
            <TokenDetail t={TOKENS[0]} />
            <TokenDetail t={TOKENS[1]} />
            <TokenDetail t={TOKENS[2]} />
            {/* Proof of Reserves — dùng chung cho cả 3 token */}
            <a className="vd-por" href="/transparency/" aria-label="Proof of Reserves">
              <div className="vd-por-lead">
                <span className="vd-por-shield"><ShieldCheck /></span>
                <div><b>Proof of Reserves</b><span>Independent third-party verification of the protocol&apos;s backing assets.</span></div>
              </div>
              <div className="vd-por-marks">
                <img src="/assets/partners/accountable-fav.png" alt="Accountable" />
                <img src="/assets/partners/hypernative-fav.png" alt="Hypernative" />
                <img src="/assets/partners/fordefi-fav.png" alt="Fordefi" />
                <img src="/assets/partners/chainlink-fav.png" alt="Chainlink" />
                <span className="vd-por-arr">→</span>
              </div>
            </a>
          </div>
          </div>{/* .av-grid */}
        </div>

        {/* Dialog lịch sử — mở từ icon history ở thanh tab, hiện full Activities */}
        <div className="hist-dialog" data-history-dialog hidden>
          <div className="hist-backdrop" data-history-close />
          <div className="hist-panel" role="dialog" aria-modal="true" aria-label="Activities history">
            <div className="hist-head">
              <span className="otitle">Activities</span>
              <button type="button" className="hist-x" data-history-close aria-label="Close"><X /></button>
            </div>
            <div className="acc ohist">
              <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="success">Success</button><button className="ofilter" data-filter="failed">Failed</button></div>
              <div className="osearch"><Search className="osearch-ico" /><input type="text" placeholder="Search by transaction hash" aria-label="Search by transaction hash" /></div>
              <div className="olist">
                {ACTIVITIES.map((o, i) => <OrderItem key={i} {...o} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Dialog: Review order (bấm "Mint" -> review -> Confirm -> thành công) */}
        <div className="mok" data-mint-review hidden>
          <div className="mok-backdrop" data-mint-review-close />
          <div className="mok-card mrev-card" role="dialog" aria-modal="true" aria-label="Review order">
            <div className="mrev-head">
              <b>You&rsquo;re minting</b>
              <button type="button" className="mok-x mrev-x" data-mint-review-close aria-label="Close"><X /></button>
            </div>
            <div className="mrev-leg">
              <div className="mrev-leg-info">
                <span className="mrev-chain"><img src="/assets/tokens/usdt0.png" alt="" />USDT0</span>
                <div className="mrev-amt"><span data-rev-pay>0</span></div>
                <div className="mrev-usd" data-rev-pay-usd>$0.00</div>
              </div>
              <span className="mrev-avatar"><img className="mrev-tok" src="/assets/tokens/usdt0.png" alt="" /><img className="mrev-badge" src="/assets/chains/plasma.svg" alt="" /></span>
            </div>
            <div className="mrev-arrow"><ArrowDown /></div>
            <div className="mrev-leg">
              <div className="mrev-leg-info">
                <span className="mrev-chain"><img src="/assets/tokens/yzUSD.svg" alt="" />yzUSD</span>
                <div className="mrev-amt"><span data-rev-recv>0</span></div>
                <div className="mrev-usd" data-rev-recv-usd>$0.00</div>
              </div>
              <span className="mrev-avatar"><img className="mrev-tok" src="/assets/tokens/yzUSD.svg" alt="" /><img className="mrev-badge" src="/assets/chains/plasma.svg" alt="" /></span>
            </div>
            <div className="mrev-sep2" />
            <div className="mrev-cost"><span>Mint fee <i>0.10%</i></span><b data-rev-fee>$0.00</b></div>
            <div className="mrev-cost"><span>Network cost</span><b>&lt;$0.01</b></div>
            <button type="button" className="btn btn-accent btn-block mrev-cta" data-mint-review-confirm>Confirm mint</button>
          </div>
        </div>

        {/* Dialog: Mint thành công (bấm nút "Mint") */}
        <div className="mok" data-mint-ok hidden>
          <div className="mok-backdrop" data-mint-ok-close />
          <div className="mok-card" role="dialog" aria-modal="true" aria-label="Mint successful">
            <button type="button" className="mok-x" data-mint-ok-close aria-label="Close"><X /></button>
            <div className="mok-check"><Sparkles className="s s1" /><Sparkles className="s s2" /><Check /></div>
            <h3 className="mok-title">yzUSD minted successfully <Check className="mok-title-tick" /></h3>
            <p className="mok-sub">You received <b><span data-ok-amt>0</span> yzUSD</b>.</p>
            <div className="mok-earn">
              <div className="mok-earn-main">
                <div className="mok-earn-txt">
                  <b>Start earning with your yzUSD</b>
                  <p>Stake it to receive syzUSD and target <b>7.75%</b> weekly yield.</p>
                </div>
              </div>
              <div className="mok-flow">
                <span className="mok-chip"><img src="/assets/tokens/yzUSD.svg" alt="" /><span data-ok-amt>0</span>&nbsp;yzUSD</span>
                <ArrowRight />
                <span className="mok-chip"><img src="/assets/tokens/syzUSD.svg" alt="" />syzUSD</span>
              </div>
            </div>
            <div className="mok-actions">
              <button type="button" className="btn btn-accent btn-block">Stake now</button>
              <button type="button" className="btn btn-line btn-block" data-mint-ok-close>Back to portfolio</button>
            </div>
          </div>
        </div>

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
