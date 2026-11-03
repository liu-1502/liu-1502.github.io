"use client";

import { Sun, Moon } from "lucide-react";
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
      <Sun className="sun" />
      <Moon className="moon" />
    </button>
  );
}
