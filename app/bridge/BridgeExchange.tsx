"use client";

import { useEffect, useRef, useState } from "react";
import { chainSrc } from "@/lib/assets";
import Button from "@/components/ui/Button";
import TokenIcon from "@/components/ui/TokenIcon";
import TokenPill from "@/components/ui/TokenPill";

/* Cấu hình bridge — trước đây là các biến trong BridgeClient (innerHTML). */
type TokenId = "syzusd" | "yzprime";
const TOKENS: { id: TokenId; sym: string }[] = [
  { id: "syzusd", sym: "syzUSD" },
  { id: "yzprime", sym: "yzPrime" },
];
const LANES: Record<TokenId, string[]> = {
  syzusd: ["Plasma", "Monad", "Ethereum", "HyperEVM", "Sei", "Pharos"],
  yzprime: ["Monad", "Ethereum"],
};
const CHAIN_IMG: Record<string, string> = {
  Plasma: chainSrc("plasma"),
  Monad: chainSrc("monad"),
  Ethereum: chainSrc("ethereum"),
};

function ChainIcon({ name }: { name: string }) {
  return CHAIN_IMG[name] ? <img src={CHAIN_IMG[name]} alt="" /> : <i className="ch-l">{name.charAt(0)}</i>;
}

/** Dropdown chọn chain (from/to). `open` do cha điều phối để chỉ mở một cái. */
function ChainSelect({
  value,
  options,
  open,
  onToggle,
  onPick,
  ariaLabel,
}: {
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onPick: (v: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className={`chain-sel chx${open ? " open" : ""}`} aria-label={ariaLabel}>
      <button
        className="chain-btn"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        <ChainIcon name={value} />
        <span>{value}</span>
        <b className="caret">&#9662;</b>
      </button>
      <div className="chain-menu" role="listbox">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            role="option"
            aria-selected={c === value}
            className={c === value ? "on" : undefined}
            onClick={() => onPick(c)}
          >
            <ChainIcon name={c} />
            <span>{c}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const next = (lanes: string[], v: string) => lanes[(lanes.indexOf(v) + 1) % lanes.length];

export default function BridgeExchange() {
  const [token, setToken] = useState<TokenId>("syzusd");
  const [from, setFrom] = useState("Plasma");
  const [to, setTo] = useState("Monad");
  const [openSel, setOpenSel] = useState<"from" | "to" | null>(null);
  const selectsRef = useRef<HTMLDivElement>(null);

  const lanes = LANES[token];
  const tokenSym = TOKENS.find((t) => t.id === token)!.sym;

  // Đóng dropdown khi click ra ngoài vùng chọn chain.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (selectsRef.current && !selectsRef.current.contains(e.target as Node)) setOpenSel(null);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Chọn from/to: nếu trùng nhau thì đẩy cái còn lại sang lane kế tiếp (dedupe).
  const pickFrom = (v: string) => {
    setFrom(v);
    if (v === to) setTo(next(lanes, v));
    setOpenSel(null);
  };
  const pickTo = (v: string) => {
    setTo(v);
    if (v === from) setFrom(next(lanes, v));
    setOpenSel(null);
  };
  const flip = () => {
    setFrom(to);
    setTo(from);
  };
  const pickToken = (id: TokenId) => {
    const l = LANES[id];
    let f = l.includes(from) ? from : l[0];
    let t = l.includes(to) ? to : l[0];
    if (f === t) t = next(l, f);
    setToken(id);
    setFrom(f);
    setTo(t);
  };

  return (
    <div className="xchg-body">
      <div className="token-select">
        {TOKENS.map((tk) => (
          <button key={tk.id} className={token === tk.id ? "on" : undefined} onClick={() => pickToken(tk.id)}>
            <TokenIcon sym={tk.sym} />
            {tk.sym}
          </button>
        ))}
      </div>

      <div className="chain-select" ref={selectsRef}>
        <div className="chain-box">
          <div className="cl">From</div>
          <ChainSelect
            value={from}
            options={lanes}
            open={openSel === "from"}
            onToggle={() => setOpenSel((o) => (o === "from" ? null : "from"))}
            onPick={pickFrom}
            ariaLabel="Source chain"
          />
        </div>
        <button className="flip" aria-label="Swap chains" onClick={flip}>
          ↔
        </button>
        <div className="chain-box">
          <div className="cl">To</div>
          <ChainSelect
            value={to}
            options={lanes}
            open={openSel === "to"}
            onToggle={() => setOpenSel((o) => (o === "to" ? null : "to"))}
            onPick={pickTo}
            ariaLabel="Destination chain"
          />
        </div>
      </div>

      <div className="xfield" style={{ borderTop: "1px solid var(--line)", paddingTop: 16 }}>
        <div className="xlabel">
          <span>You send</span>
          <span>
            Balance 0.00 <button type="button">Max</button>
          </span>
        </div>
        <div className="xrow">
          <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="1" aria-label="Amount to bridge" />
          <TokenPill sym={tokenSym} label={tokenSym} />
        </div>
        <div className="xusd">≈ $0.00</div>
      </div>

      <div className="xdivider">
        <span>↓</span>
      </div>

      <div className="xfield">
        <div className="xlabel">
          <span>You receive on destination</span>
        </div>
        <div className="xrow">
          <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received" />
          <TokenPill sym={tokenSym} label={tokenSym} />
        </div>
      </div>

      <div className="xmeta">
        <div><span className="k">Mechanism</span><span className="v">Burn on source, mint on destination</span></div>
        <div><span className="k">Slippage</span><span className="v hi">Zero, exact amount arrives</span></div>
        <div><span className="k">Estimated time</span><span className="v">~20 minutes</span></div>
        <div><span className="k">CCIP fee</span><span className="v">Paid in native gas</span></div>
      </div>

      <Button block>Connect Wallet</Button>

      <div className="lane-note">
        <span className="pulse"></span>All lanes healthy. Per-lane rate limits enforced onchain.
      </div>
    </div>
  );
}
