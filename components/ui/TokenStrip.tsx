import TokenIcon from "./TokenIcon";

/** Dải logo token chồng nhau (.tk-strip) — dùng ở card sản phẩm. */
export default function TokenStrip({ syms }: { syms: string[] }) {
  return (
    <span className="tk-strip">
      {syms.map((sym) => (
        <TokenIcon key={sym} sym={sym} />
      ))}
    </span>
  );
}
