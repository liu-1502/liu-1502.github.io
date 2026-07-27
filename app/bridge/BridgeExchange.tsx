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

  // Mở/đóng dropdown "About the bridge" (nút nằm trong page.tsx là Server Component).
  useEffect(() => {
    const btn = document.querySelector("[data-about-toggle]") as HTMLElement | null;
    const menu = document.querySelector("[data-about-menu]") as HTMLElement | null;
    const close = document.querySelector("[data-about-close]") as HTMLElement | null;
    const setOpen = (o: boolean) => {
      if (menu) {
        menu.hidden = !o;
        btn?.setAttribute("aria-expanded", o ? "true" : "false");
      }
    };
    const onBtn = (e: Event) => {
      e.stopPropagation();
      if (menu) setOpen(menu.hidden);
    };
    const onClose = (e: Event) => {
      e.stopPropagation();
      setOpen(false);
    };
    const onOut = (e: MouseEvent) => {
      if (menu && !menu.hidden && !menu.contains(e.target as Node) && !btn?.contains(e.target as Node)) setOpen(false);
    };
    btn?.addEventListener("click", onBtn);
    close?.addEventListener("click", onClose);
    document.addEventListener("click", onOut);
    return () => {
      btn?.removeEventListener("click", onBtn);
      close?.removeEventListener("click", onClose);
      document.removeEventListener("click", onOut);
    };
  }, []);

  // Today Order: chọn item + lọc theo token qua chips.
  useEffect(() => {
    const hs: Array<{ el: Element; fn: (e: Event) => void }> = [];
    document.querySelectorAll(".pg-bridge .olist").forEach((list) => {
      const fn = (e: Event) => {
        const item = (e.target as Element).closest(".ord");
        if (!item || !list.contains(item)) return;
        list.querySelectorAll(".ord").forEach((x) => x.classList.remove("on"));
        item.classList.add("on");
      };
      list.addEventListener("click", fn);
      hs.push({ el: list, fn });
    });
    document.querySelectorAll(".pg-bridge .ord-filters").forEach((fr) => {
      const fn = (e: Event) => {
        const b = (e.target as Element).closest(".ofilter");
        if (!b || !fr.contains(b)) return;
        fr.querySelectorAll(".ofilter").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const f = b.getAttribute("data-filter");
        fr.parentElement?.querySelector(".olist")?.querySelectorAll<HTMLElement>(".ord").forEach((o) => {
          o.style.display = f === "all" || o.getAttribute("data-kind") === f ? "" : "none";
        });
      };
      fr.addEventListener("click", fn);
      hs.push({ el: fr, fn });
    });
    return () => hs.forEach(({ el, fn }) => el.removeEventListener("click", fn));
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
