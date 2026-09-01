"use client";

import { useEffect } from "react";
import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";

/* Tỷ giá + hệ số USD cho từng token/chiều của Alpha. */
const RATES: RateMap = {
  yzusd: { mint: { rate: 1, dp: 1, rp: 1 }, redeem: { rate: 1, dp: 1, rp: 1 } },
  yzpp: { mint: { rate: 1 / 1.148527, dp: 1, rp: 1.148527 }, redeem: { rate: 1.148527, dp: 1.148527, rp: 1 } },
  syzusd: { stake: { rate: 0.9361, dp: 1, rp: 1.0683 }, unstake: { rate: 1.0683, dp: 1.0683, rp: 1 } },
};

export default function AlphaClient() {
  useExchangePanels(RATES, { walletCta: true });

  // Orders: lọc theo trạng thái + tìm theo tx hash; mặc định hiện 3, "Show more" +10.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pg-alpha .ohist");
    if (!root) return;
    const list = root.querySelector<HTMLElement>(".olist");
    const btn = root.querySelector<HTMLElement>("[data-omore]");
    const filters = root.querySelector<HTMLElement>(".ord-filters");
    const search = root.querySelector<HTMLInputElement>(".osearch input");
    if (!list) return;
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".ord"));
    let statusFilter = "all";
    let query = "";

    const matches = (r: HTMLElement) => {
      const okStatus = statusFilter === "all" || r.getAttribute("data-status") === statusFilter;
      const okQuery = !query || (r.querySelector(".otx")?.textContent || "").toLowerCase().includes(query);
      return okStatus && okQuery;
    };
    // Dialog history: hiện FULL lịch sử (chỉ lọc theo status + tìm theo tx, không phân trang).
    const apply = () => {
      rows.forEach((r) => { r.style.display = matches(r) ? "" : "none"; });
      if (btn) btn.style.display = "none";
    };
    apply();

    const onFilter = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".ofilter");
      if (!b) return;
      filters?.querySelectorAll(".ofilter").forEach((x) => x.classList.toggle("on", x === b));
      statusFilter = b.getAttribute("data-filter") || "all";
      apply();
    };
    const onSearch = () => { query = (search?.value || "").trim().toLowerCase(); apply(); };
    filters?.addEventListener("click", onFilter);
    search?.addEventListener("input", onSearch);
    return () => {
      filters?.removeEventListener("click", onFilter);
      search?.removeEventListener("input", onSearch);
    };
  }, []);

  // Dialog history: mở khi bấm icon history, đóng khi bấm backdrop / nút X / Esc.
  useEffect(() => {
    const dlg = document.querySelector<HTMLElement>(".pg-alpha [data-history-dialog]");
    const openBtn = document.querySelector<HTMLElement>(".pg-alpha [data-history-open]");
    if (!dlg || !openBtn) return;
    const content = document.querySelector<HTMLElement>("main.content");
    const setOpen = (o: boolean) => {
      // Backdrop phủ full viewport (inset:0); chỉ đẩy card (đã canh giữa) sang phải bằng
      // padding-left = mép trái content, để dialog canh giữa theo vùng content mà nền vẫn bao hết.
      if (o) dlg.style.paddingLeft = (content ? Math.round(content.getBoundingClientRect().left) : 0) + "px";
      dlg.hidden = !o;
      openBtn.setAttribute("aria-expanded", o ? "true" : "false");
      document.body.style.overflow = o ? "hidden" : "";
    };
    const onOpen = () => setOpen(true);
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-history-close]")) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    openBtn.addEventListener("click", onOpen);
    dlg.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      openBtn.removeEventListener("click", onOpen);
      dlg.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  // Chuyển token panel theo hash URL (sidebar sub-menu: /alpha#yzusd, /alpha#yzpp, /alpha#syzusd).
  useEffect(() => {
    const host = document.querySelector<HTMLElement>(".pg-alpha .xchg");
    if (!host) return;
    const VALID = ["yzusd", "yzpp", "syzusd"];
    const show = (name: string) => {
      if (!VALID.includes(name)) return;
      host.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === name ? "" : "none";
      });
      // Đồng bộ highlight sub-menu sidebar: chỉ token đang chọn được .on.
      // (Next render href có thể là "/alpha/#yzusd" -> match theo "#" cho chắc.)
      document.querySelectorAll<HTMLAnchorElement>('.side-sub a[href*="#"]').forEach((a) => {
        const t = (a.getAttribute("href")?.split("#")[1] || "").toLowerCase();
        a.classList.toggle("on", t === name);
      });
    };
    const fromHash = () => { show(location.hash.slice(1).toLowerCase() || "yzusd"); };
    fromHash();

    // Swap sheets: From / Wallet / Settings mở đè lên card; back để đóng; chọn token -> điền vào From.
    const sheets = Array.from(document.querySelectorAll<HTMLElement>(".pg-alpha [data-swap-sheet]"));
    const closeSheets = () => sheets.forEach((s) => (s.hidden = true));
    const onSheet = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const open = t.closest<HTMLElement>("[data-swap-open]");
      if (open) {
        const name = open.getAttribute("data-swap-open");
        closeSheets();
        const s = sheets.find((x) => x.getAttribute("data-swap-sheet") === name);
        if (s) {
          s.hidden = false;
          const inp = s.querySelector<HTMLInputElement>("input");
          if (inp) setTimeout(() => inp.focus(), 0);
        }
        return;
      }
      if (t.closest("[data-swap-back]")) { closeSheets(); return; }
      const toggle = t.closest<HTMLElement>(".swapx-toggle");
      if (toggle) {
        toggle.setAttribute("aria-checked", toggle.getAttribute("aria-checked") === "true" ? "false" : "true");
        return;
      }
      const item = t.closest<HTMLElement>("[data-swap-token]");
      if (item) {
        const sym = item.getAttribute("data-swap-token") || "";
        const icon = item.getAttribute("data-token-icon") || "";
        document.querySelectorAll<HTMLElement>(".pg-alpha [data-from-ic]").forEach((ic) => {
          ic.style.backgroundImage = `url(${icon})`; ic.style.backgroundSize = "cover"; ic.style.backgroundPosition = "center"; ic.classList.remove("swapx-ic-empty");
        });
        const fromName = document.querySelector<HTMLElement>(".pg-alpha [data-from-name]");
        if (fromName) { fromName.textContent = sym; fromName.classList.remove("muted"); }
        closeSheets();
      }
    };
    document.addEventListener("click", onSheet);

    window.addEventListener("hashchange", fromHash);
    // Next.js Link dùng pushState -> KHÔNG fire hashchange, nên bắt click trực tiếp trên sub-menu link.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const name = (a.getAttribute("href")?.split("#")[1] || "").toLowerCase();
      if (VALID.includes(name)) { show(name); window.scrollTo(0, 0); }
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
      document.removeEventListener("click", onSheet);
    };
  }, []);

  return null;
}
