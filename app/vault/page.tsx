import "./styles.css";
import { pageMetadata } from "@/lib/pages";
import TokenPill from "@/components/ui/TokenPill";
import Button from "@/components/ui/Button";
import SegmentedTabs from "@/components/ui/SegmentedTabs";
import ReviewDialogs from "@/components/ReviewDialogs";
import ReviewFlowClient from "@/components/ReviewFlowClient";
import type { ReviewFlow } from "@/hooks/useReviewFlow";

export const metadata = pageMetadata("/vault");

const USDC = "/assets/tokens/usdc.svg", YSY = "/assets/tokens/yzSyrup.svg";
const FLOWS: Record<string, ReviewFlow> = {
  deposit: { paySym: "USDC", payIcon: USDC, recvSym: "yzSyrup", recvIcon: YSY, recvMul: 0.9812, payUsd: 1,
    rate: "1 USDC = 0.9812 yzSyrup", fees: [],
    revTitle: "You’re depositing", revCta: "Confirm deposit", okTitle: "Deposited successfully",
    okSub: "Your yzSyrup is now earning yield.", okPrimary: "Done" },
  withdraw: { paySym: "yzSyrup", payIcon: YSY, recvSym: "USDC", recvIcon: USDC, recvMul: 1.0192, payUsd: 1.0192,
    rate: "1 yzSyrup = 1.0192 USDC", fees: [],
    revTitle: "You’re withdrawing", revCta: "Confirm withdraw", okTitle: "Withdrawn successfully",
    okSub: "USDC is on its way to your wallet.", okPrimary: "Done" },
};

export default function Vault() {
  return (
    <div className="pg-vault">
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
                <input type="text" inputMode="decimal" placeholder="0.00" data-src data-rate="0.9812" aria-label="Amount to deposit" />
                <TokenPill sym="usdc" label="USDC" />
              </div>
              <div className="xusd">≈ $0.00</div>
            </div>

            <div className="xdivider"><span>↓</span></div>

            <div className="xfield">
              <div className="xlabel"><span>You receive</span></div>
              <div className="xrow">
                <input type="text" placeholder="0.00" data-dst readOnly aria-label="Amount received" />
                <TokenPill sym="yzSyrup" label="yzSyrup" />
              </div>
            </div>

            <div className="xmeta">
              <div><span className="k">Token price</span><span className="v">1 yzSyrup = $1.0192</span></div>
              <div><span className="k">Deposit fee</span><span className="v">None</span></div>
              <div><span className="k">Performance fee</span><span className="v">10% of yield</span></div>
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
                <TokenPill sym="yzSyrup" label="yzSyrup" />
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
              <div><span className="k">Token price</span><span className="v">1 yzSyrup = $1.0192</span></div>
              <div><span className="k">Withdrawal</span><span className="v">Open, no lockup</span></div>
            </div>
            <Button block data-flow="withdraw">Withdraw</Button>
          </div>
        </div>

      </div>

      <div className="vdetail-stats rv">
        <div><div className="k">Current APY</div><div className="v" style={{ color: "var(--mkt)" }}>8.53%</div></div>
        <div><div className="k">Chain</div><div className="v">Monad</div></div>
        <div><div className="k">Redemption</div><div className="v">Open</div></div>
        <div><div className="k">Venue</div><div className="v">Maple Syrup</div></div>
      </div>

      <ReviewFlowClient flows={FLOWS} scope=".pg-vault" />
      <ReviewDialogs />
    </div>
  );
}
