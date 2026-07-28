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

    const onDeposit = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".vt-deposit");
      if (!b) return;
      const key = b.getAttribute("data-vault");
      // Kích hoạt đúng tab token của vault trước khi chuyển màn.
      document.querySelector<HTMLElement>(`.tok-tab[data-tab="${key}"]`)?.click();
      show("exchange");
    };
    const onBack = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-mkt-back]")) show("overview");
    };

    /* Toggle List/Grid + Read More (mô tả card) — đều nằm trong overview */
    const vaults = ov.querySelector<HTMLElement>(".mkt-vaults");
    const onOverviewClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const vbtn = t.closest<HTMLElement>(".mkt-view button[data-mview]");
      if (vbtn && vaults) {
        vaults.classList.toggle("view-grid", vbtn.getAttribute("data-mview") === "grid");
        vaults.querySelectorAll(".mkt-view button").forEach((b) => b.classList.remove("on"));
        vbtn.classList.add("on");
        return;
      }
      const more = t.closest<HTMLElement>(".mc-more");
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
    };
  }, []);

  return null;
}
