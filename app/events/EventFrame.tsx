"use client";

import { useEffect, useRef, useState } from "react";
import { LIVE_EVENT, EVENT_CHANGE } from "@/lib/events";
import { STORAGE_KEYS } from "@/lib/constants";

/** Hosts the event build.
    - Landing (#/events/<id>): iframe cao theo nội dung (build tự báo chiều cao).
    - Trong game (#/events/<id>/<room>): các màn game fill full -> khoá iframe = viewport height
      (trừ topbar + padding) để màn game fill đều, không bị trống ở dưới.
    Build tự ép dark; stage fill 100vh baked trong public/sleigh-the-yield.html. */
// Topbar (64) + content padding-top (48) + bottom padding (24).
const PLAY_GUTTER = 136;

export default function EventFrame() {
  const [height, setHeight] = useState(900);
  const [playing, setPlaying] = useState(false);
  // Build mở dialog ngoài game (vd Claim ở Final results) -> báo lên để iframe phủ full màn hình như lúc chơi.
  const [modal, setModal] = useState(false);
  const [vh, setVh] = useState(900);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Trang Events (Advent) luôn LIGHT mode cho cả app shell. Rời trang -> trả về theme user đã chọn.
  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute("data-theme");
    return () => {
      let saved = "light";
      try { saved = localStorage.getItem(STORAGE_KEYS.theme) === "dark" ? "dark" : "light"; } catch { /* ignore */ }
      if (saved === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
    };
  }, []);

  // Viewport + phát hiện đang chơi game (hash có segment room sau <id>).
  useEffect(() => {
    const readVh = () => setVh(window.innerHeight);
    readVh();
    window.addEventListener("resize", readVh);
    const iv = setInterval(() => {
      try {
        const hash = frameRef.current?.contentWindow?.location.hash || "";
        const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean); // ["events","<id>","<room>"?]
        setPlaying(parts.length >= 3);
        // Theo event đang mở: Christmas = dark mode cả app, Advent = light mode.
        const evId = parts[1] || "";
        const root = document.documentElement;
        // Báo event đang mở cho thanh chuyển trên topbar.
        if (evId && root.dataset.eventId !== evId) {
          root.dataset.eventId = evId;
          document.dispatchEvent(new CustomEvent(EVENT_CHANGE, { detail: { id: evId } }));
        }
        // Desktop: thanh chuyển nằm trên topbar -> ẩn thanh trong game. Mobile (<=820px): giữ thanh trong game.
        frameRef.current?.contentDocument?.documentElement.classList.toggle(
          "xm-host-switch",
          window.matchMedia("(min-width: 821px)").matches,
        );
        if (evId.startsWith("christmas")) root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");
      } catch { /* cross-origin/chưa sẵn sàng */ }
    }, 250);
    return () => {
      window.removeEventListener("resize", readVh);
      clearInterval(iv);
      delete document.documentElement.dataset.eventId;
    };
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data as { type?: string; height?: number; open?: boolean };
      if (d && d.type === "xm-event-modal") { setModal(!!d.open); return; }
      if (d && d.type === "xm-event-height" && typeof d.height === "number") setHeight(Math.max(400, d.height));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Khi đang chơi / đang mở dialog, iframe full-screen; nâng z-index .content để phủ cả sidebar (z60) + topbar (z50).
  const full = playing || modal;
  useEffect(() => {
    const content = document.querySelector<HTMLElement>(".content");
    if (!content) return;
    content.style.zIndex = full ? "10000" : "";
    return () => { content.style.zIndex = ""; };
  }, [full]);

  const frameHeight = playing ? Math.max(480, vh - PLAY_GUTTER) : height;

  return (
    <iframe
      ref={frameRef}
      className="ev-frame"
      src={LIVE_EVENT.embed}
      title={LIVE_EVENT.title}
      style={
        full
          ? { position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 9999, border: 0, background: "transparent" }
          : { display: "block", width: "100%", height: frameHeight, border: 0, background: "transparent" }
      }
      allow="autoplay"
    />
  );
}
