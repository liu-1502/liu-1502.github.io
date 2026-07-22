import { Fragment } from "react";
import { usd, shortAddr, walletHref, type SplitRow } from "./data";

/** Bảng breakdown (chiến lược hoặc theo chain) với thanh tỉ trọng. Thay renderSplit(). */
export function SplitTable({ rows, colorVar }: { rows: SplitRow[]; colorVar: string }) {
  const total = rows.reduce((a, r) => a + (r[r.length - 1] as number), 0);
  const max = Math.max(...rows.map((r) => r[r.length - 1] as number));
  return (
    <table className="split-table">
      <tbody>
        {rows.map((r, i) => {
          const name = r[0] as string;
          const sub = r.length === 3 ? (r[1] as string) : "";
          const v = r[r.length - 1] as number;
          const pct = (v / total) * 100;
          return (
            <tr key={name}>
              <td className="nm">
                {name}
                {sub && <small>{sub}</small>}
              </td>
              <td className="bar-cell">
                <span className="bar">
                  <i
                    style={{
                      width: `${((v / max) * 100).toFixed(1)}%`,
                      background: `var(${colorVar})`,
                      opacity: Math.max(0.25, 1 - i * 0.055),
                    }}
                  />
                </span>
              </td>
              <td className="amt">{usd(v)}</td>
              <td className="pct">{pct < 0.1 ? "<0.1" : pct.toFixed(1)}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Danh sách ví với link explorer. Thay renderWallets(). */
export function WalletList({ wallets }: { wallets: [string, string][] }) {
  return (
    <div className="wl-list">
      {wallets.map(([name, addr]) => (
        <a key={addr} href={walletHref(addr)} target="_blank" rel="noopener">
          <span className="wname">{name}</span>
          <span className="addr">{shortAddr(addr)} ↗</span>
        </a>
      ))}
    </div>
  );
}

/* ---------- biểu đồ đường (SVG tĩnh, tính hình học thuần) ---------- */
const W = 300;
const H = 130;
const PAD = 6;

function linePoints(values: number[], min: number, max: number) {
  const span = max === min ? 1 : max - min;
  const pt = (i: number, v: number) => {
    const x = PAD + ((W - 2 * PAD) * i) / (values.length - 1);
    const y = H - PAD - ((H - 2 * PAD) * (v - min)) / span;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const points = values.map((v, i) => pt(i, v)).join(" ");
  return {
    points,
    area: `${PAD},${H - PAD} ${points} ${W - PAD},${H - PAD}`,
    lastY: pt(values.length - 1, values[values.length - 1]).split(",")[1],
  };
}

/** Các nét vẽ bên trong <svg> biểu đồ. Thay line(). Màu dùng biến CSS nên theo theme. */
export function ChartLines({
  series,
  min,
  max,
}: {
  series: { values: number[]; color: string }[];
  min: number;
  max: number;
}) {
  return (
    <>
      {series.map((s, si) => {
        const g = linePoints(s.values, min, max);
        return (
          <Fragment key={si}>
            <polygon points={g.area} style={{ fill: s.color }} opacity={0.09} />
            <polyline
              points={g.points}
              fill="none"
              style={{ stroke: s.color }}
              strokeWidth={1.6}
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={W - PAD} cy={g.lastY} r={2.6} style={{ fill: s.color }} />
          </Fragment>
        );
      })}
    </>
  );
}
