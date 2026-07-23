# Design System #2 — Yuzu Base

> Nguồn: Figma **"01_Yuzu Base"** (trang ↳ Icons), trích xuất 2026-07-23.
> Token cụ thể: [`styles/yuzu-base.css`](../styles/yuzu-base.css) (tiền tố `--yb-*`).
>
> ⚠️ **Đây là design system THỨ HAI, chưa áp dụng vào UI.** App hiện tại vẫn chạy
> trên DS #1 ([`styles/yuzu.css`](../styles/yuzu.css) — "Yuzu Money DS v1", warm-black
> citrus). File token `yuzu-base.css` **chưa được import** ở đâu. Chờ lệnh mới sẽ
> import và map component sang các token `--yb-*`.

## 1. Bối cảnh & mục tiêu
- Brand: **01_Yuzu Base** — web app.
- Phong cách: có cấu trúc, token-driven, phân lớp, bo góc rõ.
- Khác DS #1: brand **xanh-lá/vàng gradient**, font **Inter**, thang màu **Neutral + Bordeaux**.

## 2. Foundations & tokens

### Màu
| Nhóm | Token | Giá trị |
|---|---|---|
| Neutral | `--yb-neutral-50…900` | #FAFAFA → #1A1A1A |
| Base | `--yb-white` / `--yb-black` | #FFFFFF / #000000 |
| Bordeaux (đỏ) | `--yb-bordeaux-100…900` | #F8D3D3 → #2C0707 |
| Green_Yuzu (brand) | `--yb-green-100/500/900` | ⚠️ **tạm suy** — Figma chỉ có alias, chưa có hex; cần lấy chính xác |
| Gradient | `--yb-gradient-brand-light / logo / button / card-bg` | linear-gradient theo Figma |

**Semantic** (alias → foundation): `--yb-text-dark/neutral/light/brand`, `--yb-icon-dark/neutral/light/brand`, `--yb-border-neutral`, `--yb-bg-light/dark/brand/brand-light/brand-dark`.

### Typography — **Inter**
Thang: 12/14/16/18/20/24/32/40 px. Weight: Regular 400, Medium 500, Semi-Bold 600, Bold 700, Black 900.
Có biến `--yb-fs-*` / `--yb-lh-*` và utility class khớp tên Figma: `.yb-t-16-semi`, `.yb-t-32-bold`, `.yb-t-40-black`, biến thể `-cap` = viết hoa. (32px tracking −4%, 40 Black tracking −3%.)

> ⚠️ Khi áp dụng phải **nạp font Inter** (hiện app dùng Bricolage/Instrument/Geist).

### Spacing — base 4px
`--yb-space-0 … --yb-space-480` (0,2,4,6,8,12,16,20,24,32,40,48,64,80,96,128,160,192,224,256,320,384,480,560,640,720,768,1024,1280,1440,1600,1920).
Margin theo breakpoint: mobile 24 · tablet 32 · desktop 42. Gap: `--yb-gap-36` (560), `--yb-gap-40` (640).

### Radius
`none 0 · sm 2 · (base) 4 · md 6 · lg 8 · xl 12 · 2xl 16 · 3xl 20 · 4xl 24 · circle 10000` (pill).

### Effect (shadow / blur)
`--yb-shadow-card · -bottom-menu · -hover · -freeze-column · -inner-button · -transparent-blur`; blur: `--yb-blur-transparent` (12px), `--yb-blur-glass` (8px).

### Grid
`--yb-grid-gutter-sm` 16px (4/6/12-Dashboard col) · `--yb-grid-gutter-lg` 24px (12 col).

## 3. Component families (Figma)
- **Coin Logo** (bộ logo coin: BTC, ETH, USDT, BNB, ADA, XRP, USDC, DOGE, DOT, BUSD, UNI, BCH, LTC, SOL, LINK, WBTC, XLM, MATIC, DAI, ETC, THETA, ICP, VET, FIL, TRX, EOS, XMR, AAVE, CRO, LUNA, LEO, SHIB, CAKE, ALGO, ATOM, MKR, BSV, FTT).
- **Roles icon**.
- Mỗi component tương tác phải định nghĩa đủ state: **default · hover · focus-visible · active · disabled · loading**.

## 4. Accessibility (bắt buộc, kiểm chứng được)
- Đạt **WCAG 2.2 AA**; tương phản đủ ngưỡng.
- **Keyboard-first**: mọi tương tác thao tác được bằng bàn phím.
- **focus-visible** rõ ràng, không được gỡ.

## 5. Content & tone
Ngắn gọn, tự tin, hướng triển khai.

## 6. Rules
**Do** — dùng token màu/typography có sẵn trước; định nghĩa đủ interaction states.
**Don't** — không tạo token trùng bằng tên một-lần; không hard-code giá trị thô khi đã có token; không gỡ focus-visible/keyboard.

## 7. QA checklist (khi áp dụng)
- [ ] Nạp font **Inter**; import `styles/yuzu-base.css` (sau `globals.css`).
- [ ] Điền **hex chính xác cho `Green_Yuzu`** (100/500/900) từ Figma.
- [ ] Bổ sung "Only icon - Gradient" (image-fill) nếu cần.
- [ ] Mọi component có đủ state; focus-visible & keyboard đạt WCAG 2.2 AA.
- [ ] Không còn giá trị thô trùng token; ưu tiên nhất quán hệ thống.
