"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PanelLeft, Menu, LogOut, Wallet } from "lucide-react";
import Button from "./ui/Button";
import Logo from "./Logo";
import ChainSelector from "./topbar/ChainSelector";
import ThemeToggle from "./topbar/ThemeToggle";
import WalletModal from "./topbar/WalletModal";
import { STORAGE_KEYS } from "@/lib/constants";
import { OPEN_WALLET_EVENT } from "@/lib/wallet";
import { MOBILE_NAV_CLOSE_EVENT } from "@/lib/mobileNav";

/* Địa chỉ ví demo hiển thị sau khi "connect" (UI clone, không có web3 thật). */
const DEMO_ADDRESS = "0x7bd4…9e2c";

export default function Topbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [wallet, setWallet] = useState(true); // demo: mặc định đã có ví
  const [modalOpen, setModalOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedCollapsed = localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) === "1";
    setCollapsed(savedCollapsed);
    document.documentElement.classList.toggle("sidebar-collapsed", savedCollapsed);

    // Demo: chưa có lựa chọn lưu nào -> coi như đã kết nối ví; chỉ ngắt khi user tự disconnect.
    const saved = localStorage.getItem(STORAGE_KEYS.wallet);
    const connected = saved === null ? true : saved === "1";
    setWallet(connected);
    document.documentElement.setAttribute("data-wallet", connected ? "1" : "0");
  }, []);

  /* CTA "Connect wallet" trong các form phát event -> mở modal */
  useEffect(() => {
    const open = () => setModalOpen(true);
    document.addEventListener(OPEN_WALLET_EVENT, open);
    return () => document.removeEventListener(OPEN_WALLET_EVENT, open);
  }, []);

  /* Drawer điều hướng mobile: đồng bộ class root + đóng bằng scrim/link/Esc */
  useEffect(() => {
    document.documentElement.classList.toggle("mobile-nav-open", mobileNavOpen);
  }, [mobileNavOpen]);

  useEffect(() => {
    const close = () => setMobileNavOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileNavOpen(false);
    document.addEventListener(MOBILE_NAV_CLOSE_EVENT, close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener(MOBILE_NAV_CLOSE_EVENT, close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  /* đổi trang -> đóng drawer mobile */
  useEffect(() => setMobileNavOpen(false), [pathname]);

  /* đóng dropdown account khi click ra ngoài */
  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [accountOpen]);

  const toggleSidebar = () => {
    setCollapsed((c) => {
      const next = !c;
      document.documentElement.classList.toggle("sidebar-collapsed", next);
      localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, next ? "1" : "0");
      return next;
    });
  };

  const setWalletState = (connected: boolean) => {
    setWallet(connected);
    document.documentElement.setAttribute("data-wallet", connected ? "1" : "0");
    localStorage.setItem(STORAGE_KEYS.wallet, connected ? "1" : "0");
    document.dispatchEvent(new CustomEvent("yuzu-wallet", { detail: { connected } }));
  };

  const handleConnect = () => {
    setModalOpen(false);
    setWalletState(true);
  };

  const handleDisconnect = () => {
    setAccountOpen(false);
    setWalletState(false);
  };

  return (
    <header className="topbar">
      <button
        type="button"
        className="nav-toggle"
        onClick={() => setMobileNavOpen((o) => !o)}
        aria-label="Open menu"
        aria-expanded={mobileNavOpen}
      >
        <Menu />
      </button>
      <button
        type="button"
        className="side-toggle"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
      >
        <PanelLeft />
      </button>
      <Link className="brand topbar-brand" href="/" aria-label="Yuzu home">
        <Logo />
      </Link>
      <div className="right">
        <ChainSelector />
        <ThemeToggle />
        {wallet ? (
          <div className="acct-wrap" ref={accountRef}>
            <Button variant="solid" onClick={() => setAccountOpen((o) => !o)} aria-expanded={accountOpen}>
              <Wallet size={17} strokeWidth={2.1} />
              {DEMO_ADDRESS}
            </Button>
            {accountOpen && (
              <div className="acct-menu" role="menu">
                <button type="button" className="acct-disconnect" role="menuitem" onClick={handleDisconnect}>
                  <LogOut />
                  Disconnect
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button variant="solid" onClick={() => setModalOpen(true)}>
            <Wallet size={17} strokeWidth={2.1} />
            Connect Wallet
          </Button>
        )}
      </div>
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} onConnect={handleConnect} />
    </header>
  );
}
