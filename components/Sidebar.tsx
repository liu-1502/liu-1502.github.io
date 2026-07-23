"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { pageMeta } from "@/lib/pages";
import type { NavItem } from "@/lib/types";

/* Icon cho từng nhóm (cấp 1). */
const IconProducts = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
);
const IconEarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M4 19.5 9.5 14l3.5 3.5 7-7.5" />
    <path d="M15.5 10h4.5v4.5" />
  </svg>
);
const IconProtocol = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 3.5 19 6v6c0 4.2-2.9 7-7 8.5C7.9 19 5 16.2 5 12V6z" />
    <path d="m9.2 12 2 2 3.6-3.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLinks = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.5 6.7" />
    <path d="M14 10a4 4 0 0 0-5.7 0L5.5 12.8a4 4 0 0 0 5.7 5.7L12.5 17.3" />
  </svg>
);
const IconCaret = () => (
  <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Điều hướng khai báo bằng dữ liệu: cấp 1 = nhóm (có icon), cấp 2 = mục con. */
const NAV_GROUPS: { heading: string; icon: React.ReactNode; items: NavItem[] }[] = [
  {
    heading: "Products",
    icon: <IconProducts />,
    items: [
      { nav: "dashboard", label: "Dashboard", href: "/" },
      { nav: "alpha", label: "Alpha", href: "/alpha", meta: "7.75-27%" },
      { nav: "prime", label: "Prime", href: "/prime", meta: "7.00%" },
      { nav: "mkt", label: "Marketplace", href: "/marketplace", meta: "2 live" },
    ],
  },
  {
    heading: "Earn",
    icon: <IconEarn />,
    items: [
      { nav: "opportunities", label: "Opportunities", href: "/opportunities", meta: "16 live" },
      { nav: "points", label: "Points", href: "/points", meta: "#95" },
    ],
  },
  {
    heading: "Protocol",
    icon: <IconProtocol />,
    items: [
      { nav: "transparency", label: "Transparency", href: "/transparency" },
      { nav: "whitelist", label: "Whitelist", href: "/whitelist" },
      { nav: "bridge", label: "Bridge", href: "/bridge" },
      { nav: "docs", label: "Docs", href: "/docs" },
    ],
  },
  {
    heading: "Links",
    icon: <IconLinks />,
    items: [
      { label: "Research", href: "https://research.yuzu.money/", external: true },
      { label: "Accountable", href: "https://yuzu.accountable.capital/", external: true },
      { label: "Telegram", href: "https://t.me/yuzumoney_stats", external: true },
      { label: "Discord", href: "https://discord.gg/gjKw4KJyu8", external: true },
    ],
  },
];

function SideItem({ item, active }: { item: NavItem; active: string }) {
  if (item.external) {
    return (
      <a className="nav-item" href={item.href} target="_blank" rel="noopener">
        {item.label}
        <span className="ext">↗</span>
      </a>
    );
  }
  const isActive = item.nav === active;
  return (
    <Link
      className={`nav-item${isActive ? " on" : ""}`}
      href={item.href}
      data-nav={item.nav}
      aria-current={isActive ? "page" : undefined}
    >
      {item.label}
      {item.meta && <span className="meta">{item.meta}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const active = pageMeta(usePathname()).nav;
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_GROUPS.map((g) => [g.heading, true]))
  );
  const toggle = (heading: string) => setOpen((o) => ({ ...o, [heading]: !o[heading] }));

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

      <nav className="nav">
        {NAV_GROUPS.map((group) => {
          const isOpen = open[group.heading];
          const listId = `nav-${group.heading.toLowerCase()}`;
          return (
            <div className="nav-group" data-open={isOpen} key={group.heading}>
              <button
                className="nav-parent"
                aria-expanded={isOpen}
                aria-controls={listId}
                onClick={() => toggle(group.heading)}
              >
                <span className="nav-parent-icon">{group.icon}</span>
                <span className="nav-parent-label">{group.heading}</span>
                <IconCaret />
              </button>
              <div className="nav-children" id={listId}>
                {group.items.map((item) => (
                  <SideItem key={item.label} item={item} active={active} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="side-foot">
        <span className="live">
          <span className="pulse"></span>LIVE APP
        </span>
      </div>
    </aside>
  );
}
