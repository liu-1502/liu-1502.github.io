"use client";

import { useExchangePanels, type RateMap } from "@/hooks/useExchangePanels";

/* Tỷ giá + hệ số USD cho các vault Marketplace. */
const RATES: RateMap = {
  yzsyrup: { deposit: { rate: 1 / 1.0192, dp: 1, rp: 1.0192 }, withdraw: { rate: 1.0192, dp: 1.0192, rp: 1 } },
  yzcash: { deposit: { rate: 1, dp: 1, rp: 1 }, withdraw: { rate: 1, dp: 1, rp: 1 } },
};

export default function MarketplaceClient() {
  useExchangePanels(RATES);
  return null;
}
