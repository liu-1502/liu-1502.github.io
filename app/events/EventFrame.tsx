"use client";

import { useEffect, useState } from "react";
import { LIVE_EVENT } from "@/lib/events";

/** Hosts the event build; the build reports its content height so the frame never scrolls on its own. */
export default function EventFrame() {
  const [height, setHeight] = useState(900);

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
