"use client";

import { useEffect } from "react";

export default function OpportunitiesClient() {
  useEffect(() => {
    /* Multi-select: mỗi group là 1 Set giá trị đang chọn. Set rỗng = không lọc (hiện tất cả). */
    const sel: Record<string, Set<string>> = { chain: new Set(), type: new Set(), token: new Set() };
    let q = "";
    const rows = Array.prototype.slice.call(
      document.querySelectorAll("#oppRows .opp")
    ) as HTMLElement[];
    const empty = document.getElementById("oppEmpty");

    function pass(set: Set<string>, v: string | null) {
      return set.size === 0 || set.has(v || "");
    }
    function apply() {
      let shown = 0;
      rows.forEach(function (r) {
        const ok =
          pass(sel.chain, r.getAttribute("data-c")) &&
          pass(sel.type, r.getAttribute("data-t")) &&
          pass(sel.token, r.getAttribute("data-k")) &&
          (!q || (r.textContent || "").toLowerCase().indexOf(q) !== -1);
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
      const key = grp.getAttribute("data-fgroup") || "";
      const set = sel[key];
      const fn = function (e: Event) {
        const target = e.target as HTMLElement;
        const b = target.closest("button[data-v]") as HTMLElement | null;
        if (!b || !set) return;
        const v = b.getAttribute("data-v") || "";
        if (set.has(v)) { set.delete(v); b.classList.remove("on"); }
        else { set.add(v); b.classList.add("on"); }
        apply();
      };
      grp.addEventListener("click", fn);
      groupHandlers.push({ el: grp, fn });
    });

    const search = document.getElementById("oppSearch") as HTMLInputElement | null;
    const searchFn = function (this: HTMLInputElement) {
      q = this.value.trim().toLowerCase();
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

    /* Toggle List / Card view: bật/tắt class .view-cards trên card bảng. */
    const tableCard = document.querySelector(".opp-table");
    const viewButtons = Array.prototype.slice.call(
      document.querySelectorAll(".view-toggle button[data-view]")
    ) as HTMLElement[];
    const viewHandlers: Array<{ el: HTMLElement; fn: () => void }> = [];
    viewButtons.forEach(function (b) {
      const fn = function () {
        const v = b.getAttribute("data-view");
        if (tableCard) tableCard.classList.toggle("view-cards", v === "card");
        viewButtons.forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
      };
      b.addEventListener("click", fn);
      viewHandlers.push({ el: b, fn });
    });

    return () => {
      groupHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      if (search) search.removeEventListener("input", searchFn);
      sortHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
      viewHandlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, []);

  return null;
}
