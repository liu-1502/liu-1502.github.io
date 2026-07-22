"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/storage";

/** Chuyển chế độ hiển thị lite / pro. Nguồn sự thật là html[data-mode] (CSS đọc). */
export default function ModeSwitch() {
  const [mode, setMode] = useState("lite");

  useEffect(() => setMode(readStorage(STORAGE_KEYS.mode, "lite")), []);

  const apply = (m: string) => {
    setMode(m);
    document.documentElement.setAttribute("data-mode", m);
    writeStorage(STORAGE_KEYS.mode, m);
  };

  return (
    <span className="mode-switch" role="group" aria-label="Detail level">
      <button className={mode === "lite" ? "on" : ""} onClick={() => apply("lite")}>
        LITE
      </button>
      <button className={mode === "pro" ? "on" : ""} onClick={() => apply("pro")}>
        PRO
      </button>
    </span>
  );
}
