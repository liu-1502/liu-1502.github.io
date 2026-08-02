"use client";

import { useEffect } from "react";

const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fmtD = (s: string) => {
  const p = s.split("-");
  return `${MON[+p[1] - 1]} ${+p[2]}`;
};
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/**
 * Tương tác thuần trang Transparency (light theme, theo rule của Accountable):
 *  (1) tab sản phẩm Alpha/Prime;
 *  (2) APY: sub-tab token (syzUSD/yzPP) + bật/tắt các đường Weekly Target / 1D / 7D / 30D;
 *  (3) Backing chart: state khoảng thời gian + hover crosshair hiện dữ liệu.
 * Count-up số liệu do YuzuClient xử lý ([data-count]).
 */
export default function TransparencyClient() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (el: Element | null | undefined, ev: string, fn: EventListener) => {
      if (!el) return;
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    /* ---------- product tabs ---------- */
    const tabWrap = document.querySelector("[data-tp-tabs]");
    on(tabWrap, "click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-tp-tab]");
      if (!btn) return;
      const key = btn.getAttribute("data-tp-tab");
      tabWrap?.querySelectorAll("[data-tp-tab]").forEach((b) => b.classList.toggle("on", b === btn));
      document.querySelectorAll<HTMLElement>("[data-tp-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-tp-panel") === key ? "" : "none";
      });
    });

    /* ---------- APY: token sub-tab + line toggles ---------- */
    const apy = document.querySelector<HTMLElement>("[data-apy]");
    on(apy, "click", (e) => {
      const t = e.target as HTMLElement;
      const tk = t.closest<HTMLElement>("[data-apy-token]");
      const ln = t.closest<HTMLElement>("[data-line]");
      if (tk) {
        const token = tk.getAttribute("data-apy-token") || "syz";
        apy?.querySelectorAll("[data-apy-token]").forEach((b) => b.classList.toggle("on", b === tk));
        apy?.querySelectorAll<HTMLElement>("[data-apy-svg]").forEach((s) => {
          s.style.display = s.getAttribute("data-apy-svg") === token ? "" : "none";
        });
        const val = apy?.querySelector<HTMLElement>("[data-apy-value]");
        if (val) val.textContent = tk.getAttribute("data-wt") || val.textContent;
      } else if (ln) {
        if (ln.classList.contains("locked")) return; // Weekly Target: luôn bật, không tắt được
        const k = ln.getAttribute("data-line");
        const active = ln.classList.toggle("on");
        // bật/tắt đường tương ứng ở cả 2 svg token
        apy?.querySelectorAll<HTMLElement>(`[data-apy-line="${k}"]`).forEach((g) => {
          g.style.display = active ? "" : "none";
        });
      }
    });

    /* ---------- backing chart: range states ---------- */
    const bk = document.querySelector<HTMLElement>("[data-bk]");
    on(bk?.querySelector("[data-bk-range]"), "click", (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-r]");
      if (!btn) return;
      const r = btn.getAttribute("data-r");
      bk?.querySelectorAll("[data-bk-range] [data-r]").forEach((b) => b.classList.toggle("on", b === btn));
      bk?.querySelectorAll<HTMLElement>("[data-bk-svg]").forEach((s) => {
        s.style.display = s.getAttribute("data-bk-svg") === r ? "" : "none";
      });
    });

    /* ---------- backing chart: hover crosshair + tooltip ---------- */
    bk?.querySelectorAll<HTMLElement>(".tp-plot").forEach((plot) => {
      let data: { d: string[]; b: number[]; s: number[]; mn: number; mx: number };
      try {
        data = JSON.parse(plot.getAttribute("data-series") || "");
      } catch {
        return;
      }
      const n = data.b.length;
      const span = data.mx - data.mn || 1;
      const guide = plot.querySelector<HTMLElement>(".tp-guide");
      const dotB = plot.querySelector<HTMLElement>(".tp-hdot.b");
      const dotS = plot.querySelector<HTMLElement>(".tp-hdot.s");
      const tip = plot.querySelector<HTMLElement>(".tp-tip");
      const xPct = (i: number) => (6 + (288 * i) / (n - 1)) / 3; // % của bề rộng
      const yPct = (v: number) => ((124 - (118 * (v - data.mn)) / span) / 130) * 100;

      on(plot, "mousemove", (e) => {
        const rect = plot.getBoundingClientRect();
        const fx = Math.min(1, Math.max(0, ((e as MouseEvent).clientX - rect.left) / rect.width));
        let i = Math.round(((fx * 300 - 6) / 288) * (n - 1));
        i = Math.min(n - 1, Math.max(0, i));
        const lx = xPct(i);
        if (guide) guide.style.left = lx + "%";
        if (dotB) { dotB.style.left = lx + "%"; dotB.style.top = yPct(data.b[i]) + "%"; }
        if (dotS) { dotS.style.left = lx + "%"; dotS.style.top = yPct(data.s[i]) + "%"; }
        if (tip) {
          tip.style.left = Math.min(88, Math.max(12, lx)) + "%";
          tip.innerHTML =
            `<span class="d">${fmtD(data.d[i])}</span>` +
            `<div class="row"><i style="background:var(--tp-backing)"></i>Backing <b>${money(data.b[i])}</b></div>` +
            `<div class="row"><i style="background:var(--tp-supply)"></i>Supply <b>${money(data.s[i])}</b></div>`;
        }
        plot.classList.add("show");
      });
      on(plot, "mouseleave", () => plot.classList.remove("show"));
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
