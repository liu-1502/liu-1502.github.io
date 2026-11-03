"use client";

import { useEffect } from "react";
import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";
import { useReviewFlow, type ReviewFlow } from "@/hooks/useReviewFlow";

/* Tỷ giá + hệ số USD cho các vault Marketplace. */
const RATES: RateMap = {
  yzsyrup: { deposit: { rate: 1 / 1.0192, dp: 1, rp: 1.0192 }, withdraw: { rate: 1.0192, dp: 1.0192, rp: 1 } },
  yzcash: { deposit: { rate: 1, dp: 1, rp: 1 }, withdraw: { rate: 1, dp: 1, rp: 1 } },
};

const USDC = "/assets/tokens/usdc.svg", YSY = "/assets/tokens/yzSyrup.svg", YCA = "/assets/tokens/yzCash.svg";
const dep = (recvSym: string, recvIcon: string, recvMul: number, rate: string): ReviewFlow => ({
  paySym: "USDC", payIcon: USDC, recvSym, recvIcon, recvMul, payUsd: 1, rate, fees: [],
  revTitle: "You’re depositing", revCta: "Confirm deposit", okTitle: "Deposited successfully",
  okSub: `Your ${recvSym} is now earning yield.`, okPrimary: "Done",
});
const wd = (paySym: string, payIcon: string, recvMul: number, payUsd: number, rate: string): ReviewFlow => ({
  paySym, payIcon, recvSym: "USDC", recvIcon: USDC, recvMul, payUsd, rate, fees: [],
  revTitle: "You’re withdrawing", revCta: "Confirm withdraw", okTitle: "Withdrawn successfully",
  okSub: "USDC is on its way to your wallet.", okPrimary: "Done",
});
const FLOWS: Record<string, ReviewFlow> = {
  "yzsyrup-deposit": dep("yzSyrup", YSY, 1 / 1.0192, "1 USDC = 0.98116 yzSyrup"),
  "yzsyrup-withdraw": wd("yzSyrup", YSY, 1.0192, 1.0192, "1 yzSyrup = 1.0192 USDC"),
  "yzcash-deposit": dep("yzCash", YCA, 1, "1 USDC = 1 yzCash"),
  "yzcash-withdraw": wd("yzCash", YCA, 1, 1, "1 yzCash = 1 USDC"),
};

/* Mật khẩu cổng vào vault (demo, kiểm tra phía client). ĐỔI giá trị này khi cần. */
const GATE_PASSWORD = "123456";

export default function MarketplaceClient() {
  useExchangePanels(RATES, { walletCta: true });
  useReviewFlow(FLOWS);

  /* Điều hướng 2 màn: Overview (danh sách vault) <-> Exchange (deposit/withdraw). */
  useEffect(() => {
    const ov = document.querySelector<HTMLElement>('[data-mkt="overview"]');
    const xc = document.querySelector<HTMLElement>('[data-mkt="exchange"]');
    if (!ov || !xc) return;

    const show = (view: "overview" | "exchange") => {
      ov.hidden = view !== "overview";
      xc.hidden = view !== "exchange";
      // Card exchange được ẩn lúc load nên reveal observer bỏ qua -> ép hiện khi mở.
      if (view === "exchange") xc.querySelectorAll(".rv").forEach((e) => e.classList.add("in"));
      window.scrollTo({ top: 0 });
    };

    const xchg = xc.querySelector<HTMLElement>(".xchg");
    // Hiện đúng panel (form trái + chi tiết phải) của vault được chọn.
    const selectVault = (key: string) => {
      if (!xchg) return;
      xchg.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => {
        p.style.display = p.getAttribute("data-panel") === key ? "" : "none";
      });
    };

    /* ---- Cổng mật khẩu: bấm Deposit -> hiện dialog, đúng pass mới vào ---- */
    const gate = document.querySelector<HTMLElement>("[data-gate]");
    // Đưa modal ra thẳng <body> để thoát stacking-context của .content (z-index:1)
    // vốn nằm dưới sidebar (z-index:60) -> backdrop phủ toàn màn, form căn giữa viewport.
    if (gate && gate.parentElement !== document.body) document.body.appendChild(gate);
    const gateInput = gate?.querySelector<HTMLInputElement>("[data-gate-input]");
    const gateErr = gate?.querySelector<HTMLElement>("[data-gate-err]");
    const gateEye = gate?.querySelector<HTMLElement>("[data-gate-eye]");
    const gateField = gate?.querySelector<HTMLElement>(".mkt-gate-field");
    let pendingVault = "yzsyrup";

    /* Mật khẩu thật giữ riêng; ô input chỉ hiển thị dạng che (*) hoặc rõ. */
    let real = "";
    let reveal = false;
    let revealTimer = 0;
    const render = (showIdx = -1) => {
      if (!gateInput) return;
      if (reveal) {
        gateInput.value = real;
      } else {
        let s = "●".repeat(real.length);
        if (showIdx >= 0 && showIdx < real.length) {
          s = "●".repeat(showIdx) + real[showIdx] + "●".repeat(real.length - showIdx - 1);
        }
        gateInput.value = s;
      }
      // Bật class "dots" để bullet to & tròn hơn khi đang che (không ảnh hưởng text rõ / placeholder).
      gateInput.classList.toggle("dots", !reveal && real.length > 0);
      const end = gateInput.value.length;
      try { gateInput.setSelectionRange(end, end); } catch { /* noop */ }
    };
    const onInput = (e: Event) => {
      const ie = e as InputEvent;
      const it = ie.inputType || "";
      if (it.startsWith("delete")) {
        real = real.slice(0, -1);
        render();
      } else if (ie.data != null) {
        real += ie.data;
        if (reveal) {
          render();
        } else {
          // hiện ký tự vừa gõ ~0.7s rồi che thành *
          window.clearTimeout(revealTimer);
          render(real.length - 1);
          revealTimer = window.setTimeout(() => render(), 700);
        }
      } else {
        render();
      }
      gateErr?.setAttribute("hidden", "");
      gateField?.classList.remove("error");
    };
    const onPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      real += e.clipboardData?.getData("text") || "";
      render();
      gateErr?.setAttribute("hidden", "");
      gateField?.classList.remove("error");
    };

    const openGate = (key: string) => {
      pendingVault = key;
      if (!gate) return;
      real = ""; reveal = false;
      gateEye?.classList.remove("revealed");
      gateField?.classList.remove("error");
      render();
      gate.hidden = false;
      gateErr?.setAttribute("hidden", "");
      document.body.style.overflow = "hidden";
      window.setTimeout(() => gateInput?.focus(), 30);
    };
    const closeGate = () => {
      if (gate) gate.hidden = true;
      document.body.style.overflow = "";
    };
    const tryUnlock = () => {
      if (real === GATE_PASSWORD) {
        closeGate();
        selectVault(pendingVault);
        show("exchange");
      } else {
        gateErr?.removeAttribute("hidden");
        gateField?.classList.add("error");
        gateInput?.focus();
      }
    };
    const onGate = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-gate-close]")) { closeGate(); return; }
      if (t.closest("[data-gate-eye]")) {
        reveal = !reveal;
        gateEye?.classList.toggle("revealed", reveal);
        render();
        gateInput?.focus();
        return;
      }
      if (t.closest("[data-gate-submit]")) tryUnlock();
    };
    const onGateKey = (e: KeyboardEvent) => {
      if (!gate || gate.hidden) return;
      if (e.key === "Enter") tryUnlock();
      else if (e.key === "Escape") closeGate();
    };
    gate?.addEventListener("click", onGate);
    gateInput?.addEventListener("input", onInput);
    gateInput?.addEventListener("paste", onPaste);
    document.addEventListener("keydown", onGateKey);

    const onDeposit = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // "Read More" chỉ mở rộng mô tả — để onOverviewClick xử lý, không mở vault.
      if (t.closest(".mc-more")) return;
      // Bấm nút Deposit/Unlock HOẶC bất kỳ đâu trên card đều mở vault.
      const btn = t.closest<HTMLElement>(".vt-deposit");
      const card = t.closest<HTMLElement>(".mkt-card-click[data-vault]");
      const key = btn?.getAttribute("data-vault") || card?.getAttribute("data-vault");
      if (!key) return;
      // Yêu cầu mật khẩu trước khi mở vault details + form deposit.
      openGate(key);
    };
    const onBack = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-mkt-back]")) show("overview");
    };

    /* Copy địa chỉ contract → hiện tick trong ~1.4s */
    const onCopy = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-copy]");
      if (!btn) return;
      const text = btn.getAttribute("data-copy") || "";
      navigator.clipboard?.writeText(text).catch(() => {});
      btn.classList.add("copied");
      window.setTimeout(() => btn.classList.remove("copied"), 1400);
    };

    /* Toggle khoảng thời gian biểu đồ (7D/30D/90D), phạm vi trong từng section chart */
    const onRange = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-range]");
      if (!btn) return;
      const sec = btn.closest<HTMLElement>(".vd-chart-sec");
      if (!sec) return;
      const key = btn.getAttribute("data-range");
      sec.querySelectorAll<HTMLElement>("[data-rangepanel]").forEach((p) => {
        p.style.display = p.getAttribute("data-rangepanel") === key ? "" : "none";
      });
      sec.querySelectorAll<HTMLElement>("[data-range]").forEach((b) => b.classList.toggle("on", b === btn));
    };

    /* Read More: mở rộng/thu gọn mô tả card */
    const onOverviewClick = (e: MouseEvent) => {
      const more = (e.target as HTMLElement).closest<HTMLElement>(".mc-more");
      if (more) {
        const card = more.closest(".mkt-card");
        const on = card?.classList.toggle("expanded");
        more.textContent = on ? "Show Less" : "Read More";
      }
    };

    ov.addEventListener("click", onDeposit);
    ov.addEventListener("click", onOverviewClick);
    xc.addEventListener("click", onBack);
    xc.addEventListener("click", onRange);
    xc.addEventListener("click", onCopy);
    return () => {
      ov.removeEventListener("click", onDeposit);
      ov.removeEventListener("click", onOverviewClick);
      xc.removeEventListener("click", onBack);
      xc.removeEventListener("click", onRange);
      xc.removeEventListener("click", onCopy);
      gate?.removeEventListener("click", onGate);
      gateInput?.removeEventListener("input", onInput);
      gateInput?.removeEventListener("paste", onPaste);
      document.removeEventListener("keydown", onGateKey);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
