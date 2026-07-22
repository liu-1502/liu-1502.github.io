"use client";

import { useEffect } from "react";

export default function DocsClient() {
  useEffect(() => {
    /* scrollspy */
    const links = document.querySelectorAll<HTMLAnchorElement>(".docs-nav a");
    const map: Record<string, HTMLAnchorElement> = {};
    links.forEach(function (a) {
      map[(a.getAttribute("href") || "").slice(1)] = a;
    });
    const sections = ([] as Element[]).slice.call(
      document.querySelectorAll(".doc section[id]")
    );
    let ticking = false;
    function spy() {
      ticking = false;
      const line = window.innerHeight * 0.28;
      let current = sections[0];
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= line) current = sections[i];
      }
      links.forEach(function (a) {
        a.classList.remove("on");
      });
      if (!current) return;
      const a = map[current.id];
      if (a) a.classList.add("on");
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      setTimeout(spy, 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setInterval(spy, 300);
    spy();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, []);

  return null;
}
