"use client";

import { usePathname } from "next/navigation";
import { pageMeta } from "@/lib/pages";
import Button from "./ui/Button";
import ModeSwitch from "./topbar/ModeSwitch";
import EligibilityToggle from "./topbar/EligibilityToggle";
import ChainSelector from "./topbar/ChainSelector";
import ThemeToggle from "./topbar/ThemeToggle";

export default function Topbar() {
  const { title, crumb } = pageMeta(usePathname());
  return (
    <header className="topbar">
      {crumb ? <span className="crumb-in">{crumb} /</span> : null}
      <span className="ttl">{title}</span>
      <div className="right">
        <ModeSwitch />
        <EligibilityToggle />
        <ChainSelector />
        <ThemeToggle />
        <Button variant="solid">Connect Wallet</Button>
      </div>
    </header>
  );
}
