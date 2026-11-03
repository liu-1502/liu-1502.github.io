/** Đóng drawer điều hướng mobile — phát từ scrim / link trong Sidebar,
 *  lắng nghe ở Topbar (nơi giữ state mở/đóng). */
export const MOBILE_NAV_CLOSE_EVENT = "yuzu-mobile-nav-close";

export function closeMobileNav() {
  if (typeof document !== "undefined") {
    document.dispatchEvent(new CustomEvent(MOBILE_NAV_CLOSE_EVENT));
  }
}
