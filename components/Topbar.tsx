"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { pageMeta } from "@/lib/pages";

/* ---------- mode lite / pro ---------- */
function ModeSwitch() {
  const [mode, setMode] = useState<string>("lite");
  useEffect(() => {
    let m = "lite";
    try {
      m = localStorage.getItem("yuzu-mode") || "lite";
    } catch {}
    setMode(m);
  }, []);
  const apply = (m: string) => {
    setMode(m);
    document.documentElement.setAttribute("data-mode", m);
    try {
      localStorage.setItem("yuzu-mode", m);
    } catch {}
  };
  return (
    <span className="mode-switch" role="group" aria-label="Detail level">
      <button className={mode === "lite" ? "on" : ""} onClick={() => apply("lite")}>
        LITE
      </button>
      <button className={mode === "pro" ? "on" : ""} onClick={() => apply("pro")}>
        PRO
      </button>
    </span>
  );
}

/* ---------- eligibility demo toggle ---------- */
function EligibilityToggle() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    let e = false;
    try {
      e = localStorage.getItem("yuzu-eligible") === "1";
    } catch {}
    setOk(e);
  }, []);
  const toggle = () => {
    const next = !ok;
    setOk(next);
    document.documentElement.setAttribute("data-eligible", next ? "1" : "0");
    try {
      localStorage.setItem("yuzu-eligible", next ? "1" : "0");
    } catch {}
    document.dispatchEvent(new CustomEvent("yuzu-eligible", { detail: { ok: next } }));
  };
  return (
    <button
      className="elig-toggle"
      aria-pressed={ok}
      title="Demo: simulate KYC eligibility"
      onClick={toggle}
    >
      <i>&#10003;</i>ELIGIBLE
    </button>
  );
}

/* ---------- chain selector ---------- */
type Chain = { id: string; name: string; img?: string; letter?: string };
const CHAINS: Chain[] = [
  { id: "all", name: "All chains" },
  { id: "plasma", name: "Plasma", img: "/assets/chains/plasma.svg" },
  { id: "monad", name: "Monad", img: "/assets/chains/monad.svg" },
  { id: "ethereum", name: "Ethereum", img: "/assets/chains/ethereum.svg" },
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

function ChainSelector() {
  const [cur, setCur] = useState("all");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let c = "all";
    try {
      c = localStorage.getItem("yuzu-chain") || "all";
    } catch {}
    if (!CHAINS.some((x) => x.id === c)) c = "all";
    setCur(c);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const pick = (id: string) => {
    setCur(id);
    try {
      localStorage.setItem("yuzu-chain", id);
    } catch {}
    setOpen(false);
    document.dispatchEvent(new CustomEvent("yuzu-chain", { detail: { chain: id } }));
  };

  const current = CHAINS.find((x) => x.id === cur) || CHAINS[0];

  return (
    <div className={`chain-sel${open ? " open" : ""}`} ref={ref}>
      <button
        className="chain-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
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
            className={x.id === cur ? "on" : ""}
            onClick={(e) => {
              e.stopPropagation();
              pick(x.id);
            }}
          >
            <ChainIcon c={x} />
            <span>{x.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- theme toggle ---------- */
function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    try {
      localStorage.setItem("yuzu-theme", dark ? "light" : "dark");
    } catch {}
  };
  return (
    <button className="theme-btn" aria-label="Toggle theme" onClick={toggle}>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}

export default function Topbar() {
  const pathname = usePathname();
  const { title, crumb } = pageMeta(pathname);
  return (
    <header className="topbar">
      {crumb ? <span className="crumb-in">{crumb} /</span> : null}
      <span className="ttl">{title}</span>
      <div className="right">
        <ModeSwitch />
        <EligibilityToggle />
        <ChainSelector />
        <ThemeToggle />
        <button className="btn btn-solid">Connect Wallet</button>
      </div>
    </header>
  );
}
