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
    const PAGE = 3;
    let limit = PAGE;
    // Orders lọc theo token đang xem (đồng bộ với panel qua event "alpha-token").
    const VALID_TOK = ["yzusd", "syzusd", "yzpp"];
    let tokenFilter = location.hash.slice(1).toLowerCase();
    if (!VALID_TOK.includes(tokenFilter)) tokenFilter = "yzusd";

    const matches = (r: HTMLElement) => {
      const okToken = r.getAttribute("data-token") === tokenFilter;
      const okStatus = statusFilter === "all" || r.getAttribute("data-status") === statusFilter;
      const okQuery = !query || (r.querySelector(".otx")?.textContent || "").toLowerCase().includes(query);
      return okToken && okStatus && okQuery;
    };
    // Mặc định hiện 3; "Show more" sổ thêm 10 mỗi lần. Đổi filter/search -> reset về 3.
    const apply = () => {
      const matched = rows.filter(matches);
      rows.forEach((r) => (r.style.display = "none"));
      matched.slice(0, limit).forEach((r) => (r.style.display = ""));
      if (btn) btn.style.display = matched.length > limit ? "" : "none";
    };
    apply();

    const onFilter = (e: Event) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>(".ofilter");
      if (!b) return;
      filters?.querySelectorAll(".ofilter").forEach((x) => x.classList.toggle("on", x === b));
      statusFilter = b.getAttribute("data-filter") || "all";
      limit = PAGE;
      apply();
    };
    const onSearch = () => { query = (search?.value || "").trim().toLowerCase(); limit = PAGE; apply(); };
    const onMore = () => { limit += 10; apply(); };
    // Đổi token (panel) -> lọc lại orders theo token đó, reset về 3 dòng.
    const onToken = (e: Event) => {
      const tk = (e as CustomEvent<string>).detail;
      if (!tk || !VALID_TOK.includes(tk)) return;
      tokenFilter = tk;
      limit = PAGE;
      apply();
    };
    filters?.addEventListener("click", onFilter);
    search?.addEventListener("input", onSearch);
    btn?.addEventListener("click", onMore);
    document.addEventListener("alpha-token", onToken);
    return () => {
      filters?.removeEventListener("click", onFilter);
      search?.removeEventListener("input", onSearch);
      btn?.removeEventListener("click", onMore);
      document.removeEventListener("alpha-token", onToken);
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
    const MINT_FEE = 0.001;

    // Mọi form (mint/redeem · stake/unstake · yzPP) dùng chung 2 dialog (review + success);
    // nội dung đổi theo flow. Mỗi flow khai báo pay→recv, tỷ giá, danh sách phí, và hành động success.
    const USDT0 = "/assets/tokens/usdt0.png", YZ = "/assets/tokens/yzUSD.svg", SYZ = "/assets/tokens/syzUSD.svg", YPP = "/assets/tokens/yzPP.svg";
    const STAKE_FEE = 0.005, REDEEM_FEE = 0.001, UNSTAKE_FEE = 0.001;
    type Fee = { label: string; pct: string; rate: number };
    type Flow = {
      paySym: string; payIcon: string; recvSym: string; recvIcon: string; recvMul: number; payUsd: number;
      rate: string; fees: Fee[];
      revTitle: string; revCta: string; okTitle: string; okSub: string; okPrimary: string;
      okAction: "stake" | "position" | "close"; setMinted?: boolean; setStaked?: boolean;
    };
    const FLOWS: Record<string, Flow> = {
      mint: { paySym: "USDT0", payIcon: USDT0, recvSym: "yzUSD", recvIcon: YZ, recvMul: 1, payUsd: 1,
        rate: "1 USDT0 = 1 yzUSD", fees: [{ label: "Mint fee", pct: "0.10%", rate: MINT_FEE }],
        revTitle: "You’re minting", revCta: "Confirm mint", okTitle: "yzUSD minted successfully",
        okSub: "Stake it to receive syzUSD and target <b>7.75%</b> weekly yield.", okPrimary: "Stake now", okAction: "stake", setMinted: true },
      mintstake: { paySym: "USDT0", payIcon: USDT0, recvSym: "syzUSD", recvIcon: SYZ, recvMul: (1 - MINT_FEE) * 0.9361, payUsd: 1,
        rate: "1 USDT0 = 0.9361 syzUSD", fees: [{ label: "Mint fee", pct: "0.10%", rate: MINT_FEE }, { label: "Stake fee", pct: "0.50%", rate: STAKE_FEE }],
        revTitle: "You’re minting & staking", revCta: "Confirm mint & stake", okTitle: "Minted & staked successfully",
        okSub: "You’re now earning <b>7.75%</b> weekly yield on syzUSD.", okPrimary: "View position", okAction: "position", setStaked: true },
      stake: { paySym: "yzUSD", payIcon: YZ, recvSym: "syzUSD", recvIcon: SYZ, recvMul: 0.9361, payUsd: 1,
        rate: "1 yzUSD = 0.9361 syzUSD", fees: [{ label: "Stake fee", pct: "0.50%", rate: STAKE_FEE }],
        revTitle: "You’re staking", revCta: "Confirm stake", okTitle: "Staked successfully",
        okSub: "You’re now earning <b>7.75%</b> weekly yield on syzUSD.", okPrimary: "View position", okAction: "position", setStaked: true },
      redeem: { paySym: "yzUSD", payIcon: YZ, recvSym: "USDT0", recvIcon: USDT0, recvMul: 1, payUsd: 1,
        rate: "1 yzUSD = 1 USDT0", fees: [{ label: "Redeem fee", pct: "0.10%", rate: REDEEM_FEE }],
        revTitle: "You’re redeeming", revCta: "Confirm redeem", okTitle: "Redeemed successfully",
        okSub: "USDT0 is on its way to your wallet.", okPrimary: "Done", okAction: "close" },
      yzppmint: { paySym: "USDT0", payIcon: USDT0, recvSym: "yzPP", recvIcon: YPP, recvMul: 1 / 1.148527, payUsd: 1,
        rate: "1 USDT0 = 0.87068 yzPP", fees: [{ label: "Mint fee", pct: "0.10%", rate: MINT_FEE }],
        revTitle: "You’re minting", revCta: "Confirm mint", okTitle: "yzPP minted successfully",
        okSub: "yzPP is the junior tranche — higher yield with first-loss risk.", okPrimary: "Done", okAction: "close" },
      yzppredeem: { paySym: "yzPP", payIcon: YPP, recvSym: "USDT0", recvIcon: USDT0, recvMul: 1.148527, payUsd: 1.148527,
        rate: "1 yzPP = 1.148527 USDT0", fees: [{ label: "Redeem fee", pct: "0.10%", rate: REDEEM_FEE }],
        revTitle: "You’re redeeming", revCta: "Confirm redeem", okTitle: "Redeemed successfully",
        okSub: "USDT0 is on its way to your wallet.", okPrimary: "Done", okAction: "close" },
      unstake: { paySym: "syzUSD", payIcon: SYZ, recvSym: "yzUSD", recvIcon: YZ, recvMul: 1.0683, payUsd: 1.0683,
        rate: "1 syzUSD = 1.0683 yzUSD", fees: [{ label: "Unstake fee", pct: "0.10%", rate: UNSTAKE_FEE }],
        revTitle: "You’re unstaking", revCta: "Confirm unstake", okTitle: "Unstaked successfully",
        okSub: "yzUSD is now in your wallet.", okPrimary: "Done", okAction: "close" },
    };
    let current: Flow = FLOWS.mint;
    let lastDep = 0;
    // Phí (USD) = số vào × giá USD của token vào × tỉ lệ phí. Điền 2 hàng phí generic của dialog.
    const feeUsd = (cfg: Flow, i: number) => lastDep * cfg.payUsd * (cfg.fees[i]?.rate || 0);
    const fillFees = (root: HTMLElement, pfx: string, cfg: Flow, withPct: boolean) => {
      for (let i = 0; i < 2; i++) {
        const row = root.querySelector<HTMLElement>(`[data-${pfx}-fee${i + 1}-row]`);
        if (!row) continue;
        const f = cfg.fees[i];
        row.hidden = !f;
        if (!f) continue;
        const lab = row.querySelector(`[data-${pfx}-fee${i + 1}-label]`);
        if (lab) lab.innerHTML = withPct && f.pct ? `${f.label} <i>${f.pct}</i>` : f.label;
        const val = row.querySelector(`[data-${pfx}-fee${i + 1}]`);
        if (val) val.textContent = money(feeUsd(cfg, i));
      }
    };

    const alertEl = document.querySelector<HTMLElement>(".pg-alpha [data-mint-alert]");
    // Đã mint (session này) nhưng CHƯA hoàn tất stake -> luôn hiện alert nhắc stake,
    // kể cả khi mở màn stake rồi huỷ. Chỉ ẩn khi đã stake xong hoặc đang mở dialog.
    let minted = false;
    let staked = false;
    let confirmTimer: ReturnType<typeof setTimeout> | null = null;
    const setAlert = (show: boolean) => {
      if (!alertEl) return;
      if (show) {
        // Tổng yzUSD chưa stake = số dư yzUSD đang giữ + số vừa mint.
        const balB = document.querySelector(".pg-alpha [data-user-bal]");
        const bal = parseFloat((balB?.textContent || "").replace(/[^0-9.]/g, "")) || 0;
        const a = alertEl.querySelector("[data-alert-amt]");
        if (a) a.textContent = num(bal + lastDep);
      }
      alertEl.hidden = !show;
    };
    const refreshAlert = () => setAlert(minted && !staked);
    const closeSuccess = () => { open(dlg, false); refreshAlert(); };

    // "How it works" chỉ hiện khi form đang ở tab Mint.
    const howEl = document.querySelector<HTMLElement>(".pg-alpha [data-how-works]");
    const yzForm = document.querySelector<HTMLElement>('.pg-alpha [data-panel="yzusd"]');
    const syncHow = () => {
      if (!howEl || !yzForm) return;
      const active = yzForm.querySelector(".dir-switch button.on")?.getAttribute("data-dir");
      howEl.hidden = active !== "mint";
    };
    const onDirClick = () => setTimeout(syncHow, 0);
    yzForm?.querySelector(".dir-switch")?.addEventListener("click", onDirClick);
    yzForm?.querySelector("[data-swap]")?.addEventListener("click", onDirClick);
    syncHow();

    // Điền review theo cfg (pay = số vào của form, recv = pay × recvMul).
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
      fillFees(review, "rev", cfg, true);
      set("[data-rev-cta]", cfg.revCta);
      setAlert(false); // ẩn alert khi đang mở review
      open(review, true);
    };
    // Mở review cho 1 form bất kỳ: đọc số vào từ ô deposit của [data-dirpanel] tương ứng.
    const startFlow = (cfg: Flow, dp: HTMLElement | null) => {
      const inp = dp?.querySelector<HTMLInputElement>(".mfield-l input:not([readonly])");
      const dep = parseFloat((inp?.value || "").replace(/,/g, "")) || 0;
      const xusd = dp?.querySelector<HTMLElement>(".mfield-l .xusd");
      if (dep <= 0) {
        if (xusd) { xusd.textContent = "Enter an amount first"; xusd.classList.add("xusd-err"); }
        inp?.focus();
        return;
      }
      if (xusd) xusd.classList.remove("xusd-err");
      lastDep = dep;
      populateReview(cfg);
    };
    const startStakeFlow = () => { if (lastDep > 0) populateReview(FLOWS.stake); };
    // Swap (LI.FI): token nguồn động (đã chọn ở sheet) -> yzUSD, đọc số ở ô [data-swap-amt].
    const startSwapFlow = (btn: HTMLElement) => {
      const panel = btn.closest<HTMLElement>("[data-dirpanel]");
      const fromName = panel?.querySelector<HTMLElement>("[data-from-name]");
      const sym = fromName?.getAttribute("data-from-sym") || "";
      const icon = fromName?.getAttribute("data-from-icon") || "";
      if (!sym) { panel?.querySelector<HTMLElement>('[data-swap-open="from"]')?.click(); return; }
      const amtInp = panel?.querySelector<HTMLInputElement>("[data-swap-amt]");
      const dep = parseFloat((amtInp?.value || "").replace(/,/g, "")) || 0;
      if (dep <= 0) { amtInp?.focus(); return; }
      lastDep = dep;
      populateReview({
        paySym: sym, payIcon: icon, recvSym: "yzUSD", recvIcon: YZ, recvMul: 1, payUsd: 1,
        rate: `1 ${sym} = 1 yzUSD`, fees: [],
        revTitle: "You’re swapping", revCta: "Confirm swap", okTitle: "Swap complete",
        okSub: "yzUSD is now in your wallet.", okPrimary: "Done", okAction: "close",
      });
    };

    // Confirm ở review -> dialog thành công theo flow hiện tại.
    const finishFlow = () => {
      const cfg = current;
      const oset = (sel: string, v: string) => dlg.querySelectorAll(sel).forEach((el) => (el.textContent = v));
      oset("[data-ok-amt]", num(lastDep * cfg.recvMul));
      oset("[data-ok-sym]", cfg.recvSym);
      oset("[data-ok-title]", cfg.okTitle);
      const osub = dlg.querySelector<HTMLElement>("[data-ok-sub]");
      if (osub) osub.innerHTML = cfg.okSub;
      fillFees(dlg, "ok", cfg, false);
      const oprim = dlg.querySelector<HTMLElement>("[data-ok-primary]");
      if (oprim) oprim.textContent = cfg.okPrimary;
      // Flow "close" chỉ cần 1 nút (nút primary tự đóng) -> ẩn nút Close phụ.
      const sec = dlg.querySelector<HTMLElement>("[data-ok-close-btn]");
      if (sec) sec.hidden = cfg.okAction === "close";
      // Cập nhật trạng thái mint/stake (điều khiển alert nhắc stake nếu còn).
      if (cfg.setMinted) { minted = true; staked = false; }
      if (cfg.setStaked) { staked = true; }
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
      // Nút CTA của form bất kỳ (data-flow) -> mở review order theo flow tương ứng.
      const flowBtn = t.closest<HTMLElement>("[data-flow]");
      if (flowBtn) {
        const key = flowBtn.getAttribute("data-flow") || "";
        if (key === "swap") { startSwapFlow(flowBtn); return; }
        const cfg = FLOWS[key];
        if (cfg) startFlow(cfg, flowBtn.closest<HTMLElement>("[data-dirpanel]"));
        return;
      }
      if (t.closest("[data-alert-stake]")) { startStakeFlow(); return; }
      // "Stake now" trên thẻ balance -> stake toàn bộ số dư yzUSD hiện có.
      if (t.closest("[data-bal-stake]")) {
        const balB = document.querySelector(".pg-alpha [data-user-bal]");
        const bal = parseFloat((balB?.textContent || "").replace(/[^0-9.]/g, "")) || 0;
        if (bal > 0) { lastDep = bal; populateReview(FLOWS.stake); }
        return;
      }
      if (t.closest("[data-mint-review-confirm]")) {
        // Giả lập xử lý ~1.2s (spinner) rồi mới sang màn success.
        const btn = t.closest<HTMLElement>("[data-mint-review-confirm]");
        if (btn?.classList.contains("is-loading")) return;
        btn?.classList.add("is-loading");
        confirmTimer = setTimeout(() => { confirmTimer = null; btn?.classList.remove("is-loading"); finishFlow(); }, 1200);
        return;
      }
      if (t.closest("[data-ok-primary]")) {
        // Hành động nút primary theo flow: stake -> mở review stake; position -> qua panel syzUSD; close -> chỉ đóng.
        const act = current.okAction;
        open(dlg, false);
        if (act === "stake") { startStakeFlow(); }
        else {
          refreshAlert();
          if (act === "position") {
            if (location.hash.slice(1).toLowerCase() === "syzusd") window.dispatchEvent(new HashChangeEvent("hashchange"));
            else location.hash = "syzusd";
            window.scrollTo(0, 0);
          }
        }
        return;
      }
      // Huỷ màn review (kể cả stake review) -> nếu đã mint mà chưa stake, alert hiện lại.
      if (t.closest("[data-mint-review-close]")) {
        if (confirmTimer) { clearTimeout(confirmTimer); confirmTimer = null; }
        review.querySelector(".mrev-cta")?.classList.remove("is-loading");
        open(review, false); refreshAlert(); return;
      }
      if (t.closest("[data-mint-ok-close]")) closeSuccess();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (confirmTimer) { clearTimeout(confirmTimer); confirmTimer = null; }
        review.querySelector(".mrev-cta")?.classList.remove("is-loading");
        open(review, false); open(dlg, false); refreshAlert();
      }
    };
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
      yzForm?.querySelector(".dir-switch")?.removeEventListener("click", onDirClick);
      yzForm?.querySelector("[data-swap]")?.removeEventListener("click", onDirClick);
      if (confirmTimer) clearTimeout(confirmTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Chuyển token panel theo hash URL (sidebar sub-menu: /alpha#yzusd, /alpha#yzpp, /alpha#syzusd).
  useEffect(() => {
    const host = document.querySelector<HTMLElement>(".pg-alpha .xchg");
    if (!host) return;
    const VALID = ["yzusd", "yzpp", "syzusd"];
    // Thẻ "Your balance" đổi theo token đang chọn (chỉ yzUSD mới có hàng stake).
    const BAL: Record<string, { sym: string; icon: string; val: string; stake: boolean }> = {
      yzusd: { sym: "yzUSD", icon: "/assets/tokens/yzUSD.svg", val: "$12,480.00", stake: true },
      syzusd: { sym: "syzUSD", icon: "/assets/tokens/syzUSD.svg", val: "$8,900.00", stake: false },
      yzpp: { sym: "yzPP", icon: "/assets/tokens/yzPP.svg", val: "$3,250.00", stake: false },
    };
    const show = (name: string) => {
      if (!VALID.includes(name)) return;
      host.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === name ? "" : "none";
      });
      const bc = document.querySelector<HTMLElement>(".pg-alpha .bal-card");
      const info = BAL[name];
      if (bc && info) {
        bc.querySelector<HTMLImageElement>(".bal-card-ic img")?.setAttribute("src", info.icon);
        const k = bc.querySelector(".bal-card-k"); if (k) k.textContent = `Your ${info.sym} balance`;
        const v = bc.querySelector("[data-user-bal]"); if (v) v.textContent = info.val;
        const sr = bc.querySelector<HTMLElement>(".bal-card-stakerow"); if (sr) sr.hidden = !info.stake;
      }
      // Đồng bộ highlight sub-menu sidebar: chỉ token đang chọn được .on.
      // (Next render href có thể là "/alpha/#yzusd" -> match theo "#" cho chắc.)
      document.querySelectorAll<HTMLAnchorElement>('.side-sub a[href*="#"]').forEach((a) => {
        const t = (a.getAttribute("href")?.split("#")[1] || "").toLowerCase();
        a.classList.toggle("on", t === name);
      });
      // Đồng bộ 2 chip dưới title (syzusd vẫn thuộc chip yzUSD/syzUSD).
      document.querySelectorAll<HTMLElement>(".pg-alpha .av-chip").forEach((c) => {
        const t = c.getAttribute("data-tab");
        c.classList.toggle("on", t === name || (t === "yzusd" && name === "syzusd"));
      });
      // Báo cho Orders lọc lại theo token đang xem.
      document.dispatchEvent(new CustomEvent("alpha-token", { detail: name }));
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
        if (fromName) { fromName.textContent = sym; fromName.classList.remove("muted"); fromName.setAttribute("data-from-sym", sym); fromName.setAttribute("data-from-icon", icon); }
        closeSheets();
      }
    };
    document.addEventListener("click", onSheet);

    window.addEventListener("hashchange", fromHash);
    // Next.js Link dùng pushState -> KHÔNG fire hashchange, nên bắt click trực tiếp trên sub-menu link.
    const onClick = (e: MouseEvent) => {
      // Nút "Switch to …" trong panel chi tiết -> chuyển panel + cập nhật hash.
      const sw = (e.target as HTMLElement).closest<HTMLElement>("[data-switch-panel]");
      if (sw) {
        const name = (sw.getAttribute("data-switch-panel") || "").toLowerCase();
        if (VALID.includes(name)) { location.hash = name; show(name); window.scrollTo(0, 0); }
        return;
      }
      // Chip dưới title (button[data-tab]) -> chuyển panel + cập nhật hash.
      const chip = (e.target as HTMLElement).closest<HTMLElement>(".av-chip[data-tab]");
      if (chip) {
        const name = (chip.getAttribute("data-tab") || "").toLowerCase();
        if (VALID.includes(name)) { location.hash = name; show(name); window.scrollTo(0, 0); }
        return;
      }
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
