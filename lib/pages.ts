/**
 * Cấu hình từng trang: điều khiển nav active, tiêu đề topbar, breadcrumb và
 * class accent trên <body> (p-alpha / p-prime / p-mkt). Thay cho các thuộc tính
 * data-nav / data-title / data-crumb + class body trong HTML gốc.
 *
 * `nav` khớp với thuộc tính data-nav của các mục sidebar trong components/Sidebar.tsx.
 */
export type PageMeta = {
  nav: string;
  title: string;
  crumb?: string;
  bodyClass?: string;
};

export const PAGES: Record<string, PageMeta> = {
  "/": { nav: "dashboard", title: "Dashboard" },
  "/alpha": { nav: "alpha", title: "Alpha", crumb: "Products", bodyClass: "p-alpha" },
  "/prime": { nav: "prime", title: "Prime", crumb: "Products", bodyClass: "p-prime" },
  "/marketplace": { nav: "mkt", title: "Marketplace", bodyClass: "p-mkt" },
  "/opportunities": { nav: "opportunities", title: "Yield Opportunities" },
  "/points": { nav: "points", title: "Points" },
  "/transparency": { nav: "transparency", title: "Transparency" },
  "/whitelist": { nav: "whitelist", title: "Asset Whitelist" },
  "/bridge": { nav: "bridge", title: "Bridge" },
  "/docs": { nav: "docs", title: "Documentation" },
  "/vault": { nav: "mkt", title: "yzSyrup", crumb: "Marketplace", bodyClass: "p-mkt" },
  "/vault-yzcash": { nav: "mkt", title: "yzCash", crumb: "Marketplace", bodyClass: "p-mkt" },
};

export function pageMeta(pathname: string): PageMeta {
  return PAGES[pathname] ?? { nav: "", title: "Yuzu" };
}
