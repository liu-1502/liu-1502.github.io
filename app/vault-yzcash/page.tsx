import "./styles.css";
import { pageMetadata } from "@/lib/pages";
import TokenPill from "@/components/ui/TokenPill";
import Button from "@/components/ui/Button";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import ReviewDialogs from "@/components/ReviewDialogs";
import ReviewFlowClient from "@/components/ReviewFlowClient";
import type { ReviewFlow } from "@/hooks/useReviewFlow";

export const metadata = pageMetadata("/vault-yzcash");

const USDC = "/assets/tokens/usdc.svg", YCA = "/assets/tokens/yzCash.svg";
const FLOWS: Record<string, ReviewFlow> = {
  deposit: { paySym: "USDC", payIcon: USDC, recvSym: "yzCash", recvIcon: YCA, recvMul: 0.9945, payUsd: 1,
    rate: "1 USDC = 0.9945 yzCash", fees: [],
    revTitle: "You’re depositing", revCta: "Confirm deposit", okTitle: "Deposited successfully",
    okSub: "Your yzCash is now earning yield.", okPrimary: "Done" },
  withdraw: { paySym: "yzCash", payIcon: YCA, recvSym: "USDC", recvIcon: USDC, recvMul: 1.0055, payUsd: 1.0055,
    rate: "1 yzCash = 1.0055 USDC", fees: [],
    revTitle: "You’re withdrawing", revCta: "Confirm withdraw", okTitle: "Withdrawn successfully",
    okSub: "USDC is on its way to your wallet.", okPrimary: "Done" },
};

export default function VaultYzcash() {
  return (
    <div className="pg-vault-yzcash">
      <div className="app-layout" style={{ paddingTop: 34 }}>

        <div className="xchg rv">
          <SegmentedTabs
            className="xchg-tabs"
            attr="data-tab"
            items={[
              { id: "deposit", label: "Deposit" },
              { id: "withdraw", label: "Withdraw" },
            ]}
          />

          <div className="xchg-body" data-panel="deposit">
            <div className="xfield">
              <div className="xlabel">
                <span>You deposit</span>
                <span>Balance 0.00 <button type="button">Max</button></span>
              </div>
              <div className="xrow">
                <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="0.9945" aria-label="Amount to deposit" />
                <TokenPill sym="usdc" label="USDC" />
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>

            <div className="xdivider"><span>↓</span></div>

            <div className="xfield">
              <div className="xlabel"><span>You receive</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received" />
                <TokenPill sym="yzCash" label="yzCash" />
              </div>
            </div>

            <div className="xmeta">
              <div><span className="k">Token price</span><span className="v">1 yzCash = $1.0055</span></div>
              <div><span className="k">Deposit fee</span><span className="v">None</span></div>
              <div><span className="k">Yield accrual</span><span className="v hi">Daily, to token price</span></div>
              <div><span className="k">Custody</span><span className="v hi">Your wallet, always</span></div>
            </div>

            <Button block data-flow="deposit">Deposit</Button>
          </div>

          <div className="xchg-body" data-panel="withdraw" style={{ display: "none" }}>
            <div className="xfield">
              <div className="xlabel">
                <span>You withdraw</span>
                <span>Balance 0.00 <button type="button">Max</button></span>
              </div>
              <div className="xrow">
                <input type="text" inputMode="decimal" placeholder="0.00" aria-label="Amount to withdraw" />
                <TokenPill sym="yzCash" label="yzCash" />
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>
            <div className="xdivider"><span>↓</span></div>
            <div className="xfield">
              <div className="xlabel"><span>You receive</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" readOnly aria-label="Amount received" />
                <TokenPill sym="usdc" label="USDC" />
              </div>
            </div>
            <div className="xmeta">
              <div><span className="k">Token price</span><span className="v">1 yzCash = $1.0055</span></div>
              <div><span className="k">Withdrawal</span><span className="v">Near instant, no lockup</span></div>
            </div>
            <Button block data-flow="withdraw">Withdraw</Button>
          </div>
        </div>

      </div>

      <div className="vdetail-stats rv">
        <div><div className="k">Current APY</div><div className="v" style={{ color: "var(--mkt)" }}>4.90%</div></div>
        <div><div className="k">Backing</div><div className="v">T-Bills</div></div>
        <div><div className="k">Liquidity</div><div className="v">Instant</div></div>
        <div><div className="k">Lockups</div><div className="v">None</div></div>
      </div>

      <ReviewFlowClient flows={FLOWS} scope=".pg-vault-yzcash" />
      <ReviewDialogs />
    </div>
  );
}
