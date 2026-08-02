"use client";

import { useEffect } from "react";

/**
 * Tương tác thuần trên trang Transparency (light theme, chỉ tham khảo state chart
 * của Accountable): (1) chuyển tab sản phẩm Alpha/Prime, (2) chart APY có sub-tab
 * token (syzUSD/yzPP) + các state khoảng thời gian (1D/7D/30D/Weekly Target).
 * Số liệu count-up do YuzuClient xử lý chung ([data-count]).
 */
export default function TransparencyClient() {
  useEffect(() => {
    /* ---------- product tabs ---------- */
    const tabWrap = document.querySelector("[data-tp-tabs]");
    const onTab = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-tp-tab]");
      if (!btn) return;
      const key = btn.getAttribute("data-tp-tab");
      tabWrap?.querySelectorAll("[data-tp-tab]").forEach((b) => b.classList.toggle("on", b === btn));
      document.querySelectorAll<HTMLElement>("[data-tp-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-tp-panel") === key ? "" : "none";
      });
    };
    tabWrap?.addEventListener("click", onTab);

    /* ---------- APY sub-tab + range states ---------- */
    const apy = document.querySelector<HTMLElement>("[data-apy]");
    let token = "syz";
    let range: HTMLElement | null = apy?.querySelector<HTMLElement>('[data-r].on') || null;

    const readout = () => {
      const val = apy?.querySelector<HTMLElement>("[data-apy-value]");
      if (val && range) val.textContent = range.getAttribute(token === "syz" ? "data-syz" : "data-pp") || "";
    };
    const onApy = (e: Event) => {
      const t = e.target as HTMLElement;
      const tk = t.closest<HTMLElement>("[data-apy-token]");
      const rg = t.closest<HTMLElement>("[data-r]");
      if (tk) {
        token = tk.getAttribute("data-apy-token") || "syz";
        apy?.querySelectorAll("[data-apy-token]").forEach((b) => b.classList.toggle("on", b === tk));
        apy?.querySelectorAll<HTMLElement>("[data-apy-svg]").forEach((s) => {
          s.style.display = s.getAttribute("data-apy-svg") === token ? "" : "none";
        });
        readout();
      } else if (rg) {
        range = rg;
        apy?.querySelectorAll("[data-r]").forEach((b) => b.classList.toggle("on", b === rg));
        readout();
      }
    };
    apy?.addEventListener("click", onApy);

    /* ---------- backing chart range states ---------- */
    const bk = document.querySelector<HTMLElement>("[data-bk]");
    const onBk = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-r]");
      if (!btn) return;
      const r = btn.getAttribute("data-r");
      bk?.querySelectorAll("[data-bk-range] [data-r]").forEach((b) => b.classList.toggle("on", b === btn));
      bk?.querySelectorAll<HTMLElement>("[data-bk-svg]").forEach((s) => {
        s.style.display = s.getAttribute("data-bk-svg") === r ? "" : "none";
      });
    };
    bk?.querySelector("[data-bk-range]")?.addEventListener("click", onBk);

    return () => {
      tabWrap?.removeEventListener("click", onTab);
      apy?.removeEventListener("click", onApy);
      bk?.querySelector("[data-bk-range]")?.removeEventListener("click", onBk);
    };
  }, []);

  return null;
}
