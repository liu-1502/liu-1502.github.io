/** Kiểu dùng chung nhiều nơi. Kiểu chỉ dùng trong một file thì để tại chỗ. */

/** Một chain trong bộ chọn chain ở topbar. */
export type Chain = {
  id: string;
  name: string;
  /** Đường dẫn logo; nếu thiếu thì rơi về `letter` hoặc icon quả địa cầu. */
  img?: string;
  /** Ký tự viết tắt khi chưa có logo. */
  letter?: string;
};

/** Một mục điều hướng ở sidebar. */
export type NavItem = {
  /** Khớp với PageMeta.nav để tô sáng mục đang mở. */
  nav?: string;
  label: string;
  href: string;
  /** Icon tuỳ chọn (một số mục không có icon trong thiết kế gốc). */
  icon?: React.ReactNode;
  /** Nhãn phụ bên phải (APY, số lượng...). */
  meta?: string;
  /** Link ngoài → render <a target=_blank> kèm mũi tên ↗. */
  external?: boolean;
  /** Mục con cấp 2 (thụt vào dưới rail) — vd Alpha/Prime/Marketplace dưới Dashboard. */
  children?: NavItem[];
};
