"use client";

import { useEffect } from "react";
import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";
import { useReviewFlow, type ReviewFlow } from "@/hooks/useReviewFlow";

/* Tỷ giá + hệ số USD cho yzPrime. */
const RATES: RateMap = {
  prime: { mint: { rate: 1 / 1.01243, dp: 1, rp: 1.01243 }, redeem: { rate: 1.01243, dp: 1.01243, rp: 1 } },
};

const USDC = "/assets/tokens/usdc.svg", YZP = "/assets/tokens/yzPrime.svg";
const FLOWS: Record<string, ReviewFlow> = {
  mint: { paySym: "USDC", payIcon: USDC, recvSym: "yzPrime", recvIcon: YZP, recvMul: 1 / 1.01243, payUsd: 1,
    rate: "1 USDC = 0.98772 yzPrime", fees: [{ label: "Mint fee", pct: "0.10%", rate: 0.001 }],
    revTitle: "You’re minting", revCta: "Confirm mint", okTitle: "yzPrime minted successfully",
    okSub: "yzPrime is now earning tokenized T-bill yield.", okPrimary: "Done" },
  redeem: { paySym: "yzPrime", payIcon: YZP, recvSym: "USDC", recvIcon: USDC, recvMul: 1.01243, payUsd: 1.01243,
    rate: "1 yzPrime = 1.01243 USDC", fees: [{ label: "Redeem fee", pct: "0.10%", rate: 0.001 }],
    revTitle: "You’re redeeming", revCta: "Confirm redeem", okTitle: "Redeemed successfully",
    okSub: "USDC is on its way to your wallet.", okPrimary: "Done" },
};

export default function PrimeClient() {
  useExchangePanels(RATES, { walletCta: true });
  useReviewFlow(FLOWS);

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
