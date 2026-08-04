"use client";

import { useEffect, useRef, useState } from "react";
import { chainSrc } from "@/lib/assets";
import { requestConnectWallet } from "@/lib/wallet";
import TokenIcon from "@/components/ui/TokenIcon";
import { ArrowUpDown } from "lucide-react";

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

/** Bộ chọn kết hợp TOKEN + CHAIN cho mỗi ô số tiền. `open` do cha điều phối để chỉ mở một cái. */
function TokenChainSelect({
  tokenSym,
  chain,
  options,
  open,
  onToggle,
  onPick,
}: {
  tokenSym: string;
  chain: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onPick: (v: string) => void;
}) {
  return (
    <div className={`tc-wrap chx${open ? " open" : ""}`}>
      <button
        type="button"
        className="tok-chain"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="tc-icon">
          <TokenIcon sym={tokenSym} />
          <span className="tc-badge">
            <ChainIcon name={chain} />
          </span>
        </span>
        <span className="tc-text">
          <span className="tc-tok">{tokenSym}</span>
          <span className="tc-chain">{chain}</span>
        </span>
        <b className="tc-caret">&#9662;</b>
      </button>
      <div className="chain-menu" role="listbox">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            role="option"
            aria-selected={c === chain}
            className={c === chain ? "on" : undefined}
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

  // Đồng bộ panel chi tiết bên phải (syzUSD / yzPrime) theo token đang chọn.
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".pg-bridge [data-tokenpanel]").forEach((p) => {
      p.style.display = p.getAttribute("data-tokenpanel") === token ? "" : "none";
    });
  }, [token]);

  // Orders: lọc theo trạng thái + tìm theo tx hash; mặc định hiện 3, "Show more" +10.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pg-bridge .ohist");
    if (!root) return;
    const list = root.querySelector<HTMLElement>(".olist");
    const btn = root.querySelector<HTMLElement>("[data-omore]");
    const filters = root.querySelector<HTMLElement>(".ord-filters");
    const search = root.querySelector<HTMLInputElement>(".osearch input");
    if (!list || !btn) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".ord"));
    let statusFilter = "all";
    let query = "";
    let shown = 3;

    const matches = (r: HTMLElement) => {
      const okStatus = statusFilter === "all" || r.getAttribute("data-status") === statusFilter;
      const okQuery = !query || (r.querySelector(".otx")?.textContent || "").toLowerCase().includes(query);
      return okStatus && okQuery;
    };
    const apply = () => {
      let matched = 0;
      rows.forEach((r) => {
        if (matches(r)) { r.style.display = matched < shown ? "" : "none"; matched++; }
        else r.style.display = "none";
      });
      btn.style.display = matched > shown ? "" : "none";
    };
    apply();

    const onFilter = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".ofilter");
      if (!b) return;
      filters?.querySelectorAll(".ofilter").forEach((x) => x.classList.toggle("on", x === b));
      statusFilter = b.getAttribute("data-filter") || "all";
      shown = 3;
      apply();
    };
    const onSearch = () => { query = (search?.value || "").trim().toLowerCase(); shown = 3; apply(); };
    const onMore = () => { shown += 10; apply(); };
    filters?.addEventListener("click", onFilter);
    search?.addEventListener("input", onSearch);
    btn.addEventListener("click", onMore);
    return () => {
      filters?.removeEventListener("click", onFilter);
      search?.removeEventListener("input", onSearch);
      btn.removeEventListener("click", onMore);
    };
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
    <>
      <div className="tok-tabs">
        {TOKENS.map((tk) => (
          <button
            key={tk.id}
            className={"tok-tab" + (token === tk.id ? " on" : "")}
            onClick={() => pickToken(tk.id)}
          >
            <TokenIcon sym={tk.sym} />
            <span className="sym">{tk.sym}</span>
          </button>
        ))}
      </div>

      <div className="xchg-body">
      <div className="mfields" ref={selectsRef}>
        <div className="mfield">
          <div className="mfield-l">
            <span className="lbl">You send</span>
            <input type="text" inputMode="decimal" placeholder="0" data-src data-rate="1" aria-label="Amount to bridge" />
            <div className="xusd">≈ $0.00</div>
          </div>
          <div className="mfield-r">
            <TokenChainSelect
              tokenSym={tokenSym}
              chain={from}
              options={lanes}
              open={openSel === "from"}
              onToggle={() => setOpenSel((o) => (o === "from" ? null : "from"))}
              onPick={pickFrom}
            />
          </div>
        </div>

        <button type="button" className="swap-circle" aria-label="Swap chains" onClick={flip}>
          <ArrowUpDown />
        </button>

        <div className="mfield">
          <div className="mfield-l">
            <span className="lbl">You receive on destination</span>
            <input type="text" placeholder="0" data-dst readOnly aria-label="Amount received" />
            <div className="xusd">≈ $0.00</div>
          </div>
          <div className="mfield-r">
            <TokenChainSelect
              tokenSym={tokenSym}
              chain={to}
              options={lanes}
              open={openSel === "to"}
              onToggle={() => setOpenSel((o) => (o === "to" ? null : "to"))}
              onPick={pickTo}
            />
          </div>
        </div>
      </div>

      <button className="btn btn-accent btn-block" onClick={requestConnectWallet}>Connect Wallet</button>
      </div>
    </>
  );
}
