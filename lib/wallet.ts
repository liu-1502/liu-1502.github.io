/** Tên event mở modal Connect Wallet — phát từ các nút CTA, lắng nghe ở Topbar. */
export const OPEN_WALLET_EVENT = "yuzu-open-wallet";

/**
 * Yêu cầu mở modal Connect Wallet. Không làm gì nếu ví đã kết nối
 * (khi đó CTA mang nghĩa khác, không cần mở lại luồng connect).
 */
export function requestConnectWallet() {
  if (typeof document === "undefined") return;
  if (document.documentElement.getAttribute("data-wallet") === "1") return;
  document.dispatchEvent(new CustomEvent(OPEN_WALLET_EVENT));
}
