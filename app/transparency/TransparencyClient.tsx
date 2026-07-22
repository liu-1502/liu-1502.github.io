"use client";

import { useEffect } from "react";
import { watchVisible } from "@/lib/watchVisible";

/**
 * Phần động duy nhất còn lại của trang Transparency: reveal độ rộng các thanh
 * "backing vs supply" khi cuộn tới (dùng data-w đã render sẵn trong JSX). Toàn bộ
 * bảng/ví/biểu đồ nay render thuần từ dữ liệu (xem parts.tsx + data.ts).
 */
export default function TransparencyClient() {
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>(".bvs-row .bar i");
    return watchVisible(bars, (bar) => {
      (bar as HTMLElement).style.width = bar.getAttribute("data-w") || "";
    }, 30);
  }, []);

  return null;
}
