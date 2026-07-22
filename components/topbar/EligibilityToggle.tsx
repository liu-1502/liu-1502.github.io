"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";

/** Bật/tắt trạng thái đủ điều kiện (demo KYC). Đặt html[data-eligible] và phát sự
 *  kiện "yuzu-eligible" để các trang có cổng KYC (vd Alpha) phản ứng. */
export default function EligibilityToggle() {
  const [ok, setOk] = useState(false);

  useEffect(() => setOk(readStorage(STORAGE_KEYS.eligible) === "1"), []);

  const toggle = () => {
    const next = !ok;
    setOk(next);
    document.documentElement.setAttribute("data-eligible", next ? "1" : "0");
    writeStorage(STORAGE_KEYS.eligible, next ? "1" : "0");
    document.dispatchEvent(new CustomEvent("yuzu-eligible", { detail: { ok: next } }));
  };

  return (
    <button className="elig-toggle" aria-pressed={ok} title="Demo: simulate KYC eligibility" onClick={toggle}>
      <i>&#10003;</i>ELIGIBLE
    </button>
  );
}
