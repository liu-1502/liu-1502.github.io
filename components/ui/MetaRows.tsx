/** Bảng thông tin key-value dưới nút CTA của các form exchange (Alpha/Prime/Marketplace).
 *  Value dạng chữ -> Instrument Sans (đen); value dạng số (%, $, =, tỉ lệ) -> giữ Geist Mono. */
export type MetaRow = { k: string; v: string; hi?: boolean };

/** Giá trị là "số"/figure nếu chứa % $ = hoặc tỉ lệ dạng 1:1 -> giữ mono. */
const isFigure = (v: string) => /[%$=]/.test(v) || /\d+:\d+/.test(v);

export default function MetaRows({ rows }: { rows: MetaRow[] }) {
  return (
    <div className="mfoot mrows">
      {rows.map((r) => (
        <div key={r.k}>
          <span className="k">{r.k}</span>
          <span className={`v${r.hi ? " hi" : ""}${isFigure(r.v) ? " num" : ""}`}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}
