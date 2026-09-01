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

  // Flow Mint: bấm "Mint" -> dialog Review order -> Confirm -> dialog thành công.
  useEffect(() => {
    const review = document.querySelector<HTMLElement>(".pg-alpha [data-mint-review]");
    const dlg = document.querySelector<HTMLElement>(".pg-alpha [data-mint-ok]");
    if (!review || !dlg) return;
    const content = document.querySelector<HTMLElement>("main.content");
    const padLeft = () => (content ? Math.round(content.getBoundingClientRect().left) : 0) + "px";
    const open = (el: HTMLElement, o: boolean) => {
      if (o) el.style.paddingLeft = padLeft();
      el.hidden = !o;
      document.body.style.overflow = review.hidden && dlg.hidden ? "" : "hidden";
    };
    const money = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const num = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });
    const mintPanel = () => document.querySelector<HTMLElement>('.pg-alpha [data-panel="yzusd"] [data-dirpanel="mint"]');
    const MINT_FEE = 0.001;

    // 3 luồng dùng chung 2 dialog (review + success); nội dung đổi theo flow.
    const USDT0 = "/assets/tokens/usdt0.png", YZ = "/assets/tokens/yzUSD.svg", SYZ = "/assets/tokens/syzUSD.svg";
    type Flow = {
      paySym: string; payIcon: string; recvSym: string; recvIcon: string; recvMul: number;
      showMint: boolean; stakeFee: number; showStake: boolean; rate: string;
      revTitle: string; revCta: string; okTitle: string; okSub: string; okPrimary: string;
    };
    const FLOWS: Record<string, Flow> = {
      mint: {
        paySym: "USDT0", payIcon: USDT0, recvSym: "yzUSD", recvIcon: YZ, recvMul: 1,
        showMint: true, stakeFee: 0, showStake: false, rate: "1 USDT0 = 1 yzUSD",
        revTitle: "You’re minting", revCta: "Confirm mint", okTitle: "yzUSD minted successfully",
        okSub: "Stake it to receive syzUSD and target <b>7.75%</b> weekly yield.", okPrimary: "Stake now",
      },
      mintstake: {
        paySym: "USDT0", payIcon: USDT0, recvSym: "syzUSD", recvIcon: SYZ, recvMul: (1 - 0.001) * 0.9361,
        showMint: true, stakeFee: 0.005, showStake: true, rate: "1 USDT0 = 0.9361 syzUSD",
        revTitle: "You’re minting & staking", revCta: "Confirm mint & stake", okTitle: "Minted & staked successfully",
        okSub: "You’re now earning <b>7.75%</b> weekly yield on syzUSD.", okPrimary: "View position",
      },
      stake: {
        paySym: "yzUSD", payIcon: YZ, recvSym: "syzUSD", recvIcon: SYZ, recvMul: 0.9361,
        showMint: false, stakeFee: 0.005, showStake: true, rate: "1 yzUSD = 0.9361 syzUSD",
        revTitle: "You’re staking", revCta: "Confirm stake", okTitle: "Staked successfully",
        okSub: "You’re now earning <b>7.75%</b> weekly yield on syzUSD.", okPrimary: "View position",
      },
    };
    let current: Flow = FLOWS.mint;
    let lastDep = 0;
    const stakeFeeUsd = (cfg: Flow) => lastDep * (cfg.showMint ? (1 - MINT_FEE) : 1) * cfg.stakeFee;

    const alertEl = document.querySelector<HTMLElement>(".pg-alpha [data-mint-alert]");
    const earnEl = document.querySelector<HTMLElement>(".pg-alpha [data-earn-alert]");
    const showAlert = (show: boolean) => {
      if (!alertEl) return;
      if (show) { const a = alertEl.querySelector("[data-alert-amt]"); if (a) a.textContent = num(lastDep); }
      alertEl.hidden = !show;
    };
    // Đóng dialog thành công. Default (chưa mint) -> earn alert; vừa mint chưa stake -> mint alert.
    const closeSuccess = () => {
      open(dlg, false);
      const showMint = current === FLOWS.mint && lastDep > 0;
      showAlert(showMint);
      if (earnEl) earnEl.hidden = lastDep > 0; // đã mint -> ẩn earn default
    };

    const depValue = () => {
      const inputs = mintPanel()?.querySelectorAll<HTMLInputElement>(".mfield-l input");
      return { inputs, dep: parseFloat((inputs?.[0]?.value || "").replace(/,/g, "")) || 0 };
    };
    // Điền review theo cfg (pay = lastDep vì mint 1:1).
    const populateReview = (cfg: Flow) => {
      current = cfg;
      const set = (sel: string, v: string) => { const el = review.querySelector(sel); if (el) el.textContent = v; };
      set("[data-rev-title]", cfg.revTitle);
      set("[data-rev-pay]", num(lastDep));
      set("[data-rev-pay-sym]", cfg.paySym);
      review.querySelector("[data-rev-pay-icon]")?.setAttribute("src", cfg.payIcon);
      set("[data-rev-recv]", num(lastDep * cfg.recvMul));
      set("[data-rev-recv-sym]", cfg.recvSym);
      review.querySelector("[data-rev-recv-icon]")?.setAttribute("src", cfg.recvIcon);
      set("[data-rev-rate]", cfg.rate);
      const mfr = review.querySelector<HTMLElement>("[data-rev-mintfee-row]");
      if (mfr) mfr.hidden = !cfg.showMint;
      set("[data-rev-fee]", money(lastDep * MINT_FEE));
      const sfr = review.querySelector<HTMLElement>("[data-rev-stakefee-row]");
      if (sfr) sfr.hidden = !cfg.showStake;
      set("[data-rev-stakefee]", money(stakeFeeUsd(cfg)));
      set("[data-rev-cta]", cfg.revCta);
      showAlert(false);
      open(review, true);
    };
    const startMintFlow = (cfg: Flow) => {
      const { inputs, dep } = depValue();
      const xusd = mintPanel()?.querySelector<HTMLElement>(".mfield-l .xusd");
      if (dep <= 0) {
        if (xusd) { xusd.textContent = "Enter an amount first"; xusd.classList.add("xusd-err"); }
        inputs?.[0]?.focus();
        return;
      }
      if (xusd) xusd.classList.remove("xusd-err");
      lastDep = dep;
      populateReview(cfg);
    };
    const startStakeFlow = () => { if (lastDep > 0) populateReview(FLOWS.stake); };

    // Confirm ở review -> dialog thành công theo flow hiện tại.
    const finishFlow = () => {
      const cfg = current;
      const oset = (sel: string, v: string) => dlg.querySelectorAll(sel).forEach((el) => (el.textContent = v));
      oset("[data-ok-amt]", num(lastDep * cfg.recvMul));
      oset("[data-ok-sym]", cfg.recvSym);
      oset("[data-ok-title]", cfg.okTitle);
      const osub = dlg.querySelector<HTMLElement>("[data-ok-sub]");
      if (osub) osub.innerHTML = cfg.okSub;
      oset("[data-ok-fee]", money(lastDep * MINT_FEE));
      oset("[data-ok-stakefee]", money(stakeFeeUsd(cfg)));
      const mfRow = dlg.querySelector<HTMLElement>("[data-ok-mintfee-row]");
      if (mfRow) mfRow.hidden = !cfg.showMint;
      const sfRow = dlg.querySelector<HTMLElement>("[data-ok-stakefee-row]");
      if (sfRow) sfRow.hidden = !cfg.showStake;
      const oprim = dlg.querySelector<HTMLElement>("[data-ok-primary]");
      if (oprim) oprim.textContent = cfg.okPrimary;
      open(review, false);
      open(dlg, true);
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Thu gọn/mở breakdown (dòng tóm tắt <-> full).
      const toggle = t.closest<HTMLElement>("[data-sum-toggle]");
      if (toggle) {
        const detail = toggle.closest("[data-sum]")?.querySelector<HTMLElement>("[data-sum-detail]");
        if (detail) {
          const willOpen = detail.hidden;
          detail.hidden = !willOpen;
          toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
        }
        return;
      }
      if (t.closest("[data-mint-confirm]")) { startMintFlow(FLOWS.mint); return; }
      if (t.closest("[data-mintstake-confirm]")) { startMintFlow(FLOWS.mintstake); return; }
      if (t.closest("[data-alert-stake]")) { startStakeFlow(); return; }
      if (t.closest("[data-mint-review-confirm]")) { finishFlow(); return; }
      if (t.closest("[data-ok-primary]")) {
        // "Stake now" (mint) -> mở review stake; "View position" (đã stake) -> qua panel syzUSD.
        if (current === FLOWS.mint) { open(dlg, false); startStakeFlow(); }
        else {
          open(dlg, false);
          showAlert(false);
          if (location.hash.slice(1).toLowerCase() === "syzusd") window.dispatchEvent(new HashChangeEvent("hashchange"));
          else location.hash = "syzusd";
          window.scrollTo(0, 0);
        }
        return;
      }
      if (t.closest("[data-mint-review-close]")) open(review, false);
      if (t.closest("[data-mint-ok-close]")) closeSuccess();
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { open(review, false); open(dlg, false); } };
    // Gõ vào ô deposit -> xoá lỗi (hook tự set lại text ≈$; ở đây bỏ màu đỏ).
    const depInput = document.querySelector<HTMLInputElement>('.pg-alpha [data-panel="yzusd"] [data-dirpanel="mint"] .mfield-l input');
    const xusd = document.querySelector<HTMLElement>('.pg-alpha [data-panel="yzusd"] [data-dirpanel="mint"] .mfield-l .xusd');
    const onInput = () => { xusd?.classList.remove("xusd-err"); };
    depInput?.addEventListener("input", onInput);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      depInput?.removeEventListener("input", onInput);
      document.removeEventListener("click", onClick);
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
