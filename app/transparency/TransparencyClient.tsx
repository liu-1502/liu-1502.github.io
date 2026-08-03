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

    /* ---------- Days since Inception (launch 16 Oct 2025) ---------- */
    document.querySelectorAll<HTMLElement>("[data-days-since]").forEach((el) => {
      const days = Math.floor((Date.now() - Date.UTC(2025, 9, 16)) / 86400000);
      el.textContent = days.toLocaleString("en-US");
    });

    /* ---------- hero: gõ chữ "Proof of Solvency" từng ký tự (lặp) ---------- */
    const grad = document.querySelector<HTMLElement>(".hero-grad[data-type]");
    if (grad) {
      const full = grad.getAttribute("data-full") || grad.textContent || "";
      grad.setAttribute("data-full", full);
      grad.classList.add("typing");
      let i = 0;
      let phase: "type" | "hold" = "type";
      let timer = 0;
      const step = () => {
        if (phase === "type") {
          i++;
          grad.textContent = full.slice(0, i);
          if (i >= full.length) { phase = "hold"; timer = window.setTimeout(step, 5000); } // giữ nguyên 5s (con trỏ nháy ở cuối)
          else { timer = window.setTimeout(step, 140); } // gõ chậm
        } else {
          // hết 5s: xoá rồi gõ lại ngay, không để con trỏ đứng yên
          i = 0;
          grad.textContent = "";
          phase = "type";
          timer = window.setTimeout(step, 140);
        }
      };
      step();
      cleanups.push(() => window.clearTimeout(timer));
    }

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
      // Prime tab -> theme nâu (nền vàng nhạt + accent xanh lá đổi sang nâu).
      document.body.classList.toggle("tp-prime", key === "prime");
    });
    cleanups.push(() => document.body.classList.remove("tp-prime"));

    /* ---------- APY: token sub-tab + line toggles (mỗi chart APY độc lập) ---------- */
    document.querySelectorAll<HTMLElement>("[data-apy]").forEach((apy) => {
      let apyToken =
        apy.querySelector("[data-apy-token].on")?.getAttribute("data-apy-token") ||
        apy.getAttribute("data-apy-default") ||
        "syz";
      // Readout (dot + label + value) cho từng đường đang bật.
      const renderApyReadout = () => {
        const cont = apy.querySelector<HTMLElement>("[data-apy-readout]");
        if (!cont) return;
        const items = Array.from(apy.querySelectorAll<HTMLElement>("[data-line].on")).map((b) => {
          const color = b.style.getPropertyValue("--c").trim();
          const label = b.getAttribute("data-label") || "";
          const val = b.getAttribute("data-" + apyToken) || "";
          return `<div class="tp-readout-item"><span class="rl"><i style="background:${color}"></i>${label}</span><b class="rv">${val}</b></div>`;
        });
        cont.innerHTML = items.join("");
      };
      renderApyReadout();
      on(apy, "click", (e) => {
        const t = e.target as HTMLElement;
        const tk = t.closest<HTMLElement>("[data-apy-token]");
        const ln = t.closest<HTMLElement>("[data-line]");
        if (tk) {
          apyToken = tk.getAttribute("data-apy-token") || apyToken;
          apy.querySelectorAll("[data-apy-token]").forEach((b) => b.classList.toggle("on", b === tk));
          apy.querySelectorAll<HTMLElement>("[data-apy-svg]").forEach((s) => {
            s.style.display = s.getAttribute("data-apy-svg") === apyToken ? "" : "none";
          });
          renderApyReadout();
        } else if (ln) {
          if (ln.classList.contains("locked")) return; // Weekly Target: luôn bật
          const k = ln.getAttribute("data-line");
          const active = ln.classList.toggle("on");
          apy.querySelectorAll<HTMLElement>(`[data-apy-line="${k}"]`).forEach((g) => {
            g.style.display = active ? "" : "none";
          });
          renderApyReadout();
        }
      });
    });

    /* ---------- hover crosshair + tooltip (dùng chung mọi .tp-plot) ---------- */
    type Ser = { k: string; label: string; color: string; v: number[] };
    document.querySelectorAll<HTMLElement>(".pg-transparency .tp-plot").forEach((plot) => {
      let data: { d: string[]; mn: number; mx: number; f: "money" | "pct"; s: Ser[] };
      try {
        data = JSON.parse(plot.getAttribute("data-series") || "");
      } catch {
        return;
      }
      if (!data.s?.length) return;
      const n = data.s[0].v.length;
      const span = data.mx - data.mn || 1;
      const guide = plot.querySelector<HTMLElement>(".tp-guide");
      const tip = plot.querySelector<HTMLElement>(".tp-tip");
      const xPct = (i: number) => (6 + (288 * i) / (n - 1)) / 3;
      const yPct = (v: number) => ((124 - (118 * (v - data.mn)) / span) / 130) * 100;
      const fmt = (v: number) => (data.f === "pct" ? v.toFixed(2) + "%" : money(v));
      // 1 chấm tròn cho mỗi series
      const dots = data.s.map((s) => {
        const el = document.createElement("span");
        el.className = "tp-hdot";
        el.style.border = `2.5px solid ${s.color}`;
        el.style.boxShadow = `0 0 0 3px color-mix(in srgb, ${s.color} 22%, transparent)`;
        plot.appendChild(el);
        return el;
      });
      cleanups.push(() => dots.forEach((d) => d.remove()));

      on(plot, "mousemove", (e) => {
        const rect = plot.getBoundingClientRect();
        const fx = Math.min(1, Math.max(0, ((e as MouseEvent).clientX - rect.left) / rect.width));
        let i = Math.round(((fx * 300 - 6) / 288) * (n - 1));
        i = Math.min(n - 1, Math.max(0, i));
        const lx = xPct(i);
        if (guide) guide.style.left = lx + "%";
        let rows = "";
        data.s.forEach((s, si) => {
          const grp = plot.querySelector<HTMLElement>(`[data-apy-line="${s.k}"]`);
          const visible = !grp || grp.style.display !== "none";
          const dot = dots[si];
          if (visible) {
            dot.style.display = "";
            dot.style.left = lx + "%";
            dot.style.top = yPct(s.v[i]) + "%";
            rows += `<div class="row"><i style="background:${s.color}"></i>${s.label} <b>${fmt(s.v[i])}</b></div>`;
          } else {
            dot.style.display = "none";
          }
        });
        if (tip) {
          tip.style.left = Math.min(88, Math.max(12, lx)) + "%";
          tip.innerHTML = `<span class="d">${fmtD(data.d[i])}</span>${rows}`;
        }
        plot.classList.add("show");
      });
      on(plot, "mouseleave", () => plot.classList.remove("show"));
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
