"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Droplet,
  Eye,
  ListChecks,
  ArrowLeftRight,
  FileText,
  ChevronDown,
  ArrowUpRight,
  Coins,
  Landmark,
  Store,
} from "lucide-react";
import Logo from "./Logo";
import ModeSwitch from "./topbar/ModeSwitch";
import ThemeToggle from "./topbar/ThemeToggle";
import { pageMeta } from "@/lib/pages";
import { closeMobileNav } from "@/lib/mobileNav";
import type { NavItem } from "@/lib/types";

/* Điều hướng khai báo bằng dữ liệu. Tất cả đang là cấp 1 (canh thẳng với logo).
   Cấu trúc cấp 2 vẫn được hỗ trợ sẵn: chỉ cần thêm `children: [...]` vào một mục
   thì nó tự render kiểu thu gọn/mở (chevron + rail) — xem ParentItem bên dưới. */
const NAV_GROUPS: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Products",
    items: [
      { nav: "dashboard", label: "Dashboard", href: "/", icon: <LayoutDashboard /> },
      { nav: "alpha", label: "Alpha", href: "/alpha", icon: <Coins />, meta: "7.75-27%" },
      { nav: "prime", label: "Prime", href: "/prime", icon: <Landmark />, meta: "7.00%" },
      { nav: "mkt", label: "Marketplace", href: "/marketplace", icon: <Store />, meta: "2 live" },
    ],
  },
  {
    heading: "Earn",
    items: [
      { nav: "opportunities", label: "Opportunities", href: "/opportunities", icon: <TrendingUp />, meta: "16 live" },
      { nav: "points", label: "Points", href: "/points", icon: <Droplet />, meta: "#95" },
    ],
  },
  {
    heading: "Protocol",
    items: [
      { nav: "transparency", label: "Transparency", href: "/transparency", icon: <Eye /> },
      { nav: "whitelist", label: "Whitelist", href: "/whitelist", icon: <ListChecks /> },
      { nav: "bridge", label: "Bridge", href: "/bridge", icon: <ArrowLeftRight /> },
      { nav: "docs", label: "Docs", href: "/docs", icon: <FileText /> },
    ],
  },
  {
    heading: "Links",
    items: [
      { label: "Research", href: "https://research.yuzu.money/", external: true, icon: <img src="/assets/partners/yuzu-fav.png" alt="" /> },
      { label: "Accountable", href: "https://yuzu.accountable.capital/", external: true, icon: <img src="/assets/partners/accountable-fav.png" alt="" /> },
      { label: "Telegram", href: "https://t.me/yuzumoney_stats", external: true, icon: <img src="/assets/partners/telegram.svg" alt="" /> },
      { label: "Discord", href: "https://discord.gg/gjKw4KJyu8", external: true, icon: <img src="/assets/partners/discord.svg" alt="" /> },
    ],
  },
];

function SideItem({ item, active, level2 }: { item: NavItem; active: string; level2?: boolean }) {
  const cls = `side-item${level2 ? " lvl2" : ""}${item.nav === active ? " on" : ""}`;
  if (item.external) {
    return (
      <a className={cls} href={item.href} target="_blank" rel="noopener" title={item.label} onClick={closeMobileNav}>
        {item.icon}
        <span className="lbl">{item.label}</span>
        <ArrowUpRight className="ext" />
      </a>
    );
  }
  return (
    <Link
      className={cls}
      href={item.href}
      data-nav={item.nav}
      title={item.label}
      aria-current={item.nav === active ? "page" : undefined}
      onClick={closeMobileNav}
    >
      {item.icon}
      <span className="lbl">{item.label}</span>
      {item.meta && <span className="meta">{item.meta}</span>}
    </Link>
  );
}

/* Mục cấp 1 có mục con: hàng gồm link (điều hướng) + nút chevron (thu gọn/mở). */
function ParentItem({
  item,
  active,
  open,
  onToggle,
}: {
  item: NavItem;
  active: string;
  open: boolean;
  onToggle: () => void;
}) {
  const isActive = item.nav === active;
  const subId = `side-sub-${item.nav}`;
  return (
    <>
      <div className={`side-item side-parent${isActive ? " on" : ""}`} data-open={open}>
        <Link className="side-parent-link" href={item.href} data-nav={item.nav} aria-current={isActive ? "page" : undefined}>
          {item.icon}
          {item.label}
        </Link>
        <button
          type="button"
          className="side-caret"
          aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
          aria-expanded={open}
          aria-controls={subId}
          onClick={onToggle}
        >
          <ChevronDown />
        </button>
      </div>
      {open && item.children && (
        <div className="side-sub" id={subId}>
          {item.children.map((child) => (
            <SideItem key={child.label} item={child} active={active} level2 />
          ))}
        </div>
      )}
    </>
  );
}

export default function Sidebar() {
  const active = pageMeta(usePathname()).nav;
  // Mục nào có children thì mặc định mở sẵn (hiện chưa dùng — giữ cho tính năng level-2 sau này).
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    NAV_GROUPS.forEach((g) =>
      g.items.forEach((it) => {
        if (it.children && it.nav) init[it.nav] = true;
      })
    );
    return init;
  });
  const toggle = (key: string) => setOpenMap((m) => ({ ...m, [key]: !m[key] }));

  return (
    <>
      <div className="nav-scrim" onClick={closeMobileNav} aria-hidden="true" />
      <aside className="side">
      <Link className="brand" href="/" onClick={closeMobileNav}>
        <Logo />
      </Link>
      {NAV_GROUPS.map((group) => (
        <div className="side-group" key={group.heading}>
          <h6>{group.heading}</h6>
          {group.items.map((item) =>
            item.children ? (
              <ParentItem
                key={item.label}
                item={item}
                active={active}
                open={!!openMap[item.nav ?? item.label]}
                onToggle={() => toggle(item.nav ?? item.label)}
              />
            ) : (
              <Fragment key={item.label}>
                <SideItem item={item} active={active} />
              </Fragment>
            )
          )}
        </div>
      ))}

        {/* Controls (mobile-only): mode + theme dồn vào sheet; chain nằm ở topbar */}
        <div className="side-controls">
          <ModeSwitch />
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
