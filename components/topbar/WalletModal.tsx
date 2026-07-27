"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CircleHelp, X, ChevronRight, Search } from "lucide-react";

export type WalletOption = { id: string; name: string; badge?: string };

/* Danh sách ví như modal reown/WalletConnect của Yuzu. */
export const WALLETS: WalletOption[] = [
  { id: "walletconnect", name: "WalletConnect", badge: "QR CODE" },
  { id: "binance", name: "Binance Wallet" },
  { id: "metamask", name: "MetaMask" },
  { id: "safepal", name: "SafePal" },
  { id: "trust", name: "Trust Wallet" },
];

/* ---- Icon ví (inline SVG, đơn sắc thương hiệu — không phụ thuộc network) ---- */
function WalletIcon({ id }: { id: string }) {
  switch (id) {
    case "walletconnect":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="#3B99FC" />
          <path
            d="M10 13c3.3-3.2 8.7-3.2 12 0l.4.4c.16.16.16.42 0 .58l-1.37 1.34c-.08.08-.2.08-.29 0l-.55-.54c-2.3-2.24-6.02-2.24-8.32 0l-.6.58c-.08.08-.2.08-.29 0l-1.37-1.34c-.16-.16-.16-.42 0-.58l.38-.44zm14.83 2.76l1.22 1.19c.16.16.16.42 0 .58l-5.5 5.38c-.16.16-.42.16-.58 0l-3.9-3.82a.1.1 0 00-.15 0l-3.9 3.82c-.16.16-.42.16-.58 0l-5.5-5.38c-.16-.16-.16-.42 0-.58l1.22-1.19c.16-.16.42-.16.58 0l3.9 3.82a.1.1 0 00.15 0l3.9-3.82c.16-.16.42-.16.58 0l3.9 3.82a.1.1 0 00.15 0l3.9-3.82c.16-.16.42-.16.58 0z"
            fill="#fff"
          />
        </svg>
      );
    case "binance":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="#F0B90B" />
          <g fill="#fff">
            <path d="M16 8.4l2.6 2.6L16 13.6 13.4 11 16 8.4z" />
            <path d="M20.9 13.3l2.7 2.7-2.7 2.7-2.6-2.7 2.6-2.7z" />
            <path d="M11.1 13.3l2.6 2.7-2.6 2.7L8.4 16l2.7-2.7z" />
            <path d="M16 18.4l2.6 2.6L16 23.6 13.4 21l2.6-2.6z" />
            <path d="M16 13.6l2.4 2.4-2.4 2.4-2.4-2.4 2.4-2.4z" />
          </g>
        </svg>
      );
    case "metamask":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="#fff" />
          <g fill="#E2761B" stroke="#E2761B" strokeWidth="0.6" strokeLinejoin="round">
            <path d="M7.5 8l6.2 4.3-1.1-2.9L7.5 8z" />
            <path d="M24.5 8l-6.1 4.4 1.1-3L24.5 8z" />
            <path d="M22.2 19.5l-1.7 2.6 3.6 1 .1-.1.9-3.4-2.9-.1z" />
            <path d="M9.2 19.6l.9 3.4h.1l3.6-1-1.7-2.6-2.9.2z" />
          </g>
          <g fill="#F6851B" stroke="#F6851B" strokeWidth="0.6" strokeLinejoin="round">
            <path d="M13.7 14.4l-1.1 1.7 3.6.2-.1-3.9-2.4 2z" />
            <path d="M18.3 14.4l-2.5-2 -.1 3.9 3.7-.2-1.1-1.7z" />
            <path d="M13.8 22.1l2.2-1-1.9-1.5-.3 2.5z" />
            <path d="M16 21.1l2.2 1-.3-2.5-1.9 1.5z" />
          </g>
        </svg>
      );
    case "safepal":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="#4A63E7" />
          <path
            d="M16 8.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm0 3.2a4.3 4.3 0 11-3.3 7.05l6.1-6.1A4.28 4.28 0 0016 11.7z"
            fill="#fff"
          />
        </svg>
      );
    case "trust":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="9" fill="#3375BB" />
          <path
            d="M16 7.5l6 2.2v4.5c0 4.1-2.7 6.9-6 8.3-3.3-1.4-6-4.2-6-8.3V9.7l6-2.2z"
            fill="#fff"
          />
        </svg>
      );
    default:
      return null;
  }
}

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (wallet: WalletOption) => void;
}

/* Modal chọn ví — layout theo reown AppKit (Yuzu), style theo design tokens (light mode). */
export default function WalletModal({ open, onClose, onConnect }: WalletModalProps) {
  /* Portal cần document -> chỉ mount phía client (dự án dùng static export). */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="wm-overlay" onClick={onClose}>
      <div
        className="wm-card"
        role="dialog"
        aria-modal="true"
        aria-label="Connect Wallet"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="wm-head">
          <button type="button" className="wm-icon-btn" aria-label="Help">
            <CircleHelp />
          </button>
          <span className="wm-title">Connect Wallet</span>
          <button type="button" className="wm-icon-btn" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="wm-list">
          {WALLETS.map((w) => (
            <button key={w.id} type="button" className="wm-item" onClick={() => onConnect(w)}>
              <span className="wm-ic">
                <WalletIcon id={w.id} />
              </span>
              <span className="wm-name">{w.name}</span>
              {w.badge && <span className="wm-badge">{w.badge}</span>}
              <ChevronRight className="wm-chev" />
            </button>
          ))}
          <button type="button" className="wm-item" onClick={onClose}>
            <span className="wm-ic wm-ic-search">
              <Search />
            </span>
            <span className="wm-name">Search Wallet</span>
            <span className="wm-count">530+</span>
            <ChevronRight className="wm-chev" />
          </button>
        </div>

        <div className="wm-foot">
          UX by <span className="wm-reown">reown</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
