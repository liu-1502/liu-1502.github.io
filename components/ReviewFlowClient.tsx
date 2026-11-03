"use client";

import { useReviewFlow, type ReviewFlow } from "@/hooks/useReviewFlow";

/**
 * Bọc mỏng để trang server-component tĩnh (vd Vault) kích hoạt luồng review order.
 * Truyền `flows` (object thuần, serializable) + `scope` (selector wrapper trang).
 */
export default function ReviewFlowClient({ flows, scope }: { flows: Record<string, ReviewFlow>; scope?: string }) {
  useReviewFlow(flows, scope);
  return null;
}
