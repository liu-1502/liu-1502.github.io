"use client";

import { useEffect } from "react";

export default function AlphaClient() {
  useEffect(() => {
    /* direction switches inside panels */
    const switchHandlers: Array<{ el: Element; fn: (e: Event) => void }> = [];
    document.querySelectorAll(".dir-switch").forEach(function (sw) {
      const fn = function (e: Event) {
        const b = (e.target as Element).closest("button");
        if (!b) return;
        sw.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        const panel = sw.closest(".xchg-body");
        if (!panel) return;
        panel.querySelectorAll("[data-dirpanel]").forEach(function (d) {
          (d as HTMLElement).style.display = d.getAttribute("data-dirpanel") === b.getAttribute("data-dir") ? "" : "none";
        });
      };
      sw.addEventListener("click", fn);
      switchHandlers.push({ el: sw, fn });
    });

    /* KYC gate: applies to yzUSD and yzPP tabs, never to syzUSD.
       Eligibility comes from the global topbar toggle. */
    const banner = document.querySelector("[data-alpha-banner]") as HTMLElement | null;
    const tabs = document.getElementById("alphaTabs");
    function verified() { return document.documentElement.getAttribute("data-eligible") === "1"; }
    function refreshGate() {
      if (!tabs || !banner) return;
      const onBtn = tabs.querySelector("button.on");
      if (!onBtn) return;
      const active = onBtn.getAttribute("data-tab");
      const gated = active !== "syzusd";
      banner.style.display = (gated && !verified()) ? "" : "none";
      document.querySelectorAll(".gcta").forEach(function (b) {
        (b as HTMLButtonElement).disabled = !verified();
        (b as HTMLElement).innerHTML = verified() ? "Connect Wallet" : "Verify eligibility to continue";
      });
    }
    const tabsClick = function () { setTimeout(refreshGate, 0); };
    document.addEventListener("yuzu-eligible", refreshGate);
    if (tabs) tabs.addEventListener("click", tabsClick);
    refreshGate();

    return () => {
      switchHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      document.removeEventListener("yuzu-eligible", refreshGate);
      if (tabs) tabs.removeEventListener("click", tabsClick);
    };
  }, []);

  return null;
}
