"use client";

import { useEffect } from "react";
import { requestConnectWallet } from "@/lib/wallet";

/** Tỷ giá + hệ số quy đổi USD cho một chiều (mint/redeem, stake/unstake, deposit/withdraw). */
export type RateLeg = { rate: number; dp: number; rp: number };
/** Map: panel key (data-panel) -> direction key (data-dirpanel) -> RateLeg. */
export type RateMap = Record<string, Record<string, RateLeg>>;

interface ExchangePanelOptions {
  /**
   * Đồng bộ chữ nút CTA theo trạng thái ví (Alpha/Prime):
   * chưa connect -> "Connect wallet"; đã connect -> "Verify eligibility to continue".
   * Mặc định false (Marketplace giữ nguyên chữ trong markup).
   */
  walletCta?: boolean;
}

/**
 * Gắn toàn bộ tương tác cho card exchange (mint/redeem · stake/unstake · deposit/withdraw)
 * lên DOM do server component render: chuyển chiều, swap, format số + mirror + USD + rate line,
 * lịch sử lệnh (chọn/lọc), dropdown "About", và CTA theo ví.
 *
 * Dùng chung cho Alpha/Prime/Marketplace — mỗi trang chỉ khác bảng `rates` và cờ `walletCta`.
 */
export function useExchangePanels(rates: RateMap, options: ExchangePanelOptions = {}) {
  const { walletCta = false } = options;

  useEffect(() => {
    const handlers: Array<{ el: Element; type: string; fn: EventListener }> = [];
    const on = (el: Element, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      handlers.push({ el, type, fn });
    };

    /* direction switches inside panels */
    document.querySelectorAll(".dir-switch").forEach((sw) => {
      on(sw, "click", (e) => {
        const b = (e.target as Element).closest("button");
        if (!b) return;
        sw.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const panel = sw.closest(".xchg-body");
        if (!panel) return;
        panel.querySelectorAll("[data-dirpanel]").forEach((d) => {
          (d as HTMLElement).style.display =
            d.getAttribute("data-dirpanel") === b.getAttribute("data-dir") ? "" : "none";
        });
      });
    });

    /* swap circle: đảo chiều bằng cách bấm nút dir chưa active */
    document.querySelectorAll("[data-swap]").forEach((sw) => {
      on(sw, "click", () => {
        const panel = sw.closest(".xchg-body");
        if (!panel) return;
        const inactive = panel.querySelector(".dir-switch button:not(.on)") as HTMLElement | null;
        if (inactive) inactive.click();
      });
    });

    /* ===== Format + mirror + USD + rate line cho từng chiều ===== */
    const num = (n: number, max = 6) => n.toLocaleString("en-US", { maximumFractionDigits: max });
    const usd = (n: number) =>
      "≈ $" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtInt = (s: string) => s.replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    document.querySelectorAll<HTMLElement>("[data-dirpanel]").forEach((panel) => {
      const pk = panel.closest(".xchg-body")?.getAttribute("data-panel") || "";
      const dk = panel.getAttribute("data-dirpanel") || "";
      const cfg = rates[pk]?.[dk] || { rate: 1, dp: 1, rp: 1 };
      const inputs = panel.querySelectorAll<HTMLInputElement>(".mfield-l input");
      const dep = inputs[0];
      const recv = inputs[1];
      const xusds = panel.querySelectorAll(".xusd");
      const tokens = panel.querySelectorAll(".token");
      const depSym = tokens[0]?.textContent?.trim() || "";
      const recvSym = tokens[1]?.textContent?.trim() || "";
      const bal =
        parseFloat((panel.querySelector(".mfield .bal .v")?.textContent || "0").replace(/[^0-9.]/g, "")) || 0;

      /* dòng exchange rate: đặt ngay dưới card (sau .mfields), ẩn cho tới khi có nhập */
      const mfields = panel.querySelector(".mfields");
      let rl = panel.querySelector(".rate-line") as HTMLElement | null;
      if (!rl && depSym && recvSym && mfields) {
        rl = document.createElement("div");
        rl.className = "rate-line";
        rl.textContent = "1 " + depSym + " = " + num(cfg.rate) + " " + recvSym;
        rl.style.display = "none";
        mfields.insertAdjacentElement("afterend", rl);
      }
      if (!dep || !recv) return;

      const update = () => {
        const raw = dep.value.replace(/[^0-9.]/g, "");
        const dot = raw.indexOf(".");
        const ip = fmtInt(dot === -1 ? raw : raw.slice(0, dot));
        const dc = dot === -1 ? "" : raw.slice(dot + 1).replace(/\./g, "").slice(0, 2);
        dep.value = dot === -1 ? ip : ip + "." + dc;
        const amt = parseFloat(dep.value.replace(/,/g, "")) || 0;
        const recvAmt = amt * cfg.rate;
        recv.value = amt ? num(recvAmt) : "";
        if (xusds[0]) xusds[0].textContent = usd(amt * cfg.dp);
        if (xusds[1]) xusds[1].textContent = usd(recvAmt * cfg.rp);
        if (rl) rl.style.display = amt > 0 ? "" : "none";
      };
      on(dep, "input", update);
      update(); /* trạng thái ban đầu */

      panel.querySelectorAll(".pct").forEach((btn) => {
        on(btn, "click", () => {
          const t = (btn.textContent || "").trim();
          const pct = /max/i.test(t) ? 1 : (parseFloat(t) || 0) / 100;
          dep.value = String(bal * pct);
          update();
        });
      });
    });

    /* order history filter chips: lọc theo loại */
    document.querySelectorAll(".ord-filters").forEach((fr) => {
      on(fr, "click", (e) => {
        const b = (e.target as Element).closest(".ofilter");
        if (!b || !fr.contains(b)) return;
        fr.querySelectorAll(".ofilter").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        const f = b.getAttribute("data-filter");
        const list = fr.parentElement?.querySelector(".olist");
        if (!list) return;
        list.querySelectorAll<HTMLElement>(".ord").forEach((o) => {
          o.style.display = f === "all" || o.getAttribute("data-kind") === f ? "" : "none";
        });
      });
    });

    /* nút "About" -> mở/đóng dropdown chi tiết */
    let aboutOutside: EventListener | null = null;
    const aboutBtn = document.querySelector("[data-about-toggle]") as HTMLElement | null;
    const aboutMenu = document.querySelector("[data-about-menu]") as HTMLElement | null;
    const aboutClose = document.querySelector("[data-about-close]") as HTMLElement | null;
    if (aboutBtn && aboutMenu) {
      const setOpen = (open: boolean) => {
        aboutMenu.hidden = !open;
        aboutBtn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      on(aboutBtn, "click", (e) => {
        e.stopPropagation();
        setOpen(aboutMenu.hidden);
      });
      if (aboutClose) {
        on(aboutClose, "click", (e) => {
          e.stopPropagation();
          setOpen(false);
        });
      }
      aboutOutside = (e) => {
        if (!aboutMenu.hidden && !aboutMenu.contains(e.target as Node) && !aboutBtn.contains(e.target as Node))
          setOpen(false);
      };
      document.addEventListener("click", aboutOutside);
    }

    /* CTA: luôn active. Nếu walletCta -> chữ theo trạng thái ví (Alpha/Prime). */
    const setCTAs = () => {
      const connected = document.documentElement.getAttribute("data-wallet") === "1";
      document.querySelectorAll<HTMLButtonElement>(".xchg-body .btn-block").forEach((btn) => {
        btn.disabled = false;
        if (walletCta) btn.textContent = connected ? "Verify eligibility to continue" : "Connect wallet";
      });
    };
    if (walletCta) document.addEventListener("yuzu-wallet", setCTAs);
    setCTAs();

    /* CTA trong form -> mở modal Connect Wallet (khi chưa kết nối) */
    document.querySelectorAll<HTMLButtonElement>(".xchg-body .btn-block").forEach((btn) => {
      on(btn, "click", () => requestConnectWallet());
    });

    return () => {
      handlers.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
      if (walletCta) document.removeEventListener("yuzu-wallet", setCTAs);
      if (aboutOutside) document.removeEventListener("click", aboutOutside);
    };
  }, [rates, walletCta]);
}
