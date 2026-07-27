import type { Metadata } from "next";
import "./globals.css";
// Design system gốc của Yuzu — giữ nguyên bản để UI y chang.
// Import sau globals.css để thắng cascade so với Tailwind base.
import "../styles/yuzu.css";
// Sidebar 2 cấp — nạp sau yuzu.css để override layout .side-item cũ.
import "../styles/sidebar.css";
// Chỉnh weight/letter-spacing nhãn viết hoa nhỏ — nạp sau cùng.
import "../styles/typography.css";
// Modal Connect Wallet + dropdown account.
import "../styles/wallet.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import LiquidBackground from "@/components/LiquidBackground";
import YuzuClient from "@/components/YuzuClient";
import { STORAGE_KEYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Yuzu Money",
  description: "Risk-curated onchain strategies, packaged as structured yield products.",
};

// Chạy trước khi paint: khôi phục theme/mode/eligibility từ localStorage để
// tránh nháy giao diện và để CSS (html[data-mode] / [data-theme] / [data-eligible]) đúng ngay.
const noFlash = `(function(){var d=document.documentElement;try{
if(localStorage.getItem('${STORAGE_KEYS.theme}')==='dark')d.setAttribute('data-theme','dark');
d.setAttribute('data-mode',localStorage.getItem('${STORAGE_KEYS.mode}')||'lite');
d.setAttribute('data-eligible',localStorage.getItem('${STORAGE_KEYS.eligible}')==='1'?'1':'0');
}catch(e){d.setAttribute('data-mode','lite');d.setAttribute('data-eligible','0');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Bộ font gốc: Bricolage Grotesque + Instrument Sans + Geist Mono; Onest cho số liệu/mono */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Instrument+Sans:wght@400..700&family=Geist+Mono:wght@400;500;600&family=Onest:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <LiquidBackground />
        <div className="shell">
          <Sidebar />
          <div className="maincol">
            <Topbar />
            <main className="content">{children}</main>
          </div>
        </div>
        <YuzuClient />
      </body>
    </html>
  );
}
