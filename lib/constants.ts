/** Khoá localStorage dùng chung (theme/mode/eligibility/chain).
 *  Gom về một chỗ để tránh chuỗi ma thuật rải rác khắp nơi. */
export const STORAGE_KEYS = {
  theme: "yuzu-theme",
  mode: "yuzu-mode",
  eligible: "yuzu-eligible",
  chain: "yuzu-chain",
} as const;
