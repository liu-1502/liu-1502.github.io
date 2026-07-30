"use client";

import { useEffect } from "react";
import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";

/* Tỷ giá + hệ số USD cho các vault Marketplace. */
const RATES: RateMap = {
  yzsyrup: { deposit: { rate: 1 / 1.0192, dp: 1, rp: 1.0192 }, withdraw: { rate: 1.0192, dp: 1.0192, rp: 1 } },
  yzcash: { deposit: { rate: 1, dp: 1, rp: 1 }, withdraw: { rate: 1, dp: 1, rp: 1 } },
};

export default function MarketplaceClient() {
  useExchangePanels(RATES);

  /* Điều hướng 2 màn: Overview (danh sách vault) <-> Exchange (deposit/withdraw). */
  useEffect(() => {
    const ov = document.querySelector<HTMLElement>('[data-mkt="overview"]');
    const xc = document.querySelector<HTMLElement>('[data-mkt="exchange"]');
    if (!ov || !xc) return;

    const show = (view: "overview" | "exchange") => {
      ov.hidden = view !== "overview";
      xc.hidden = view !== "exchange";
      // Card exchange được ẩn lúc load nên reveal observer bỏ qua -> ép hiện khi mở.
      if (view === "exchange") xc.querySelectorAll(".rv").forEach((e) => e.classList.add("in"));
      window.scrollTo({ top: 0 });
    };

    const xchg = xc.querySelector<HTMLElement>(".xchg");
    // Hiện đúng panel (form trái + chi tiết phải) của vault được chọn.
    const selectVault = (key: string) => {
      if (!xchg) return;
      xchg.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === key ? "" : "none";
      });
    };

    const onDeposit = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".vt-deposit");
      if (!b) return;
      // Mở đúng vault chọn từ Overview rồi chuyển màn.
      selectVault(b.getAttribute("data-vault") || "yzsyrup");
      show("exchange");
    };
    const onBack = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-mkt-back]")) show("overview");
    };

    /* Toggle khoảng thời gian biểu đồ (7D/30D/90D), phạm vi trong từng section chart */
    const onRange = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-range]");
      if (!btn) return;
      const sec = btn.closest<HTMLElement>(".vd-chart-sec");
      if (!sec) return;
      const key = btn.getAttribute("data-range");
      sec.querySelectorAll<HTMLElement>("[data-rangepanel]").forEach((p) => {
        p.style.display = p.getAttribute("data-rangepanel") === key ? "" : "none";
      });
      sec.querySelectorAll<HTMLElement>("[data-range]").forEach((b) => b.classList.toggle("on", b === btn));
    };

    /* Read More: mở rộng/thu gọn mô tả card */
    const onOverviewClick = (e: MouseEvent) => {
      const more = (e.target as HTMLElement).closest<HTMLElement>(".mc-more");
      if (more) {
        const card = more.closest(".mkt-card");
        const on = card?.classList.toggle("expanded");
        more.textContent = on ? "Show Less" : "Read More";
      }
    };

    ov.addEventListener("click", onDeposit);
    ov.addEventListener("click", onOverviewClick);
    xc.addEventListener("click", onBack);
    xc.addEventListener("click", onRange);
    return () => {
      ov.removeEventListener("click", onDeposit);
      ov.removeEventListener("click", onOverviewClick);
      xc.removeEventListener("click", onBack);
      xc.removeEventListener("click", onRange);
    };
  }, []);

  return null;
}
