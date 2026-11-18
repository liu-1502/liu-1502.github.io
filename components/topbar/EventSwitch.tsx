"use client";

import { useEffect, useState } from "react";
import { Gift, Snowflake } from "lucide-react";
import { EVENT_TABS, EVENT_CHANGE } from "@/lib/events";

const ICONS = { "advent-2026": Gift, "christmas-2026": Snowflake } as const;

/** Chuyển event (Advent / Christmas) trên topbar. Game nằm trong iframe của trang Events:
    bấm tab -> đổi hash của iframe; EventFrame báo ngược lại event đang mở qua EVENT_CHANGE. */
export default function EventSwitch() {
  const [active, setActive] = useState<string>(EVENT_TABS[0].id);

  useEffect(() => {
    const current = document.documentElement.dataset.eventId;
    if (current) setActive(current);
    const onChange = (e: Event) => {
      const id = (e as CustomEvent<{ id?: string }>).detail?.id;
      if (id) setActive(id);
    };
    document.addEventListener(EVENT_CHANGE, onChange);
    return () => document.removeEventListener(EVENT_CHANGE, onChange);
  }, []);

  const go = (id: string) => {
    setActive(id);
    const frame = document.querySelector<HTMLIFrameElement>("iframe.ev-frame");
    try {
      if (frame?.contentWindow) frame.contentWindow.location.hash = `#/events/${id}`;
    } catch { /* iframe chưa sẵn sàng */ }
  };

  return (
    <div className="ev-tabs" role="group" aria-label="Events">
      {EVENT_TABS.map((t) => {
        const Icon = ICONS[t.id];
        const on = t.id === active;
        return (
          <button key={t.id} type="button" className={on ? "on" : undefined} aria-pressed={on} onClick={() => go(t.id)}>
            <Icon aria-hidden="true" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
