"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageMeta } from "@/lib/pages";
import { watchVisible } from "@/lib/watchVisible";

/**
 * Các hành vi thao tác trên nội dung trang — port từ app.js. Chạy lại mỗi khi
 * đổi route (Next điều hướng client-side). Bao gồm: count-up số liệu, reveal khi
 * cuộn, marquee tape, tab exchange, mirror ô nhập số, filter marketplace, cột
 * chi tiết (xtra). Đồng thời gán class accent (p-alpha/p-prime/p-mkt) lên <body>.
 *
 * Các control global (theme/mode/eligibility/chain) nằm trong Topbar; nền bong
 * bóng nằm trong LiquidBackground.
 */
export default function YuzuClient() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Class accent trên body theo trang hiện tại.
    document.body.className = pageMeta(pathname).bodyClass || "";

    /* ---------- reveal on scroll ---------- */
    cleanups.push(
      watchVisible(document.querySelectorAll(".rv"), (el) => el.classList.add("in"), 40)
    );

    /* ---------- count-up numbers ---------- */
    const countEls = document.querySelectorAll("[data-count]");
    if (countEls.length) {
      const fmt = (el: Element, val: number) => {
        const dec = parseInt(el.getAttribute("data-dec") || "0", 10);
        const pre = el.getAttribute("data-prefix") || "";
        const suf = el.getAttribute("data-suffix") || "";
        // Bọc dấu , và . vào <span.num-sep> để có thể siết khoảng cách bằng CSS
        // (font mono khiến dấu chiếm nguyên 1 ô, trông thưa). Giá trị là số + tiền tố
        // do mình kiểm soát nên an toàn với innerHTML.
        const s =
          pre +
          val.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) +
          suf;
        el.innerHTML = s.replace(/([.,])/g, '<span class="num-sep">$1</span>');
      };
      const animate = (el: Element) => {
        const target = parseFloat(el.getAttribute("data-count") || "");
        if (reduce || isNaN(target)) {
          fmt(el, target || 0);
          return;
        }
        const t0 = Date.now();
        const dur = 1300;
        const timer = setInterval(() => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          fmt(el, target * eased);
          if (p >= 1) clearInterval(timer);
        }, 24);
        cleanups.push(() => clearInterval(timer));
      };
      cleanups.push(watchVisible(countEls, animate, 30));
    }

    /* ---------- tape marquee ---------- */
    const tape = document.querySelector(".tape");
    const inner = tape && tape.querySelector(".tape-inner");
    if (inner && !reduce && !tape!.classList.contains("marquee")) {
      inner.innerHTML = inner.innerHTML + inner.innerHTML;
      inner.setAttribute("aria-hidden", "false");
      tape!.classList.add("marquee");
    }

    /* ---------- exchange tabs (visual) ---------- */
    const tabHandlers: Array<{ el: Element; fn: EventListener }> = [];
    document.querySelectorAll(".xchg-tabs").forEach((tabs) => {
      const fn: EventListener = (e) => {
        const b = (e.target as HTMLElement).closest("button");
        if (!b || !b.hasAttribute("data-tab")) return;
        tabs.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const host = tabs.closest(".xchg");
        if (!host) return;
        const name = b.getAttribute("data-tab");
        host.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
          p.style.display = p.getAttribute("data-panel") === name ? "" : "none";
        });
      };
      tabs.addEventListener("click", fn);
      tabHandlers.push({ el: tabs, fn });
    });
    cleanups.push(() => tabHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn)));

    /* ---------- "Switch to …" buttons: đổi panel (form + detail) mà không đổi tab ---------- */
    const switchHandlers: Array<{ el: Element; fn: EventListener }> = [];
    document.querySelectorAll(".xchg").forEach((host) => {
      const fn: EventListener = (e) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>("[data-switch-panel]");
        if (!b || !host.contains(b)) return;
        const name = b.getAttribute("data-switch-panel");
        host.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
          p.style.display = p.getAttribute("data-panel") === name ? "" : "none";
        });
      };
      host.addEventListener("click", fn);
      switchHandlers.push({ el: host, fn });
    });
    cleanups.push(() => switchHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn)));

    /* ---------- amount inputs: mirror + fake USD ---------- */
    const amtHandlers: Array<{ el: Element; fn: EventListener }> = [];
    document.querySelectorAll(".xchg").forEach((panel) => {
      const src = panel.querySelector<HTMLInputElement>("input[data-src]");
      const dst = panel.querySelector<HTMLInputElement>("input[data-dst]");
      if (!src) return;
      const rate = parseFloat(src.getAttribute("data-rate") || "1");
      const fn: EventListener = () => {
        const v = parseFloat(src.value.replace(",", "."));
        const usd = panel.querySelectorAll(".xusd");
        if (!isNaN(v)) {
          if (dst) dst.value = (v * rate).toFixed(4).replace(/\.?0+$/, "");
          usd.forEach((u) => {
            u.textContent = "≈ $" + v.toLocaleString("en-US", { maximumFractionDigits: 2 });
          });
        } else {
          if (dst) dst.value = "";
          usd.forEach((u) => (u.textContent = "≈ $0.00"));
        }
      };
      src.addEventListener("input", fn);
      amtHandlers.push({ el: src, fn });
    });
    cleanups.push(() => amtHandlers.forEach(({ el, fn }) => el.removeEventListener("input", fn)));

    /* ---------- marketplace filters ---------- */
    const filterRow = document.querySelector("[data-filters]");
    if (filterRow) {
      const fn: EventListener = (e) => {
        const b = (e.target as HTMLElement).closest("button");
        if (!b) return;
        filterRow.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const f = b.getAttribute("data-f");
        document.querySelectorAll<HTMLElement>("[data-chain]").forEach((card) => {
          card.style.display = f === "all" || card.getAttribute("data-chain") === f ? "" : "none";
        });
      };
      filterRow.addEventListener("click", fn);
      cleanups.push(() => filterRow.removeEventListener("click", fn));
    }

    /* ---------- expandable details column ---------- */
    const xtraHandlers: Array<{ el: Element; fn: EventListener }> = [];
    document.querySelectorAll("[data-xtra]").forEach((b) => {
      const fn: EventListener = () => {
        const layout = b.closest(".app-layout");
        if (!layout) return;
        const open = layout.classList.toggle("xtra-open");
        b.setAttribute("aria-expanded", open ? "true" : "false");
      };
      b.addEventListener("click", fn);
      xtraHandlers.push({ el: b, fn });
    });
    cleanups.push(() => xtraHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn)));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
