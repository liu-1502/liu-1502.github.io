"use client";

import { useEffect } from "react";

export default function OpportunitiesClient() {
  useEffect(() => {
    const state = { chain: "all", type: "all", token: "all", q: "" };
    const rows = Array.prototype.slice.call(
      document.querySelectorAll("#oppRows .opp")
    ) as HTMLElement[];
    const empty = document.getElementById("oppEmpty");

    function apply() {
      let shown = 0;
      rows.forEach(function (r) {
        const ok =
          (state.chain === "all" || r.getAttribute("data-c") === state.chain) &&
          (state.type === "all" || r.getAttribute("data-t") === state.type) &&
          (state.token === "all" || r.getAttribute("data-k") === state.token) &&
          (!state.q || (r.textContent || "").toLowerCase().indexOf(state.q) !== -1);
        r.style.display = ok ? "" : "none";
        if (ok) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "";
    }

    const groups = Array.prototype.slice.call(
      document.querySelectorAll("[data-fgroup]")
    ) as HTMLElement[];
    const groupHandlers: Array<{ el: HTMLElement; fn: (e: Event) => void }> = [];
    groups.forEach(function (grp) {
      const key = grp.getAttribute("data-fgroup") as keyof typeof state;
      const fn = function (e: Event) {
        const target = e.target as HTMLElement;
        const b = target.closest("button[data-v]") as HTMLElement | null;
        if (!b) return;
        grp.querySelectorAll("button[data-v]").forEach(function (x) {
          x.classList.remove("on");
        });
        b.classList.add("on");
        (state[key] as string) = b.getAttribute("data-v") || "all";
        apply();
      };
      grp.addEventListener("click", fn);
      groupHandlers.push({ el: grp, fn });
    });

    const search = document.getElementById("oppSearch") as HTMLInputElement | null;
    const searchFn = function (this: HTMLInputElement) {
      state.q = this.value.trim().toLowerCase();
      apply();
    };
    if (search) search.addEventListener("input", searchFn);

    const host = document.getElementById("oppRows");
    const sortButtons = Array.prototype.slice.call(
      document.querySelectorAll("[data-sort]")
    ) as HTMLElement[];
    const sortHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    sortButtons.forEach(function (b) {
      const fn = function () {
        const key = b.getAttribute("data-sort");
        const dir = b.classList.contains("desc") ? "asc" : "desc";
        document.querySelectorAll("[data-sort]").forEach(function (x) {
          x.classList.remove("desc", "asc");
        });
        b.classList.add(dir);
        rows.sort(function (a, z) {
          const av = parseFloat(a.getAttribute("data-" + key) || "") || 0;
          const zv = parseFloat(z.getAttribute("data-" + key) || "") || 0;
          return dir === "desc" ? zv - av : av - zv;
        });
        rows.forEach(function (r) {
          if (host) host.appendChild(r);
        });
      };
      b.addEventListener("click", fn);
      sortHandlers.push({ el: b, fn });
    });

    return () => {
      groupHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      if (search) search.removeEventListener("input", searchFn);
      sortHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, []);

  return null;
}
