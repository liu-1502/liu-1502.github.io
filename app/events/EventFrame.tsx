"use client";

import { useEffect, useRef, useState } from "react";
import { LIVE_EVENT } from "@/lib/events";
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
  const [vh, setVh] = useState(900);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Trang Events luôn dark. Rời trang -> trả về theme user đã chọn (không ghi đè localStorage).
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", "dark");
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
      } catch { /* cross-origin/chưa sẵn sàng */ }
    }, 250);
    return () => { window.removeEventListener("resize", readVh); clearInterval(iv); };
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data as { type?: string; height?: number };
      if (d && d.type === "xm-event-height" && typeof d.height === "number") setHeight(Math.max(400, d.height));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const frameHeight = playing ? Math.max(480, vh - PLAY_GUTTER) : height;

  return (
    <iframe
      ref={frameRef}
      className="ev-frame"
      src={LIVE_EVENT.embed}
      title={LIVE_EVENT.title}
      style={{ display: "block", width: "100%", height: frameHeight, border: 0, background: "transparent" }}
      allow="autoplay"
    />
  );
}
