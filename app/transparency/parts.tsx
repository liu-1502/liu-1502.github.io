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

/* ---------- Supply vs Backing bars (theo card của Accountable) ---------- */
/** So sánh Supply và Backing dạng cột, phần dư (surplus) nổi bật trên đỉnh Backing. */
export function RatioBars({
  backing,
  supply,
  ratio,
  label,
}: {
  backing: number;
  supply: number;
  ratio: number; // vd 110.82
  label: string;
}) {
  const supplyH = Math.min(100, (supply / backing) * 100); // chiều cao cột supply so với backing
  const surplus = backing - supply;
  const surplusPct = (surplus / supply) * 100;
  return (
    <div className="tp-ratio">
      <div className="tp-ratio-head">
        <div className="tp-ratio-pct">{ratio.toFixed(2)}%</div>
      </div>
      <div className="tp-ratio-lbl">{label}</div>
      <div className="tp-ratio-bars">
        <div className="tp-ratio-col">
          <div className="tp-ratio-track">
            <div className="tp-ratio-fill supply" style={{ height: `${supplyH.toFixed(1)}%` }} />
          </div>
          <span className="tp-ratio-cap">Supply</span>
        </div>
        <div className="tp-ratio-col">
          <div className="tp-ratio-track">
            <div className="tp-ratio-fill backing" style={{ height: "100%" }}>
              <span className="tp-ratio-surplus">
                +{surplusPct.toFixed(1)}%
                <b>+{usd(surplus)}</b>
              </span>
            </div>
          </div>
          <span className="tp-ratio-cap">Backing</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- donut tỉ lệ thế chấp (giữ lại, không dùng) ---------- */
/** Vòng donut hiển thị collateral ratio. Phần supply (được phủ) + phần surplus (đệm). */
export function Donut({
  ratio,
  colorVar = "--good",
}: {
  ratio: number; // vd 110.82
  colorVar?: string;
}) {
  const R = 52;
  const C = 2 * Math.PI * R;
  // supply chiếm 1/ratio của backing; surplus là phần dư.
  const coverage = Math.min(1, 100 / ratio); // 0..1 phần liabilities
  const surplus = 1 - coverage; // phần đệm
  return (
    <svg className="tp-donut" viewBox="0 0 130 130" aria-label={`Collateral ratio ${ratio}%`}>
      <circle cx="65" cy="65" r={R} className="tp-donut-track" />
      {/* phần đệm (surplus) tô đậm màu good */}
      <circle
        cx="65"
        cy="65"
        r={R}
        className="tp-donut-arc"
        style={{ stroke: `var(${colorVar})` }}
        strokeDasharray={`${(C * surplus).toFixed(1)} ${C.toFixed(1)}`}
        strokeDashoffset={(C * 0.25).toFixed(1)}
        transform="rotate(-90 65 65)"
        data-len={(C * surplus).toFixed(1)}
        data-c={C.toFixed(1)}
      />
      {/* phần liabilities tô nhạt */}
      <circle
        cx="65"
        cy="65"
        r={R}
        className="tp-donut-cov"
        style={{ stroke: `var(${colorVar})` }}
        strokeDasharray={`${(C * coverage).toFixed(1)} ${C.toFixed(1)}`}
        strokeDashoffset={(-C * surplus + C * 0.25).toFixed(1)}
        transform="rotate(-90 65 65)"
      />
    </svg>
  );
}

/* ---------- stacked bar: top chiến lược ---------- */
/** Thanh xếp chồng top N chiến lược + "Other", có legend. */
export function StackedBar({
  rows,
  topN = 4,
  colorVar,
}: {
  rows: SplitRow[];
  topN?: number;
  colorVar: string;
}) {
  const total = rows.reduce((a, r) => a + (r[r.length - 1] as number), 0);
  const top = rows.slice(0, topN).map((r) => ({ name: r[0] as string, v: r[r.length - 1] as number }));
  const otherV = total - top.reduce((a, s) => a + s.v, 0);
  const segs = [...top, { name: "Other", v: otherV }];
  // Bảng màu phân biệt: seg đầu = màu sản phẩm, các seg sau dùng màu tương phản, "Other" = xám.
  const POOL = ["#E7B84B", "#3E86E0", "#B06BD6", "#E28743", "#2FB37E"];
  const color = (i: number) =>
    i === segs.length - 1 ? "var(--faint)" : i === 0 ? `var(${colorVar})` : POOL[(i - 1) % POOL.length];
  return (
    <div className="tp-stack">
      <div className="tp-stack-bar">
        {segs.map((s, i) => (
          <span
            key={s.name}
            className="tp-stack-seg"
            style={{ width: `${((s.v / total) * 100).toFixed(2)}%`, background: color(i) }}
            title={`${s.name} — ${usd(s.v)}`}
          />
        ))}
      </div>
      <div className="tp-stack-legend">
        {segs.map((s, i) => (
          <div key={s.name} className="tp-stack-item">
            <span className="dot" style={{ background: color(i) }} />
            <span className="nm">{s.name}</span>
            <span className="pc">{((s.v / total) * 100).toFixed(1)}%</span>
            <span className="am">{usd(s.v)}</span>
          </div>
        ))}
      </div>
      <div className="tp-stack-total"><span>Total</span><b>{usd(total)}</b></div>
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
            <polygon points={g.area} style={{ fill: s.color }} opacity={0.08} />
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
