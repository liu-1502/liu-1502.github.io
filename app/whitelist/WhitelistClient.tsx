"use client";

import { useEffect } from "react";

export default function WhitelistClient() {
  useEffect(() => {
    const tabs = document.getElementById("wlTabs");

    const onTabClick = (e: MouseEvent) => {
      if (!tabs) return;
      const b = (e.target as HTMLElement).closest("button");
      if (!b) return;
      tabs.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
      b.classList.add("on");
      const t = b.getAttribute("data-t");
      document.querySelectorAll(".wl-panel").forEach((p) => {
        p.classList.toggle("on", p.getAttribute("data-t") === t);
      });
      // Panel vừa hiện có thể vừa được đo lại -> cập nhật nút Read more
      refreshAll();
    };

    tabs?.addEventListener("click", onTabClick);

    /* ---- Read more: hiện nút khi mô tả bị cắt (>3 dòng), bấm để expand ---- */
    const refreshers: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".wl td.desc").forEach((td) => {
      const span = td.querySelector<HTMLElement>("span");
      if (!span) return;

      let btn = td.querySelector<HTMLButtonElement>(".desc-more");
      if (!btn) {
        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "desc-more";
        td.appendChild(btn);
        btn.addEventListener("click", () => {
          td.classList.toggle("expanded");
          refresh();
        });
      }

      const refresh = () => {
        if (td.classList.contains("expanded")) {
          btn!.style.display = "inline-block";
          btn!.textContent = "Show less";
        } else if (span.scrollHeight - span.clientHeight > 2) {
          btn!.style.display = "inline-block";
          btn!.textContent = "Read more";
        } else {
          btn!.style.display = "none";
        }
      };

      refreshers.push(refresh);
      refresh();
    });

    const refreshAll = () => refreshers.forEach((fn) => fn());

    // Clamp phụ thuộc bề rộng -> đo lại khi resize
    window.addEventListener("resize", refreshAll);
    // Đo lại sau khi layout ổn định (font/ảnh)
    const t = window.setTimeout(refreshAll, 60);

    return () => {
      tabs?.removeEventListener("click", onTabClick);
      window.removeEventListener("resize", refreshAll);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
