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

    /* swap circle: đảo chiều (mint <-> redeem) bằng cách bấm nút dir chưa active */
    document.querySelectorAll("[data-swap]").forEach(function (sw) {
      const fn = function () {
        const panel = sw.closest(".xchg-body");
        if (!panel) return;
        const inactive = panel.querySelector(".dir-switch button:not(.on)") as HTMLElement | null;
        if (inactive) inactive.click();
      };
      sw.addEventListener("click", fn);
      switchHandlers.push({ el: sw, fn });
    });

    /* ===== Logic mint/redeem: format + mirror + USD + % + rate line ===== */
    const RATES: Record<string, Record<string, { rate: number; dp: number; rp: number }>> = {
      yzusd: { mint: { rate: 1, dp: 1, rp: 1 }, redeem: { rate: 1, dp: 1, rp: 1 } },
      yzpp: { mint: { rate: 1 / 1.148527, dp: 1, rp: 1.148527 }, redeem: { rate: 1.148527, dp: 1.148527, rp: 1 } },
      syzusd: { stake: { rate: 0.9361, dp: 1, rp: 1.0683 }, unstake: { rate: 1.0683, dp: 1.0683, rp: 1 } },
    };
    const num = (n: number, max = 6) => n.toLocaleString("en-US", { maximumFractionDigits: max });
    const usd = (n: number) => "≈ $" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtInt = (s: string) => s.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.querySelectorAll<HTMLElement>("[data-dirpanel]").forEach(function (panel) {
      const pk = panel.closest(".xchg-body")?.getAttribute("data-panel") || "";
      const dk = panel.getAttribute("data-dirpanel") || "";
      const cfg = RATES[pk]?.[dk] || { rate: 1, dp: 1, rp: 1 };
      const inputs = panel.querySelectorAll<HTMLInputElement>(".mfield-l input");
      const dep = inputs[0], recv = inputs[1];
      const xusds = panel.querySelectorAll(".xusd");
      const tokens = panel.querySelectorAll(".token");
      const depSym = tokens[0]?.textContent?.trim() || "";
      const recvSym = tokens[1]?.textContent?.trim() || "";
      const bal = parseFloat((panel.querySelector(".mfield .bal .v")?.textContent || "0").replace(/[^0-9.]/g, "")) || 0;

      /* dòng exchange rate: đặt ngay dưới card (sau .mfields), ẩn cho tới khi có nhập */
      const mfields = panel.querySelector(".mfields");
      let rl = panel.querySelector(".rate-line") as HTMLElement | null;
      if (!rl && depSym && recvSym && mfields) {
        rl = document.createElement("div");
        rl.className = "rate-line";
        rl.textContent = "1 " + depSym + " = " + num(cfg.rate) + " " + recvSym;
        rl.style.display = "none";
        mfields.insertAdjacentElement("afterend", rl);
      }
      const cta = panel.querySelector(".btn-block") as HTMLButtonElement | null;

      if (!dep || !recv) return;
      const update = function () {
        let v = dep.value.replace(/[^0-9.]/g, "");
        const dot = v.indexOf(".");
        const ip = fmtInt(dot === -1 ? v : v.slice(0, dot));
        const dc = dot === -1 ? "" : v.slice(dot + 1).replace(/\./g, "").slice(0, 2);
        dep.value = dot === -1 ? ip : ip + "." + dc;
        const amt = parseFloat(dep.value.replace(/,/g, "")) || 0;
        const recvAmt = amt * cfg.rate;
        recv.value = amt ? num(recvAmt) : "";
        if (xusds[0]) xusds[0].textContent = usd(amt * cfg.dp);
        if (xusds[1]) xusds[1].textContent = usd(recvAmt * cfg.rp);
        if (rl) rl.style.display = amt > 0 ? "" : "none";
      };
      dep.addEventListener("input", update);
      switchHandlers.push({ el: dep, fn: update });
      update();   /* trạng thái ban đầu */

      panel.querySelectorAll(".pct").forEach(function (btn) {
        const fn = function () {
          const t = (btn.textContent || "").trim();
          const pct = /max/i.test(t) ? 1 : (parseFloat(t) || 0) / 100;
          dep.value = String(bal * pct);
          update();
        };
        btn.addEventListener("click", fn);
        switchHandlers.push({ el: btn, fn });
      });
    });

    /* order history: click 1 item -> selected (single-select trong mỗi list) */
    document.querySelectorAll(".olist").forEach(function (list) {
      const fn = function (e: Event) {
        const item = (e.target as Element).closest(".ord");
        if (!item || !list.contains(item)) return;
        list.querySelectorAll(".ord").forEach(function (x) { x.classList.remove("on"); });
        item.classList.add("on");
      };
      list.addEventListener("click", fn);
      switchHandlers.push({ el: list, fn });
    });

    /* order history filter chips: lọc theo loại (all/mint/redeem) */
    document.querySelectorAll(".ord-filters").forEach(function (fr) {
      const fn = function (e: Event) {
        const b = (e.target as Element).closest(".ofilter");
        if (!b || !fr.contains(b)) return;
        fr.querySelectorAll(".ofilter").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        const f = b.getAttribute("data-filter");
        const list = fr.parentElement?.querySelector(".olist");
        if (!list) return;
        list.querySelectorAll<HTMLElement>(".ord").forEach(function (o) {
          o.style.display = (f === "all" || o.getAttribute("data-kind") === f) ? "" : "none";
        });
      };
      fr.addEventListener("click", fn);
      switchHandlers.push({ el: fr, fn });
    });

    /* nút "About Alpha" -> mở/đóng dropdown chi tiết */
    let aboutOutside: EventListener | null = null;
    const aboutBtn = document.querySelector("[data-about-toggle]") as HTMLElement | null;
    const aboutMenu = document.querySelector("[data-about-menu]") as HTMLElement | null;
    const aboutClose = document.querySelector("[data-about-close]") as HTMLElement | null;
    if (aboutBtn && aboutMenu) {
      const setOpen = function (open: boolean) {
        aboutMenu.hidden = !open;
        aboutBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      const toggle = function (e: Event) { e.stopPropagation(); setOpen(aboutMenu.hidden); };
      aboutBtn.addEventListener("click", toggle);
      switchHandlers.push({ el: aboutBtn, fn: toggle });
      if (aboutClose) {
        const closeFn = function (e: Event) { e.stopPropagation(); setOpen(false); };
        aboutClose.addEventListener("click", closeFn);
        switchHandlers.push({ el: aboutClose, fn: closeFn });
      }
      /* click ra ngoài -> đóng */
      aboutOutside = function (e: Event) {
        if (!aboutMenu.hidden && !aboutMenu.contains(e.target as Node) && !aboutBtn.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("click", aboutOutside);
    }

    /* CTA theo trạng thái ví: chưa connect -> "Connect wallet"; đã connect -> "Verify eligibility to continue". Luôn active. */
    function setCTAs() {
      const connected = document.documentElement.getAttribute("data-wallet") === "1";
      document.querySelectorAll<HTMLButtonElement>(".xchg-body .btn-block").forEach(function (btn) {
        btn.disabled = false;
        btn.textContent = connected ? "Verify eligibility to continue" : "Connect wallet";
      });
    }
    document.addEventListener("yuzu-wallet", setCTAs);
    setCTAs();

    return () => {
      switchHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      document.removeEventListener("yuzu-wallet", setCTAs);
      if (aboutOutside) document.removeEventListener("click", aboutOutside);
    };
  }, []);

  return null;
}
