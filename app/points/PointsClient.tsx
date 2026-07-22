"use client";

import { useEffect } from "react";

export default function PointsClient() {
  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".pg-points [data-copy]")
    );

    const cleanups: Array<() => void> = [];

    buttons.forEach((b) => {
      let timer: ReturnType<typeof setTimeout> | undefined;

      const handler = () => {
        const txt = b.getAttribute("data-copy") || "";
        b.textContent = "COPIED";
        b.classList.add("done");
        timer = setTimeout(function () {
          b.textContent = "COPY";
          b.classList.remove("done");
        }, 1600);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt).catch(function () {});
        } else {
          const ta = document.createElement("textarea");
          ta.value = txt;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch (e) {}
          document.body.removeChild(ta);
        }
      };

      b.addEventListener("click", handler);
      cleanups.push(() => {
        b.removeEventListener("click", handler);
        if (timer) clearTimeout(timer);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
