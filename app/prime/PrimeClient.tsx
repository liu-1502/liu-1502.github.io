"use client";

import { useEffect } from "react";
import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";

/* Tỷ giá + hệ số USD cho yzPrime. */
const RATES: RateMap = {
  prime: { mint: { rate: 1 / 1.01243, dp: 1, rp: 1.01243 }, redeem: { rate: 1.01243, dp: 1.01243, rp: 1 } },
};

export default function PrimeClient() {
  useExchangePanels(RATES, { walletCta: true });

  // Orders: lọc theo trạng thái + tìm theo tx hash; mặc định hiện 3, "Show more" +10.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pg-prime .ohist");
    if (!root) return;
    const list = root.querySelector<HTMLElement>(".olist");
    const btn = root.querySelector<HTMLElement>("[data-omore]");
    const filters = root.querySelector<HTMLElement>(".ord-filters");
    const search = root.querySelector<HTMLInputElement>(".osearch input");
    if (!list || !btn) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".ord"));
    let statusFilter = "all";
    let query = "";
    let shown = 3;

    const matches = (r: HTMLElement) => {
      const okStatus = statusFilter === "all" || r.getAttribute("data-status") === statusFilter;
      const okQuery = !query || (r.querySelector(".otx")?.textContent || "").toLowerCase().includes(query);
      return okStatus && okQuery;
    };
    const apply = () => {
      let matched = 0;
      rows.forEach((r) => {
        if (matches(r)) { r.style.display = matched < shown ? "" : "none"; matched++; }
        else r.style.display = "none";
      });
      btn.style.display = matched > shown ? "" : "none";
    };
    apply();

    const onFilter = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".ofilter");
      if (!b) return;
      filters?.querySelectorAll(".ofilter").forEach((x) => x.classList.toggle("on", x === b));
      statusFilter = b.getAttribute("data-filter") || "all";
      shown = 3;
      apply();
    };
    const onSearch = () => { query = (search?.value || "").trim().toLowerCase(); shown = 3; apply(); };
    const onMore = () => { shown += 10; apply(); };
    filters?.addEventListener("click", onFilter);
    search?.addEventListener("input", onSearch);
    btn.addEventListener("click", onMore);
    return () => {
      filters?.removeEventListener("click", onFilter);
      search?.removeEventListener("input", onSearch);
      btn.removeEventListener("click", onMore);
    };
  }, []);

  return null;
}
