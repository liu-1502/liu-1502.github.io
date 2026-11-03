/** Đọc/ghi localStorage an toàn (bọc try/catch cho SSR & chế độ riêng tư).
 *  Gom về một service để không lặp lại try/catch ở mọi component. */
export function readStorage(key: string, fallback = ""): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* bỏ qua khi localStorage không khả dụng */
  }
}
