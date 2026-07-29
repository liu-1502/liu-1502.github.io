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

    /* ---- Dropdown chọn token (mỗi panel có 1 dropdown tĩnh của riêng nó) ---- */
    const xchg = xc.querySelector<HTMLElement>(".xchg");

    const closeMenus = () => {
      xc.querySelectorAll<HTMLElement>("[data-tok-menu]").forEach((m) => m.setAttribute("hidden", ""));
      xc.querySelectorAll<HTMLElement>("[data-tok-toggle]").forEach((b) => b.setAttribute("aria-expanded", "false"));
    };
    // Chọn vault: chuyển panel trái + chi tiết phải (dropdown mỗi panel tự hiển thị token của nó).
    const selectVault = (key: string) => {
      if (!xchg) return;
      xchg.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === key ? "" : "none";
      });
    };

    const onSelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const opt = target.closest<HTMLElement>("[data-tok-opt]");
      if (opt) {
        selectVault(opt.getAttribute("data-tok-opt") || "yzsyrup");
        closeMenus();
        return;
      }
      const toggle = target.closest<HTMLElement>("[data-tok-toggle]");
      if (toggle) {
        const menu = toggle.parentElement?.querySelector<HTMLElement>("[data-tok-menu]");
        const willOpen = menu?.hasAttribute("hidden");
        closeMenus();
        if (willOpen && menu) {
          menu.removeAttribute("hidden");
          toggle.setAttribute("aria-expanded", "true");
        }
      }
    };
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-tok-select]")) closeMenus();
    };
    xc.addEventListener("click", onSelClick);
    document.addEventListener("click", onDocClick);

    const onDeposit = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".vt-deposit");
      if (!b) return;
      // Đặt token mặc định theo vault chọn từ Overview rồi mới chuyển màn.
      selectVault(b.getAttribute("data-vault") || "yzsyrup");
      show("exchange");
    };
    const onBack = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-mkt-back]")) show("overview");
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
    return () => {
      ov.removeEventListener("click", onDeposit);
      ov.removeEventListener("click", onOverviewClick);
      xc.removeEventListener("click", onBack);
      xc.removeEventListener("click", onSelClick);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return null;
}
