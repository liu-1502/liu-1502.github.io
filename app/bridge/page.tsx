import "../alpha/styles.css";   /* shared Alpha exchange style */
import "./styles.css";           /* bridge overrides, load sau */
import { pageMetadata } from "@/lib/pages";
import BridgeExchange from "./BridgeExchange";
import { CircleHelp, X, ArrowUpRight, ExternalLink, ChevronDown, Search } from "lucide-react";

export const metadata = pageMetadata("/bridge");

/* Logo các chain hỗ trợ (thay danh sách text). Chain chưa có logo → badge chữ cái. */
const CHAIN_LOGOS: Record<string, string> = {
  Plasma: "/assets/chains/plasma.svg",
  Monad: "/assets/chains/monad.svg",
  Ethereum: "/assets/chains/ethereum.svg",
};
function ChainLogos({ chains }: { chains: string[] }) {
  return (
    <span className="chain-logos">
      {chains.map((c) =>
        CHAIN_LOGOS[c]
          ? <img key={c} src={CHAIN_LOGOS[c]} alt={c} title={c} />
          : <i key={c} className="chl" title={c}>{c.charAt(0)}</i>
      )}
    </span>
  );
}

/* Một dòng lịch sử bridge (route + tx hash thay cho địa chỉ ví). */
function BridgeOrder({ tok, sym, route, amount, tx, status }: {
  tok: "syzusd" | "yzprime"; sym: string; route: string; amount: string; tx: string;
  status: "pending" | "filled" | "finalized" | "cancelled";
}) {
  const badgeLabel = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <div className="ord" role="button" tabIndex={0} data-kind={tok} data-status={status}>
      <span className="oicon"><ArrowUpRight /></span>
      <div className="oleft">
        <span className="ot">Bridge {sym}</span>
        <span className="oa">{route}<span className="odot" /><span className="otx">{tx}<ExternalLink /></span></span>
        {status === "pending" && <button type="button" className="oaction neg">Cancel</button>}
        {status === "filled" && <button type="button" className="oaction">Finalize</button>}
      </div>
      <div className="oright">
        <span className={`ov${status === "finalized" ? " ov-green" : ""}`}>{amount}</span>
        {status !== "finalized" && <span className={`badge ${status}`}>{badgeLabel}</span>}
      </div>
    </div>
  );
}

/* Lịch sử bridge (demo). Mặc định hiện 3, "Show more" sổ thêm 10 mỗi lần. */
const ORDERS: {
  tok: "syzusd" | "yzprime"; sym: string; route: string; amount: string; tx: string;
  status: "pending" | "filled" | "finalized" | "cancelled";
}[] = [
  { tok: "syzusd", sym: "syzUSD", route: "Plasma → Monad", amount: "$2,500.00", tx: "0x9ed0…7f1a", status: "filled" },
  { tok: "yzprime", sym: "yzPrime", route: "Monad → Ethereum", amount: "$5,000.00", tx: "0xc843…3c36", status: "pending" },
  { tok: "syzusd", sym: "syzUSD", route: "Ethereum → Monad", amount: "$1,000.00", tx: "0xeED43…AbbA", status: "pending" },
  { tok: "syzusd", sym: "syzUSD", route: "Monad → Sei", amount: "$500.00", tx: "0x71bC8…9Ae0", status: "finalized" },
  { tok: "yzprime", sym: "yzPrime", route: "Ethereum → Monad", amount: "$3,200.00", tx: "0x4aF0…2b1c", status: "cancelled" },
  { tok: "syzusd", sym: "syzUSD", route: "Plasma → HyperEVM", amount: "$750.00", tx: "0x1b7E…9c02", status: "finalized" },
  { tok: "syzusd", sym: "syzUSD", route: "Pharos → Monad", amount: "$4,120.00", tx: "0x88aa…3d1f", status: "finalized" },
  { tok: "yzprime", sym: "yzPrime", route: "Monad → Ethereum", amount: "$960.00", tx: "0x2fc9…7ab4", status: "cancelled" },
  { tok: "syzusd", sym: "syzUSD", route: "Monad → Plasma", amount: "$12,000.00", tx: "0x5e10…b2c8", status: "finalized" },
  { tok: "syzusd", sym: "syzUSD", route: "Sei → Monad", amount: "$300.00", tx: "0x9d44…1e6a", status: "finalized" },
  { tok: "yzprime", sym: "yzPrime", route: "Ethereum → Monad", amount: "$2,500.00", tx: "0x77bd…4f90", status: "finalized" },
  { tok: "syzusd", sym: "syzUSD", route: "HyperEVM → Plasma", amount: "$1,800.00", tx: "0x0ac1…8d33", status: "cancelled" },
  { tok: "syzusd", sym: "syzUSD", route: "Monad → Pharos", amount: "$640.00", tx: "0x3ee2…5b71", status: "finalized" },
  { tok: "yzprime", sym: "yzPrime", route: "Monad → Ethereum", amount: "$5,000.00", tx: "0xa190…c7e2", status: "finalized" },
  { tok: "syzusd", sym: "syzUSD", route: "Plasma → Sei", amount: "$980.00", tx: "0x6bf3…2a08", status: "finalized" },
];

export default function Bridge() {
  return (
    <div className="pg-bridge">

      <div className="app-layout">

        <div className="xtra-bar"><button className="xtra-toggle" data-xtra aria-expanded="false" title="Show the details panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M14.5 4.5v15"/></svg><span className="lbl">Details</span></button></div>

        {/* Nút About the bridge: canh phải trên content như trang Alpha */}
        <div className="about-wrap">
          <button className="about-btn" data-about-toggle aria-expanded="false"><CircleHelp className="ico" /> About</button>
          <div className="about-menu" data-about-menu hidden>
            <div className="aside-head">
              <h3 className="aside-title">About the bridge</h3>
              <button className="aside-close" data-about-close aria-label="Close details"><X /></button>
            </div>
            <div className="tk-strip aside-marks">
              <img src="/assets/tokens/syzUSD.svg" alt="syzUSD" />
              <img src="/assets/tokens/yzPrime.svg" alt="yzPrime" />
            </div>
            <div className="aside-card">
              <h4>Why this bridge is different</h4>
              <p>No liquidity pools, no wrapped IOUs. Tokens are burned on the source chain and minted on the destination under the Cross-Chain Token standard, so the exact amount you send is the exact amount you receive.</p>
            </div>
            <div className="aside-card">
              <h4>Issuer-owned, rate limited</h4>
              <p>Yuzu owns its token pools and bridge configuration outright. Each lane enforces a hard capacity ceiling and refill rate, capping the blast radius of any anomaly independent of the transport layer.</p>
              <div className="rows">
                <div><span className="k">syzUSD lanes</span><ChainLogos chains={["Plasma", "Monad", "Ethereum", "HyperEVM", "Sei", "Pharos"]} /></div>
                <div><span className="k">yzPrime lanes</span><ChainLogos chains={["Monad", "Ethereum"]} /></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Defense in depth</h4>
              <p>Transfers require agreement across Chainlink&apos;s committing and executing oracle networks, with an independent onchain risk-management contract able to halt activity as a circuit breaker.</p>
              <div className="rows">
                <div><span className="k">Token manager</span><span className="v" style={{ color: "var(--citrus)" }}>Chainlink dashboard</span></div>
                <div><span className="k">Alt route</span><span className="v">transporter.io</span></div>
              </div>
            </div>
            <div className="aside-card">
              <h4>Transfer details</h4>
              <div className="rows">
                <div><span className="k">Mechanism</span><span className="v">Burn on source, mint on destination</span></div>
                <div><span className="k">Slippage</span><span className="v" style={{ color: "var(--accent)" }}>Zero, exact amount arrives</span></div>
                <div><span className="k">Estimated time</span><span className="v">~20 minutes</span></div>
                <div><span className="k">CCIP fee</span><span className="v">Paid in native gas</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="xchg rv">
          <BridgeExchange />

          {/* Order history */}
          <div className="acc ohist">
            <div className="ohead">
              <span className="otitle">Orders</span>
            </div>
            <div className="ord-filters"><button className="ofilter on" data-filter="all">All</button><button className="ofilter" data-filter="pending">Pending</button><button className="ofilter" data-filter="filled">Filled</button><button className="ofilter" data-filter="finalized">Finalized</button><button className="ofilter" data-filter="cancelled">Cancelled</button></div>
            <div className="osearch"><Search className="osearch-ico" /><input type="text" placeholder="Search by transaction hash" aria-label="Search by transaction hash" /></div>
            <div className="olist">
              {ORDERS.map((o, i) => <BridgeOrder key={i} {...o} />)}
            </div>
            <button type="button" className="omore" data-omore>Show more <ChevronDown /></button>
          </div>
        </div>

      </div>
    </div>
  );
}
