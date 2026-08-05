import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VAULTS } from "./data";

/* Card vault ở màn Overview (Marketplace) — dùng lại được trên Dashboard.
   Khi có `href`, nút Deposit là <Link> điều hướng (Dashboard không có JS wiring);
   khi không có, giữ nguyên <button data-vault> như marketplace overview. */
export default function VaultCard({ v, href, compact }: { v: (typeof VAULTS)[number]; href?: string; compact?: boolean }) {
  return (
    <div className="mkt-card">
      <div className="mc-top">
        <span className="vt-logo"><img src={v.logo} alt="" /></span>
        <div className="mc-id">
          <div className="mc-name"><b>{v.name}</b><span className={`vt-badge ${v.strategy.toLowerCase()}`}>{v.stateBadge}</span></div>
          <small>{v.addr}</small>
        </div>
        <div className="mc-apy"><span className="mc-apy-v">{v.apy}</span><span className="mc-apy-l">Net APY (7D)</span></div>
      </div>
      <div className="mc-badges">
        <span className="mc-chip"><img src={v.chainIcon} alt="" />{v.chain}</span>
        <span className="mc-chip"><img src={v.assetIcon} alt="" />{v.asset}</span>
      </div>
      {!compact && <p className="mc-desc">{v.desc}</p>}
      {!compact && <button type="button" className="mc-more">Read More</button>}
      <div className="mc-stats">
        <div><span className="k">TVL</span><b>{v.tvl}</b><small>{v.tvlChg}</small></div>
        <div><span className="k">Leverage</span><b>{v.leverage}</b></div>
        <div><span className="k">Risk</span><span className={`risk r${v.risk}`}><i /><i /><i /><i /></span><small>{v.riskLabel}</small></div>
      </div>
      <div className="mc-foot">
        <div className="mc-powered"><span className="k">Powered by</span><span className="mc-logos">{v.powered.map((p) => <img key={p} src={p} alt="" />)}</span></div>
        {href ? (
          <Link href={href} className="btn btn-accent vt-deposit">Deposit <ArrowRight /></Link>
        ) : (
          <button type="button" className="btn btn-accent vt-deposit" data-vault={v.key}>Deposit <ArrowRight /></button>
        )}
      </div>
    </div>
  );
}
