import type { Metadata } from "next";

/**
 * Cấu hình từng trang: điều khiển nav active, tiêu đề topbar, breadcrumb, class
 * accent trên <body> (p-alpha / p-prime / p-mkt) và tiêu đề tài liệu (<title>).
 * Thay cho các thuộc tính data-nav / data-title / data-crumb + class body + thẻ
 * <title> trong HTML gốc — gom về một nguồn duy nhất.
 *
 * `nav` khớp với thuộc tính data-nav của các mục sidebar trong components/Sidebar.tsx.
 * `metaTitle` giữ đúng nguyên văn <title> của trang gốc (không phải lúc nào cũng
 * theo mẫu "X · Yuzu Money", nên lưu tường minh).
 */
export type PageMeta = {
  nav: string;
  title: string;
  crumb?: string;
  bodyClass?: string;
  metaTitle: string;
};

export const PAGES: Record<string, PageMeta> = {
  "/": { nav: "dashboard", title: "Dashboard", metaTitle: "Dashboard · Yuzu Money" },
  "/alpha": { nav: "alpha", title: "Alpha", crumb: "Products", bodyClass: "p-alpha", metaTitle: "Alpha · Yuzu Money" },
  "/prime": { nav: "prime", title: "Prime", crumb: "Products", bodyClass: "p-prime", metaTitle: "Prime · Yuzu Money" },
  "/marketplace": { nav: "mkt", title: "Marketplace", bodyClass: "p-mkt", metaTitle: "Yuzu Marketplace · Curated vault strategies" },
  "/opportunities": { nav: "opportunities", title: "Yield Opportunities", metaTitle: "Yield Opportunities · Yuzu Money" },
  "/points": { nav: "points", title: "Points", metaTitle: "Points · Yuzu Money" },
  "/transparency": { nav: "transparency", title: "Transparency", metaTitle: "Transparency · Yuzu Money" },
  "/whitelist": { nav: "whitelist", title: "Asset Whitelist", metaTitle: "Asset Whitelist · Yuzu Money" },
  "/bridge": { nav: "bridge", title: "Bridge", metaTitle: "Bridge · Yuzu Money" },
  "/docs": { nav: "docs", title: "Documentation", metaTitle: "Documentation · Yuzu Money" },
  "/vault": { nav: "mkt", title: "yzSyrup", crumb: "Marketplace", bodyClass: "p-mkt", metaTitle: "yzSyrup · Yuzu Marketplace" },
  "/vault-yzcash": { nav: "mkt", title: "yzCash", crumb: "Marketplace", bodyClass: "p-mkt", metaTitle: "yzCash · Yuzu Marketplace" },
};

const FALLBACK: PageMeta = { nav: "", title: "Yuzu", metaTitle: "Yuzu Money" };

export function pageMeta(pathname: string): PageMeta {
  return PAGES[pathname] ?? FALLBACK;
}

/** Metadata tĩnh cho từng route — dùng: `export const metadata = pageMetadata("/alpha")`. */
export function pageMetadata(pathname: string): Metadata {
  return { title: { absolute: pageMeta(pathname).metaTitle } };
}
