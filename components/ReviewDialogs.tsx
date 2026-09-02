import { X, ArrowRight, Check } from "lucide-react";

/**
 * 2 dialog dùng chung cho luồng review order + success (điều khiển bởi useReviewFlow).
 * Render bên trong wrapper trang (.pg-prime / .pg-marketplace / .pg-bridge / …) để nhận
 * style .mok/.mrev từ alpha/styles.css. Nội dung được JS điền theo flow đang chạy.
 */
export default function ReviewDialogs() {
  return (
    <>
      {/* Review order */}
      <div className="mok" data-mint-review hidden>
        <div className="mok-backdrop" data-mint-review-close />
        <div className="mok-card mrev-card" role="dialog" aria-modal="true" aria-label="Review order">
          <div className="mrev-head">
            <b data-rev-title>Review order</b>
            <button type="button" className="mok-x mrev-x" data-mint-review-close aria-label="Close"><X /></button>
          </div>
          <div className="mok-exch">
            <div className="mok-exch-card">
              <img data-rev-pay-icon src="/assets/tokens/usdc.svg" alt="" />
              <b><span data-rev-pay>0</span> <span data-rev-pay-sym>USDC</span></b>
            </div>
            <span className="mok-exch-ic"><ArrowRight /></span>
            <div className="mok-exch-card">
              <img data-rev-recv-icon src="/assets/tokens/usdc.svg" alt="" />
              <b><span data-rev-recv>0</span> <span data-rev-recv-sym>USDC</span></b>
            </div>
          </div>
          <div className="mrev-cost"><span>Rate</span><b data-rev-rate>&mdash;</b></div>
          <div className="mrev-cost" data-rev-fee1-row><span data-rev-fee1-label>Fee</span><b data-rev-fee1>$0.00</b></div>
          <div className="mrev-cost" data-rev-fee2-row hidden><span data-rev-fee2-label>Fee</span><b data-rev-fee2>$0.00</b></div>
          <div className="mrev-cost"><span>Network fee</span><b>&lt;$0.01</b></div>
          <div className="mrev-cost"><span>Estimated time</span><b>~30 seconds</b></div>
          <button type="button" className="btn btn-accent btn-block mrev-cta" data-mint-review-confirm><span data-rev-cta>Confirm</span><span className="mrev-spinner" aria-hidden="true" /></button>
        </div>
      </div>

      {/* Success */}
      <div className="mok" data-mint-ok hidden>
        <div className="mok-backdrop" data-mint-ok-close />
        <div className="mok-card" role="dialog" aria-modal="true" aria-label="Order successful">
          <button type="button" className="mok-x" data-mint-ok-close aria-label="Close"><X /></button>
          <div className="mok-check"><Check /></div>
          <div className="mok-amt"><span data-ok-amt>0</span> <span data-ok-sym>USDC</span></div>
          <h3 className="mok-title" data-ok-title>Success</h3>
          <p className="mok-sub" data-ok-sub />
          <div className="mok-info">
            <div className="mok-info-row mok-info-between"><span>Transaction ID</span><b className="mok-txid">VKN-8993J244</b></div>
            <div className="mok-info-row mok-info-between" data-ok-fee1-row><span data-ok-fee1-label>Fee</span><b data-ok-fee1>$0.00</b></div>
            <div className="mok-info-row mok-info-between" data-ok-fee2-row hidden><span data-ok-fee2-label>Fee</span><b data-ok-fee2>$0.00</b></div>
          </div>
          <div className="mok-actions">
            <button type="button" className="btn btn-accent btn-block" data-ok-primary>Done</button>
            <button type="button" className="btn btn-line btn-block" data-mint-ok-close data-ok-close-btn>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
