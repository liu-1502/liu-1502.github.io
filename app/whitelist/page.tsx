import "./styles.css";
import WhitelistClient from "./WhitelistClient";
import { pageMetadata } from "@/lib/pages";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import { Bell, ArrowRight } from "lucide-react";
import { WL_ALPHA, WL_PRIME, WL_CASH, type WlRow } from "./data";

export const metadata = pageMetadata("/whitelist");

function WlTable({ rows }: { rows: WlRow[] }) {
  return (
    <div className="wl-table-wrap">
      <table className="wl">
        <thead><tr><th>Protocol</th><th>Primary assets</th><th>Description</th><th>Whitelisted on</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.proto + i}>
              <td className="proto">
                <span className="wl-logo"><img src={r.logo} alt="" loading="lazy" /></span>
                <span>{r.proto}</span>
              </td>
              <td className="assets">{r.assets}</td>
              <td className="desc"><span>{r.desc}</span></td>
              <td className="date">{r.date}</td>
              <td>
                <span className={`st ${r.status.toLowerCase()}`}>{r.status}</span>
                {r.left ? <span className="st-left">{r.left}</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Whitelist() {
  return (
    <div className="pg-whitelist">
      <div className="wl-top">
      <svg className="wl-illus" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g clipPath="url(#wlIllusClip)">
          <path d="M283.147 303.552C332.759 268.453 350.397 207.766 322.544 168.004C294.69 128.242 231.892 124.462 182.279 159.562C132.667 194.661 115.029 255.348 142.882 295.109C170.736 334.871 233.534 338.651 283.147 303.552Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3.17 6.34" />
          <path d="M259.56 273.831C285.97 255.147 295.36 222.841 280.532 201.675C265.705 180.509 232.276 178.497 205.866 197.181C179.456 215.865 170.067 248.17 184.894 269.337C199.721 290.503 233.15 292.515 259.56 273.831Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3.17 6.34" />
          <path d="M306.43 337.294C378.947 285.991 404.729 197.286 364.016 139.168C323.303 81.0489 231.512 75.524 158.996 126.827C86.4792 178.131 60.6972 266.835 101.41 324.954C142.123 383.073 233.914 388.597 306.43 337.294Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3.17 6.34" />
          <path d="M328.961 369.457C423.642 302.473 457.304 186.657 404.148 110.775C350.991 34.8927 231.145 27.6791 136.465 94.6631C41.7838 161.647 8.12165 277.463 61.2782 353.345C114.435 429.228 234.281 436.441 328.961 369.457Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4.14 8.28" />
          <path d="M375.839 336.873C367.838 335.248 362.622 327.372 364.248 319.371C365.873 311.37 373.749 306.154 381.75 307.78C389.75 309.405 394.966 317.281 393.341 325.282C391.715 333.283 383.839 338.499 375.839 336.873ZM380.765 312.629C375.431 311.545 370.18 315.022 369.096 320.356C368.013 325.69 371.49 330.941 376.824 332.024C382.158 333.108 387.408 329.631 388.492 324.297C389.576 318.963 386.098 313.712 380.765 312.629Z" fill="#7ABA16" />
          <path d="M46.59 342.278C51.9459 343.366 57.17 339.907 58.2582 334.551C59.3464 329.195 55.8867 323.971 50.5308 322.882C45.1749 321.794 39.9508 325.254 38.8626 330.61C37.7744 335.966 41.2341 341.19 46.59 342.278Z" fill="#DAB218" />
          <path d="M141.15 97.3108C145.613 98.2177 149.966 95.3346 150.873 90.8713C151.78 86.408 148.897 82.0547 144.434 81.1478C139.97 80.241 135.617 83.1241 134.71 87.5873C133.803 92.0506 136.686 96.404 141.15 97.3108Z" fill="#A9E34B" />
          <path d="M356.211 133.307C360.674 134.214 365.027 131.331 365.934 126.868C366.841 122.405 363.958 118.051 359.495 117.144C355.031 116.238 350.678 119.121 349.771 123.584C348.864 128.047 351.747 132.401 356.211 133.307Z" fill="#DAB218" />
          <path d="M156.405 189.785C160.868 190.692 165.222 187.808 166.128 183.345C167.035 178.882 164.152 174.529 159.689 173.622C155.226 172.715 150.872 175.598 149.965 180.061C149.059 184.524 151.942 188.878 156.405 189.785Z" fill="#7ABA16" />
          <path d="M277.539 205.947C282.002 206.854 286.355 203.971 287.262 199.508C288.169 195.044 285.286 190.691 280.823 189.784C276.359 188.877 272.006 191.76 271.099 196.224C270.192 200.687 273.075 205.04 277.539 205.947Z" fill="#E0B420" />
        </g>
        <defs>
          <clipPath id="wlIllusClip"><rect width="480" height="480" fill="white" /></clipPath>
        </defs>
      </svg>

      <section className="hub-hero" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div>
          <h1>Asset Whitelist</h1>
          <p className="lede">Yuzu Money only deploys its backing assets into whitelisted protocols and assets. When a new protocol is added, it is subject to a 7-day activation period before any funds are deployed. This page reflects only Yuzu Money&apos;s whitelisted underlying asset exposures and does not include additional smart contract surfaces (e.g. DEXes, routers, bridges, aggregators, etc.) that the protocol may interact with in the course of deployment.</p>
        </div>
      </section>

      <SegmentedTabs
        className="wl-tabs"
        attr="data-t"
        id="wlTabs"
        items={[
          { id: "alpha", label: "Alpha" },
          { id: "prime", label: "Prime" },
          { id: "cash", label: "Cash" },
        ]}
      />
      </div>

      {/* ================= ALPHA ================= */}
      <section className="wl-panel on rv" data-t="alpha">
        <WlTable rows={WL_ALPHA} />
      </section>

      {/* ================= PRIME ================= */}
      <section className="wl-panel rv" data-t="prime">
        <WlTable rows={WL_PRIME} />
      </section>

      {/* ================= CASH ================= */}
      <section className="wl-panel rv" data-t="cash">
        <WlTable rows={WL_CASH} />
      </section>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 18 }}>Snapshot of the live whitelist, 26/07/2026. New product whitelists get their own tab as they launch.</p>

      <a className="wl-bell" href="https://t.me/yuzumoney_stats" target="_blank" rel="noopener" aria-label="Daily Yuzu Updates">
        <Bell className="wl-bell-ic" strokeWidth={2} />
        <span className="wl-bell-tx">
          <b>Daily Yuzu Updates</b>
          <span>We won&apos;t spam 🤟</span>
        </span>
        <ArrowRight className="wl-bell-arr" strokeWidth={2} />
      </a>

      <WhitelistClient />
    </div>
  );
}
