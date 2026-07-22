"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { pageMeta } from "@/lib/pages";

/* Icon set — trước đây nằm trong biến ICONS của app.js. */
const IconDash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);
const IconOpps = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M4 19.5 9.5 14l3.5 3.5 7-7.5" />
    <path d="M15.5 10h4.5v4.5" />
  </svg>
);
const IconPoints = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 3.5s5.5 6 5.5 10a5.5 5.5 0 1 1-11 0c0-4 5.5-10 5.5-10z" />
  </svg>
);
const IconTransparency = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const IconWhitelist = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M4 6h16M4 12h16M4 18h10" />
    <path d="m17.5 16.5 1.8 1.8 3-3.3" strokeLinecap="round" />
  </svg>
);
const IconBridge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 16c3-6 15-6 18 0M3 16v3m18-3v3M8 13.2V19m8-5.8V19" />
  </svg>
);
const IconDocs = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M6 3.5h9L19 8v12.5H6z" />
    <path d="M14.5 3.5V8H19M9 12h6M9 15.5h6" />
  </svg>
);

export default function Sidebar() {
  const pathname = usePathname();
  const active = pageMeta(pathname).nav;
  const on = (nav: string) => `side-item${active === nav ? " on" : ""}`;

  return (
    <aside className="side">
      <Link className="brand" href="/">
        <Logo />
        Yuzu <small>App</small>
      </Link>
      <p className="side-tag">
        Risk-curated onchain strategies, packaged as structured yield products.
        Capital preservation first.
      </p>

      <div className="side-group">
        <h6>Products</h6>
        <Link className={on("dashboard")} href="/">
          <IconDash />
          Dashboard
        </Link>
        <Link className={on("alpha")} href="/alpha">
          Alpha<span className="meta">7.75-27%</span>
        </Link>
        <Link className={on("prime")} href="/prime">
          Prime<span className="meta">7.00%</span>
        </Link>
        <Link className={on("mkt")} href="/marketplace">
          Marketplace<span className="meta">2 live</span>
        </Link>
      </div>

      <div className="side-group">
        <h6>Earn</h6>
        <Link className={on("opportunities")} href="/opportunities">
          <IconOpps />
          Opportunities<span className="meta">16 live</span>
        </Link>
        <Link className={on("points")} href="/points">
          <IconPoints />
          Points<span className="meta">#95</span>
        </Link>
      </div>

      <div className="side-group">
        <h6>Protocol</h6>
        <Link className={on("transparency")} href="/transparency">
          <IconTransparency />
          Transparency
        </Link>
        <Link className={on("whitelist")} href="/whitelist">
          <IconWhitelist />
          Whitelist
        </Link>
        <Link className={on("bridge")} href="/bridge">
          <IconBridge />
          Bridge
        </Link>
        <Link className={on("docs")} href="/docs">
          <IconDocs />
          Docs
        </Link>
      </div>

      <div className="side-group">
        <h6>Links</h6>
        <a className="side-item" href="https://research.yuzu.money/" target="_blank" rel="noopener">
          Research<span className="ext">↗</span>
        </a>
        <a className="side-item" href="https://yuzu.accountable.capital/" target="_blank" rel="noopener">
          Accountable<span className="ext">↗</span>
        </a>
        <a className="side-item" href="https://t.me/yuzumoney_stats" target="_blank" rel="noopener">
          Telegram<span className="ext">↗</span>
        </a>
        <a className="side-item" href="https://discord.gg/gjKw4KJyu8" target="_blank" rel="noopener">
          Discord<span className="ext">↗</span>
        </a>
      </div>

      <div className="side-foot">
        <span className="live">
          <span className="pulse"></span>LIVE APP
        </span>
      </div>
    </aside>
  );
}
