"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CircleHelp, X, ChevronRight, Search } from "lucide-react";

const WALLET_LOGO_BASE = "/assets/wallets";

export type WalletOption = { id: string; name: string; badge?: string };

/* Danh sách ví như modal reown/WalletConnect của Yuzu. */
export const WALLETS: WalletOption[] = [
  { id: "walletconnect", name: "WalletConnect", badge: "QR CODE" },
  { id: "binance", name: "Binance Wallet" },
  { id: "metamask", name: "MetaMask" },
  { id: "safepal", name: "SafePal" },
  { id: "trust", name: "Trust Wallet" },
];

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
                <img src={`${WALLET_LOGO_BASE}/${w.id}.svg`} alt="" width={32} height={32} />
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
      </div>
    </div>,
    document.body
  );
}
