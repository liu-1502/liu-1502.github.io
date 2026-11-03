"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { LIVE_EVENT } from "@/lib/events";

const SEEN_KEY = "yz-event-popup-sleigh-the-yield";

/** Dashboard banner: one animated image (1280×300 design size), the whole banner is the link. */
export function EventBanner() {
  return (
    <a className="ev-promo-banner" href={LIVE_EVENT.href} aria-label={`${LIVE_EVENT.title}. ${LIVE_EVENT.summary} Unwrap your Juice.`}>
      <img src={LIVE_EVENT.banner} alt="" width={1280} height={300} />
    </a>
  );
}

/** Launch popup: shown once per browser session; a click on the image opens the event. */
export function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      /* storage blocked: still show it */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div className="ev-promo-pop" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="ev-promo-pop-in" role="dialog" aria-modal="true" aria-label={LIVE_EVENT.title}>
        <a href={LIVE_EVENT.href} onClick={close} aria-label={`${LIVE_EVENT.title}. ${LIVE_EVENT.summary} Start playing.`}>
          <img src={LIVE_EVENT.popup} alt="" width={760} height={400} />
        </a>
        <button type="button" className="ev-promo-x" aria-label="Close" onClick={close}>
          <X />
        </button>
      </div>
    </div>
  );
}
