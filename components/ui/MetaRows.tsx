/** Bảng thông tin key-value dưới nút CTA của các form exchange (Alpha/Prime/Marketplace).
 *  Thay cho dòng mfoot 2 cột cũ — mỗi dòng: nhãn trái (faint) + giá trị phải (mono; hi = accent). */
export type MetaRow = { k: string; v: string; hi?: boolean };

export default function MetaRows({ rows }: { rows: MetaRow[] }) {
  return (
    <div className="mfoot mrows">
      {rows.map((r) => (
        <div key={r.k}>
          <span className="k">{r.k}</span>
          <span className={r.hi ? "v hi" : "v"}>{r.v}</span>
        </div>
      ))}
    </div>
  );
}
