"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PanelLeft } from "lucide-react";
import Logo from "./Logo";
import Button from "./ui/Button";
import ModeSwitch from "./topbar/ModeSwitch";
import ChainSelector from "./topbar/ChainSelector";
import ThemeToggle from "./topbar/ThemeToggle";

export default function Topbar() {
  const [collapsed, setCollapsed] = useState(false);
  const [wallet, setWallet] = useState(false);

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("sidebarCollapsed") === "1";
    setCollapsed(savedCollapsed);
    document.documentElement.classList.toggle("sidebar-collapsed", savedCollapsed);

    const savedWallet = localStorage.getItem("walletConnected") === "1";
    setWallet(savedWallet);
    document.documentElement.setAttribute("data-wallet", savedWallet ? "1" : "0");
  }, []);

  const toggleSidebar = () => {
    setCollapsed((c) => {
      const next = !c;
      document.documentElement.classList.toggle("sidebar-collapsed", next);
      localStorage.setItem("sidebarCollapsed", next ? "1" : "0");
      return next;
    });
  };

  const toggleWallet = () => {
    setWallet((w) => {
      const next = !w;
      document.documentElement.setAttribute("data-wallet", next ? "1" : "0");
      localStorage.setItem("walletConnected", next ? "1" : "0");
      document.dispatchEvent(new CustomEvent("yuzu-wallet", { detail: { connected: next } }));
      return next;
    });
  };

  return (
    <header className="topbar">
      <button
        type="button"
        className="side-toggle"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-pressed={collapsed}
      >
        <PanelLeft />
      </button>
      <span className="tb-divider" aria-hidden="true" />
      <Link className="brand" href="/">
        <Logo />
      </Link>
      <div className="right">
        <ModeSwitch />
        <ChainSelector />
        <ThemeToggle />
        <Button variant="solid" onClick={toggleWallet}>{wallet ? "0x7bd4…9e2c" : "Connect Wallet"}</Button>
      </div>
    </header>
  );
}
