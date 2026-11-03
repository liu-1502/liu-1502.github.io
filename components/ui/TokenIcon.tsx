import { tokenSrc } from "@/lib/assets";

/** Logo token đơn (SVG tĩnh trong /public). `sym` = tên file (yzUSD, syzUSD, usdt...). */
export default function TokenIcon({ sym, alt = "" }: { sym: string; alt?: string }) {
  return <img src={tokenSrc(sym)} alt={alt} />;
}
