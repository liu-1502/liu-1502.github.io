"use client";

import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";

/* Tỷ giá + hệ số USD cho yzPrime. */
const RATES: RateMap = {
  prime: { mint: { rate: 1 / 1.01243, dp: 1, rp: 1.01243 }, redeem: { rate: 1.01243, dp: 1.01243, rp: 1 } },
};

export default function PrimeClient() {
  useExchangePanels(RATES, { walletCta: true });
  return null;
}
