"use client";

import { useEffect } from "react";

/**
 * Nền bong bóng yuzu (chỉ ở chế độ lite) — port từ initLiquid() trong app.js.
 * Canvas cố định phía sau toàn bộ nội dung; ẩn ở chế độ pro qua CSS
 * (html[data-mode="pro"] #liquidBg { display:none }).
 */
export default function LiquidBackground() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.id = "liquidBg";
    canvas.setAttribute("aria-hidden", "true");
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let Hh = 0;
    const resize = () => {
      W = window.innerWidth;
      Hh = window.innerHeight;
      canvas.width = W;
      canvas.height = Hh;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onOut = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onOut);

    const hexToRgb = (h: string): [number, number, number] => {
      h = h.replace("#", "");
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      const n = parseInt(h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    let accRgb: [number, number, number] = [110, 160, 60];
    const refreshColor = () => {
      const a =
        getComputedStyle(document.body).getPropertyValue("--accent").trim() ||
        getComputedStyle(document.documentElement).getPropertyValue("--citrus").trim();
      if (a.indexOf("#") === 0) accRgb = hexToRgb(a);
    };
    refreshColor();
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".theme-btn") || t.closest(".mode-switch")) setTimeout(refreshColor, 60);
    };
    document.addEventListener("click", onClick);

    let t = 0;
    type Bubble = { x: number; y: number; r: number; vy: number; wob: number; ws: number; a: number };
    type Pop = { x: number; y: number; r: number; age: number };
    const bubbles: Bubble[] = [];
    const pops: Pop[] = [];
    const spawn = (big: boolean, anywhere: boolean) => {
      bubbles.push({
        x: Math.random() * W,
        y: anywhere ? Math.random() * Hh : Hh + 20,
        r: big ? 13 + Math.random() * 13 : 2.5 + Math.random() * 7,
        vy: 0.35 + Math.random() * 0.8,
        wob: Math.random() * 6.28,
        ws: 0.5 + Math.random(),
        a: 0.45 + Math.random() * 0.5,
      });
    };
    for (let i = 0; i < 34; i++) spawn(false, true);

    const tick = () => {
      if (document.hidden) return;
      if (document.documentElement.getAttribute("data-mode") === "pro") {
        ctx.clearRect(0, 0, W, Hh);
        return;
      }
      t += 0.033;
      ctx.clearRect(0, 0, W, Hh);
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const c = accRgb.join(",");
      if (bubbles.length < 75 && Math.random() < 0.3) spawn(false, false);
      if (Math.random() < 0.01) spawn(true, false);

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y -= b.vy * (1 + b.r / 18);
        b.x += Math.sin(t * b.ws + b.wob) * 0.5;
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 1400) {
          pops.push({ x: b.x, y: b.y, r: b.r, age: 0 });
          bubbles.splice(i, 1);
          continue;
        } else if (d2 < 12000) {
          const d = Math.sqrt(d2);
          b.x += (dx / d) * 1.8;
        }
        if (b.y < -30) {
          bubbles.splice(i, 1);
          continue;
        }
        const al = (dark ? 0.3 : 0.34) * b.a;
        ctx.strokeStyle = "rgba(" + c + "," + al + ")";
        ctx.fillStyle = "rgba(" + c + "," + al * 0.15 + ")";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, 7);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.35, b.r * 0.22, 0, 7);
        ctx.fillStyle = "rgba(" + c + "," + al * 0.6 + ")";
        ctx.fill();
      }
      for (let k = pops.length - 1; k >= 0; k--) {
        const pp = pops[k];
        pp.age += 0.1;
        if (pp.age > 1) {
          pops.splice(k, 1);
          continue;
        }
        ctx.strokeStyle = "rgba(" + c + "," + (1 - pp.age) * 0.45 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, pp.r + pp.age * 16, 0, 7);
        ctx.stroke();
      }
    };
    const timer = setInterval(tick, 33);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
      canvas.remove();
    };
  }, []);

  return null;
}
