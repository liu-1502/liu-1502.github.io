"use client";

import { useEffect, useRef, useState } from "react";
import { LIVE_EVENT } from "@/lib/events";
import { STORAGE_KEYS } from "@/lib/constants";

/** Hosts the event build; the build reports its content height so the frame never scrolls on its own. */
export default function EventFrame() {
  const [height, setHeight] = useState(900);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // Build nhúng trong suốt -> vùng trống hiện canvas trắng (color-scheme light của build).
  // Trang Events luôn dark, nên ép nền build về nền tối của host để bỏ lớp trắng dư.
  // Poll tới khi iframe document sẵn sàng rồi tiêm style (onLoad đơn lẻ hay lỡ nhịp với build này).
  useEffect(() => {
    let done = false;
    const inject = () => {
      try {
        const doc = frameRef.current?.contentDocument;
        if (!doc || !doc.head) return false;
        if (!doc.getElementById("host-dark-bg")) {
          const st = doc.createElement("style");
          st.id = "host-dark-bg";
          st.textContent = "html.xm-embed,html{background:#0a120c!important}";
          doc.head.appendChild(st);
        }
        return true;
      } catch { return false; }
    };
    const iv = setInterval(() => { if (done) return; if (inject()) done = true; }, 150);
    const stop = setTimeout(() => clearInterval(iv), 10000);
    return () => { clearInterval(iv); clearTimeout(stop); };
  }, []);

  // Trang Events luôn ở dark mode. Khi rời trang -> trả về theme user đã chọn (đọc từ localStorage,
  // KHÔNG ghi đè lựa chọn của user). Direct-load đã được noFlash ép dark sẵn nên không bị nháy.
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
      ref={frameRef}
      className="ev-frame"
      src={LIVE_EVENT.embed}
      title={LIVE_EVENT.title}
      style={{ display: "block", width: "100%", height, border: 0, background: "transparent" }}
      allow="autoplay"
    />
  );
}
