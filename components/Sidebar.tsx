"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { pageMeta } from "@/lib/pages";
import type { NavItem } from "@/lib/types";

/* Icon cho các mục cấp 1 (khớp bản gốc app.js). */
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

/* Điều hướng khai báo bằng dữ liệu.
   - Cấp 1: mục có icon, canh thẳng với logo.
   - Cấp 2 (children): Alpha/Prime/Marketplace nằm dưới Dashboard, thụt vào rail. */
const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Products",
    items: [
      {
        nav: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: <IconDash />,
        children: [
          { nav: "alpha", label: "Alpha", href: "/alpha", meta: "7.75-27%" },
          { nav: "prime", label: "Prime", href: "/prime", meta: "7.00%" },
          { nav: "mkt", label: "Marketplace", href: "/marketplace", meta: "2 live" },
        ],
      },
    ],
  },
  {
    heading: "Earn",
    items: [
      { nav: "opportunities", label: "Opportunities", href: "/opportunities", icon: <IconOpps />, meta: "16 live" },
      { nav: "points", label: "Points", href: "/points", icon: <IconPoints />, meta: "#95" },
    ],
  },
  {
    heading: "Protocol",
    items: [
      { nav: "transparency", label: "Transparency", href: "/transparency", icon: <IconTransparency /> },
      { nav: "whitelist", label: "Whitelist", href: "/whitelist", icon: <IconWhitelist /> },
      { nav: "bridge", label: "Bridge", href: "/bridge", icon: <IconBridge /> },
      { nav: "docs", label: "Docs", href: "/docs", icon: <IconDocs /> },
    ],
  },
  {
    heading: "Links",
    items: [
      { label: "Research", href: "https://research.yuzu.money/", external: true },
      { label: "Accountable", href: "https://yuzu.accountable.capital/", external: true },
      { label: "Telegram", href: "https://t.me/yuzumoney_stats", external: true },
      { label: "Discord", href: "https://discord.gg/gjKw4KJyu8", external: true },
    ],
  },
];

function SideItem({ item, active, level2 }: { item: NavItem; active: string; level2?: boolean }) {
  const cls = `side-item${level2 ? " lvl2" : ""}${item.nav === active ? " on" : ""}`;
  if (item.external) {
    return (
      <a className={cls} href={item.href} target="_blank" rel="noopener">
        {item.label}
        <span className="ext">↗</span>
      </a>
    );
  }
  return (
    <Link
      className={cls}
      href={item.href}
      data-nav={item.nav}
      aria-current={item.nav === active ? "page" : undefined}
    >
      {item.icon}
      {item.label}
      {item.meta && <span className="meta">{item.meta}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const active = pageMeta(usePathname()).nav;
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

      {NAV_GROUPS.map((group) => (
        <div className="side-group" key={group.heading}>
          <h6>{group.heading}</h6>
          {group.items.map((item) => (
            <Fragment key={item.label}>
              <SideItem item={item} active={active} />
              {item.children && (
                <div className="side-sub">
                  {item.children.map((child) => (
                    <SideItem key={child.label} item={child} active={active} level2 />
                  ))}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      ))}

      <div className="side-foot">
        <span className="live">
          <span className="pulse"></span>LIVE APP
        </span>
      </div>
    </aside>
  );
}
