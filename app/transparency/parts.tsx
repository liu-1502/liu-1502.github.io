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

/* ---------- stacked bar + cards: top chiến lược ---------- */
/** Thanh xếp chồng top N chiến lược + "Other", kèm hàng card (pill màu + % + tên + mô tả). */
export function StackedBar({
  rows,
  topN = 5,
}: {
  rows: SplitRow[];
  topN?: number;
}) {
  const total = rows.reduce((a, r) => a + (r[r.length - 1] as number), 0);
  const top = rows.slice(0, topN).map((r) => ({
    name: r[0] as string,
    sub: r.length === 3 ? (r[1] as string) : "",
    v: r[r.length - 1] as number,
  }));
  const otherV = total - top.reduce((a, s) => a + s.v, 0);
  const segs = [...top, { name: "Other", sub: "Remaining positions", v: otherV }];
  // Dùng chung bộ màu chart toàn trang (xanh lá → vàng cam → xanh dương → đỏ → tím), "Other" = xám.
  const PALETTE = ["var(--tp-green)", "var(--tp-amber)", "var(--tp-blue)", "var(--tp-red)", "var(--tp-purple)"];
  const color = (i: number) => (i === segs.length - 1 ? "var(--faint)" : PALETTE[i % PALETTE.length]);
  const pct = (v: number) => (v / total) * 100;
  return (
    <div className="tp-stack">
      <div className="tp-stack-bar">
        {segs.map((s, i) => (
          <span
            key={s.name}
            className="tp-stack-seg"
            style={{ width: `${pct(s.v).toFixed(2)}%`, background: color(i) }}
            title={`${s.name} — ${usd(s.v)}`}
          />
        ))}
      </div>
      <div className="tp-strat-cards">
        {segs.map((s, i) => (
          <div key={s.name} className="tp-strat-card">
            <div className="tp-strat-top">
              <span className="tp-strat-pill" style={{ background: color(i) }} />
              <b style={{ color: color(i) }}>{usd(s.v)}</b>
            </div>
            <div className="tp-strat-nm">{s.name}</div>
            <div className="tp-strat-am">{pct(s.v).toFixed(1)}%</div>
          </div>
        ))}
      </div>
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

const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const fmtDate = (s: string) => {
  const p = s.split("-");
  return `${MON[+p[1] - 1]} ${+p[2]}`;
};

export type ChartSeries = { k: string; label: string; color: string; values: number[] };

/**
 * Biểu đồ đường dùng chung cho cả Backing và APY: lưới kẻ + nhãn trục Y + hover crosshair.
 * `toggleable`: bọc mỗi đường trong <g data-apy-line> để bật/tắt (APY). `fmt`: money | pct.
 */
export function LineChart({
  series,
  min,
  max,
  dates,
  fmt,
  toggleable = false,
}: {
  series: ChartSeries[];
  min: number;
  max: number;
  dates: string[];
  fmt: "money" | "pct";
  toggleable?: boolean;
}) {
  const span = max === min ? 1 : max - min;
  const yT = [0, 1, 2, 3].map((i) => {
    const v = min + (span * i) / 3;
    return { v, y: 124 - (118 * (v - min)) / span };
  });
  const xIdx = [0, 1, 2, 3, 4, 5].map((k) => Math.round((k * (dates.length - 1)) / 5));
  const fmtY = (v: number) => (fmt === "pct" ? `${Math.round(v)}%` : usd(v));
  const payload = JSON.stringify({
    d: dates,
    mn: min,
    mx: max,
    f: fmt,
    s: series.map((s) => ({ k: s.k, label: s.label, color: s.color, v: s.values })),
  });
  return (
    <>
      <div className="tp-plot" data-series={payload}>
        <svg viewBox="0 0 300 130" preserveAspectRatio="none" aria-hidden="true">
          <g className="tp-grid">
            {yT.map((t) => <line key={`h${t.y}`} x1="6" x2="294" y1={t.y} y2={t.y} />)}
            {xIdx.map((i) => {
              const x = 6 + (288 * i) / (dates.length - 1);
              return <line key={`v${i}`} x1={x} x2={x} y1="6" y2="124" />;
            })}
          </g>
          {series.map((s, si) => {
            const g = linePoints(s.values, min, max);
            const line = (
              <polyline
                points={g.points}
                fill="none"
                style={{ stroke: s.color }}
                strokeWidth={1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
            return toggleable ? (
              <g key={s.k} data-apy-line={s.k} style={si === 0 ? undefined : { display: "none" }}>{line}</g>
            ) : (
              <Fragment key={s.k}>{line}</Fragment>
            );
          })}
        </svg>
        <div className="tp-yticks">
          {yT.map((t) => <span key={t.y} style={{ top: `${(t.y / 130) * 100}%` }}>{fmtY(t.v)}</span>)}
        </div>
        <span className="tp-guide" />
        <div className="tp-tip" />
      </div>
      <div className="xlab">
        {xIdx.map((i) => <span key={i}>{fmtDate(dates[i])}</span>)}
      </div>
    </>
  );
}
