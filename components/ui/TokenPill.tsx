import TokenIcon from "./TokenIcon";

/** Nhãn token có logo (.token) — dùng cạnh ô nhập số ở các panel mint/redeem/stake. */
export default function TokenPill({ sym, label }: { sym: string; label: string }) {
  return (
    <span className="token">
      <TokenIcon sym={sym} />
      {label}
    </span>
  );
}
