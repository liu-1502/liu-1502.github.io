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

    /* ---- Dropdown chọn token (thay cho tab) ---- */
    const TOKENS: Record<string, { name: string; logo: string }> = {
      yzsyrup: { name: "yzSyrup", logo: "/assets/tokens/yzSyrup.svg" },
      yzcash: { name: "yzCash", logo: "/assets/tokens/yzCash.svg" },
    };
    const sel = xc.querySelector<HTMLElement>("[data-tok-select]");
    const selBtn = sel?.querySelector<HTMLElement>("[data-tok-toggle]");
    const selMenu = sel?.querySelector<HTMLElement>("[data-tok-menu]");
    const selImg = selBtn?.querySelector<HTMLImageElement>("img");
    const selName = selBtn?.querySelector<HTMLElement>(".tsel-name");
    const xchg = xc.querySelector<HTMLElement>(".xchg");

    const closeMenu = () => {
      selMenu?.setAttribute("hidden", "");
      selBtn?.setAttribute("aria-expanded", "false");
    };
    // Chọn vault: đồng bộ panel trái + chi tiết phải + nhãn dropdown.
    const selectVault = (key: string) => {
      const t = TOKENS[key];
      if (!t || !xchg) return;
      xchg.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === key ? "" : "none";
      });
      if (selImg) selImg.src = t.logo;
      if (selName) selName.textContent = t.name;
      selMenu?.querySelectorAll<HTMLElement>("[data-tok-opt]").forEach((o) => {
        o.classList.toggle("on", o.getAttribute("data-tok-opt") === key);
      });
    };

    const onSelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const opt = target.closest<HTMLElement>("[data-tok-opt]");
      if (opt) {
        selectVault(opt.getAttribute("data-tok-opt") || "yzsyrup");
        closeMenu();
        return;
      }
      if (target.closest("[data-tok-toggle]")) {
        const open = selMenu?.hasAttribute("hidden");
        if (open) {
          selMenu?.removeAttribute("hidden");
          selBtn?.setAttribute("aria-expanded", "true");
        } else closeMenu();
      }
    };
    const onDocClick = (e: MouseEvent) => {
      if (sel && !sel.contains(e.target as Node)) closeMenu();
    };
    sel?.addEventListener("click", onSelClick);
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
      sel?.removeEventListener("click", onSelClick);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return null;
}
