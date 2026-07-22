"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import { writeStorage } from "@/lib/storage";

/** Chuyển sáng/tối. Nguồn sự thật là html[data-theme]; lưu lựa chọn vào localStorage. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    writeStorage(STORAGE_KEYS.theme, dark ? "light" : "dark");
  };

  return (
    <button className="theme-btn" aria-label="Toggle theme" onClick={toggle}>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
