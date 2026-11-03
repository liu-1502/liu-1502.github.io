import type { ReactNode } from "react";

/**
 * Thanh tab/segmented dùng chung cho các nhóm nút "chọn một" (xchg-tabs, dir-switch,
 * wl-tabs...). Chỉ render markup (class + data-attr đúng như thiết kế gốc); phần
 * đóng/mở panel do các client component xử lý qua chính class/data-attr đó — nên
 * giao diện và hành vi không đổi.
 */
export type SegItem = { id: string; label: ReactNode };

export default function SegmentedTabs({
  className,
  attr,
  items,
  activeId,
  id,
}: {
  /** Class wrapper: "xchg-tabs" | "dir-switch" | "wl-tabs"... */
  className: string;
  /** Tên data-attr trên mỗi nút: "data-tab" | "data-dir" | "data-t"... */
  attr: string;
  items: SegItem[];
  /** Mặc định: phần tử đầu tiên. */
  activeId?: string;
  id?: string;
}) {
  const active = activeId ?? items[0]?.id;
  return (
    <div className={className} id={id}>
      {items.map((it) => {
        const dataAttr: Record<string, string> = { [attr]: it.id };
        return (
          <button key={it.id} className={it.id === active ? "on" : undefined} {...dataAttr}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
