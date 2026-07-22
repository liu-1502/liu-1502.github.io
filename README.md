# Yuzu — Next.js app

Giao diện Yuzu Money đã được **convert từ static HTML sang Next.js (App Router) + TypeScript**.
12 trang gốc giờ là 12 route trong `app/`, dùng chung một bộ shell (sidebar + topbar + nền
bong bóng) và các hành vi tương tác được port từ `app.js` gốc sang React hooks. CSS gốc
(`styles/yuzu.css`) được giữ **nguyên bản** để UI khớp 1:1.

## Chạy dev
```bash
npm install
npm run dev            # http://localhost:3000
npm run lint           # ESLint (next/core-web-vitals)
npx tsc --noEmit       # typecheck
npm run build          # production build (đừng chạy khi `npm run dev` đang chạy — chung .next)
```

`.eslintrc.json` tắt 2 rule có chủ đích: `@next/next/no-img-element` (token/chain là SVG tĩnh
của design system, kích thước do CSS gốc quản; `next/image` không phù hợp) và
`react/no-unescaped-entities` (dấu nháy trong văn bản render đúng, rule chỉ gây nhiễu).

## Kiến trúc

```
app/
  layout.tsx            Root layout: <html>/<body>, shell (Sidebar + Topbar + main),
                        LiquidBackground, YuzuClient, script chống nháy theme/mode.
  globals.css           Tailwind + reset (import trước yuzu.css).
  page.tsx              "/"            Dashboard   (+ dashboard.css)
  alpha/                "/alpha"       (page.tsx + styles.css + AlphaClient.tsx)
  prime/                "/prime"
  marketplace/          "/marketplace"
  opportunities/        "/opportunities" (+ OpportunitiesClient.tsx)
  points/               "/points"        (+ PointsClient.tsx)
  transparency/         "/transparency"  (+ TransparencyClient.tsx)
  whitelist/            "/whitelist"     (+ WhitelistClient.tsx)
  bridge/               "/bridge"        (+ BridgeClient.tsx)
  docs/                 "/docs"          (+ DocsClient.tsx)
  vault/                "/vault"       (yzSyrup)
  vault-yzcash/         "/vault-yzcash" (yzCash)

components/
  ui/                   Primitive tái sử dụng (không phụ thuộc nghiệp vụ):
    Button.tsx            Nút đa hình (button / link nội bộ / link ngoài) + variant .btn-*.
    TokenIcon/Strip/Pill  Logo token đơn / dải logo (.tk-strip) / nhãn token (.token).
    SegmentedTabs.tsx     Thanh tab "chọn một" dùng chung (xchg-tabs, dir-switch, wl-tabs).
  topbar/               Các control ở topbar, mỗi cái một file (SRP):
    ModeSwitch, EligibilityToggle, ThemeToggle, ChainSelector.
  Sidebar.tsx           Sidebar — điều hướng khai báo bằng dữ liệu (NAV_GROUPS) + <SideItem>.
  Topbar.tsx            Ghép tiêu đề/crumb (theo route) với các control ở topbar/.
  LiquidBackground.tsx  Canvas bong bóng (chỉ ở chế độ lite) — port từ initLiquid().
  YuzuClient.tsx        Port hành vi global của app.js sang useEffect: count-up, reveal-on-scroll,
                        tape marquee, exchange tabs, mirror ô nhập số, marketplace filter,
                        cột "Details" (xtra), và gán class accent p-* lên <body> theo route.
  Logo.tsx              SVG logo Yuzu.

lib/
  pages.ts              Map route → { nav, title, crumb, bodyClass, metaTitle } + pageMetadata().
  constants.ts          STORAGE_KEYS (khoá localStorage dùng chung).
  storage.ts            readStorage/writeStorage (bọc try/catch, an toàn SSR).
  assets.ts             tokenSrc()/chainSrc() — dựng đường dẫn asset.
  types.ts              Kiểu dùng chung (Chain, NavItem).
  watchVisible.ts       Tiện ích reveal-khi-cuộn dùng chung (YuzuClient + TransparencyClient).

public/assets/          tokens/*.svg, chains/*.svg (placeholder — xem "Ghi chú").
styles/yuzu.css         Design system GỐC, giữ nguyên bản. Đừng sửa để không lệch UI.
scripts/split-bundle.mjs Chỉ dùng để bung lại HTML gốc từ bundle (không cần cho app).
```

## Nguyên tắc chuyển đổi (để nhất quán khi thêm/sửa trang)

- **Shell là global**: mỗi `page.tsx` chỉ render phần nội dung nằm trong `<main class="content">`
  của HTML gốc, bọc trong `<div className="pg-<slug>">`. Sidebar/topbar/head do `layout.tsx` lo.
- **CSS riêng của trang** đặt trong `app/<route>/styles.css`, **lồng dưới `.pg-<slug> { … }`**
  (CSS nesting gốc) để không loang sang trang khác — nhiều trang trùng tên class.
- **Hành vi chung** (theme, mode, eligibility, chain, count-up, reveal, tabs, mirror ô nhập,
  filter, xtra) đã nằm trong `YuzuClient`/`Topbar` — **không viết lại** ở trang. Chỉ cần giữ
  đúng class/`data-*` để handler bám vào.
- **Script riêng của trang** → client component co-located (`<Name>Client.tsx`, `"use client"`),
  logic trong `useEffect(() => { … return cleanup }, [])`.
- **Contract state** đọc qua thuộc tính trên `<html>`: `data-theme` / `data-mode` /
  `data-eligible`, và class accent `p-alpha|p-prime|p-mkt` trên `<body>`. CSS gốc dựa vào đây.
- Link nội bộ dùng `next/link`; entity HTML thay bằng ký tự Unicode (SWC không decode `&nearr;`…).

## Ghi chú / việc còn lại cho dev

- **Token & chain SVG**: các file trong `public/assets/tokens|chains` **không có trong source
  bundle gốc** nên đã được tải lại từ site gốc (`yuzu-v2.vercel.app/assets`) — là **logo thật**.
- **"Connect Wallet" chỉ là nút tĩnh.** Bước tiếp theo hợp lý: tích hợp web3 (wagmi/viem +
  RainbowKit) rồi nối vào ChainSelector và các nút mint/redeem/stake.
- Số liệu (TVL, APY, tỉ lệ…) đang **hard-code** như bản gốc — thay bằng dữ liệu thật/API sau.
- `styles/yuzu.css` là bản gốc, **không chỉnh**. Style mới viết bằng Tailwind hoặc CSS scoped.
- `legacy-html/` và `yuzu-source-bundle.txt` là **tham chiếu gốc** (đã gitignore). Bung lại bằng
  `npm run split` nếu cần đối chiếu.
