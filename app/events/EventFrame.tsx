"use client";

import { useEffect, useState } from "react";
import { LIVE_EVENT } from "@/lib/events";
import { STORAGE_KEYS } from "@/lib/constants";

/** Hosts the event build; build tự báo chiều cao qua postMessage, iframe cao theo nội dung.
    Bản build tự ép dark + kích thước, host chỉ cần: trang Events luôn dark. */
export default function EventFrame() {
  const [height, setHeight] = useState(900);

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

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data as { type?: string; height?: number };
      if (d && d.type === "xm-event-height" && typeof d.height === "number") setHeight(Math.max(400, d.height));
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <iframe
      className="ev-frame"
      src={LIVE_EVENT.embed}
      title={LIVE_EVENT.title}
      style={{ display: "block", width: "100%", height, border: 0, background: "transparent" }}
      allow="autoplay"
    />
  );
}
