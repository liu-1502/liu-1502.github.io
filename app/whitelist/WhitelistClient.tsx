"use client";

import { useEffect } from "react";

export default function WhitelistClient() {
  useEffect(() => {
    const tabs = document.getElementById("wlTabs");
    if (!tabs) return;

    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest("button");
      if (!b) return;
      tabs.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      const t = b.getAttribute("data-t");
      document.querySelectorAll(".wl-panel").forEach((p) => {
        p.classList.toggle("on", p.getAttribute("data-t") === t);
      });
    };

    tabs.addEventListener("click", onClick);
    return () => {
      tabs.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
