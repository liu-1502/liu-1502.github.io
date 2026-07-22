"use client";

import { useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";
import { chainSrc } from "@/lib/assets";
import type { Chain } from "@/lib/types";

/** Bộ chọn chain ở topbar. State lưu ở localStorage và phát sự kiện "yuzu-chain"
 *  để phần còn lại của app phản ứng — đúng hành vi app.js gốc. */
const CHAINS: Chain[] = [
  { id: "all", name: "All chains" },
  { id: "plasma", name: "Plasma", img: chainSrc("plasma") },
  { id: "monad", name: "Monad", img: chainSrc("monad") },
  { id: "ethereum", name: "Ethereum", img: chainSrc("ethereum") },
  { id: "sei", name: "SEI EVM", letter: "S" },
];

const Globe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" />
  </svg>
);

function ChainIcon({ c }: { c: Chain }) {
  if (c.img) return <img src={c.img} alt="" />;
  if (c.letter) return <i className="ch-l">{c.letter}</i>;
  return <Globe />;
}

export default function ChainSelector() {
  const [cur, setCur] = useState("all");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readStorage(STORAGE_KEYS.chain, "all");
    setCur(CHAINS.some((x) => x.id === saved) ? saved : "all");
  }, []);

  // Đóng khi click ra ngoài. Kiểm tra ref.contains để bỏ qua click bên trong —
  // tránh việc React delegate onClick lên root khiến stopPropagation không chặn
  // được listener trên document. Gắn một lần (deps []); click bên trong là no-op.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const pick = (id: string) => {
    setCur(id);
    writeStorage(STORAGE_KEYS.chain, id);
    setOpen(false);
    document.dispatchEvent(new CustomEvent("yuzu-chain", { detail: { chain: id } }));
  };

  const current = CHAINS.find((x) => x.id === cur) ?? CHAINS[0];

  return (
    <div className={`chain-sel${open ? " open" : ""}`} ref={ref}>
      <button
        className="chain-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ChainIcon c={current} />
        <span>{current.name}</span>
        <b className="caret">&#9662;</b>
      </button>
      <div className="chain-menu" role="listbox">
        {CHAINS.map((x) => (
          <button
            key={x.id}
            role="option"
            aria-selected={x.id === cur}
            className={x.id === cur ? "on" : ""}
            onClick={() => pick(x.id)}
          >
            <ChainIcon c={x} />
            <span>{x.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
