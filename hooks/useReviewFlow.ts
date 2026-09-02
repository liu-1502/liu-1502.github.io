"use client";

import { useEffect } from "react";

/** Một hàng phí trong review/success (label + % + tỉ lệ trên giá trị vào). */
export type ReviewFee = { label: string; pct: string; rate: number };

/** Cấu hình 1 luồng (mint/redeem · deposit/withdraw · stake/unstake · bridge…). */
export type ReviewFlow = {
  paySym: string; payIcon: string; recvSym: string; recvIcon: string;
  recvMul: number; payUsd: number; rate: string; rateLabel?: string; fees: ReviewFee[];
  revTitle: string; revCta: string;
  okTitle: string; okSub: string; okPrimary: string;
};

/**
 * Gắn luồng "Review order -> (giả lập xử lý) -> Success" cho mọi form dùng chung 2 dialog
 * <ReviewDialogs/>. Nút CTA của form mang `data-flow="<key>"`; hook đọc số tiền từ ô nhập
 * của form đó, mở review theo cfg, rồi hiện màn thành công. Mọi flow ở đây kết thúc = đóng.
 *
 * Dùng cho Prime/Marketplace/Bridge/Vault… (Alpha có bản riêng trong AlphaClient vì còn
 * luồng stake nối tiếp + đổi panel).
 */
export function useReviewFlow(flows: Record<string, ReviewFlow>, scopeSel = "main.content") {
  useEffect(() => {
    const scope = document.querySelector<HTMLElement>(scopeSel) || document.body;
    const review = scope.querySelector<HTMLElement>("[data-mint-review]");
    const dlg = scope.querySelector<HTMLElement>("[data-mint-ok]");
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

    let current: ReviewFlow | null = null;
    let lastDep = 0;
    let lastInput: HTMLInputElement | null = null;
    let confirmTimer: ReturnType<typeof setTimeout> | null = null;
    // Reset ô nhập của form về mặc định sau khi thành công.
    const resetForm = () => {
      if (!lastInput) return;
      lastInput.value = "";
      lastInput.dispatchEvent(new Event("input", { bubbles: true }));
      lastInput = null;
    };

    const feeUsd = (cfg: ReviewFlow, i: number) => lastDep * cfg.payUsd * (cfg.fees[i]?.rate || 0);
    const fillFees = (root: HTMLElement, pfx: string, cfg: ReviewFlow, withPct: boolean) => {
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

    const populateReview = (cfg: ReviewFlow) => {
      current = cfg;
      const set = (sel: string, v: string) => { const el = review.querySelector(sel); if (el) el.textContent = v; };
      set("[data-rev-title]", cfg.revTitle);
      set("[data-rev-pay]", num(lastDep));
      set("[data-rev-pay-sym]", cfg.paySym);
      review.querySelector("[data-rev-pay-icon]")?.setAttribute("src", cfg.payIcon);
      set("[data-rev-recv]", num(lastDep * cfg.recvMul));
      set("[data-rev-recv-sym]", cfg.recvSym);
      review.querySelector("[data-rev-recv-icon]")?.setAttribute("src", cfg.recvIcon);
      set("[data-rev-rate-label]", cfg.rateLabel || "Rate");
      set("[data-rev-rate]", cfg.rate);
      fillFees(review, "rev", cfg, true);
      set("[data-rev-cta]", cfg.revCta);
      open(review, true);
    };

    // Đọc số tiền từ ô nhập của form chứa nút CTA (ô editable đầu tiên).
    const startFlow = (cfg: ReviewFlow, btn: HTMLElement) => {
      const form = btn.closest<HTMLElement>("[data-dirpanel]") || btn.closest<HTMLElement>(".xchg-body") || btn.parentElement;
      const inp = form?.querySelector<HTMLInputElement>("input:not([readonly])");
      const dep = parseFloat((inp?.value || "").replace(/,/g, "")) || 0;
      const xusd = form?.querySelector<HTMLElement>(".xusd");
      if (dep <= 0) {
        if (xusd) { xusd.textContent = "Enter an amount first"; xusd.classList.add("xusd-err"); }
        inp?.focus();
        return;
      }
      if (xusd) xusd.classList.remove("xusd-err");
      lastDep = dep;
      lastInput = inp || null;
      populateReview(cfg);
    };

    const finishFlow = () => {
      const cfg = current;
      if (!cfg) return;
      const oset = (sel: string, v: string) => dlg.querySelectorAll(sel).forEach((el) => (el.textContent = v));
      oset("[data-ok-amt]", num(lastDep * cfg.recvMul));
      oset("[data-ok-sym]", cfg.recvSym);
      oset("[data-ok-title]", cfg.okTitle);
      const osub = dlg.querySelector<HTMLElement>("[data-ok-sub]");
      if (osub) osub.innerHTML = cfg.okSub;
      fillFees(dlg, "ok", cfg, false);
      const oprim = dlg.querySelector<HTMLElement>("[data-ok-primary]");
      if (oprim) oprim.textContent = cfg.okPrimary;
      // Các flow này kết thúc = đóng -> chỉ cần 1 nút, ẩn nút Close phụ.
      const sec = dlg.querySelector<HTMLElement>("[data-ok-close-btn]");
      if (sec) sec.hidden = true;
      resetForm(); // thành công -> form về mặc định
      open(review, false);
      open(dlg, true);
    };

    const clearLoading = () => {
      if (confirmTimer) { clearTimeout(confirmTimer); confirmTimer = null; }
      review.querySelector(".mrev-cta")?.classList.remove("is-loading");
    };

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const flowBtn = t.closest<HTMLElement>("[data-flow]");
      if (flowBtn) {
        const cfg = flows[flowBtn.getAttribute("data-flow") || ""];
        if (cfg) startFlow(cfg, flowBtn);
        return;
      }
      if (t.closest("[data-mint-review-confirm]")) {
        const btn = t.closest<HTMLElement>("[data-mint-review-confirm]");
        if (btn?.classList.contains("is-loading")) return;
        btn?.classList.add("is-loading");
        confirmTimer = setTimeout(() => { confirmTimer = null; btn?.classList.remove("is-loading"); finishFlow(); }, 1200);
        return;
      }
      if (t.closest("[data-mint-review-close]")) { clearLoading(); lastInput = null; open(review, false); return; }
      if (t.closest("[data-ok-primary]") || t.closest("[data-mint-ok-close]")) { open(dlg, false); return; }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { clearLoading(); lastInput = null; open(review, false); open(dlg, false); }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      if (confirmTimer) clearTimeout(confirmTimer);
      document.body.style.overflow = "";
    };
  }, [flows, scopeSel]);
}
