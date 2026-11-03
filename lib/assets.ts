/** Đường dẫn asset tĩnh trong /public. Gom về một chỗ để đổi vị trí/CDN dễ dàng
 *  và tránh lặp chuỗi "/assets/...". `sym`/`id` chính là tên file (giữ đúng hoa/thường). */
export const tokenSrc = (sym: string) => `/assets/tokens/${sym}.svg`;
export const chainSrc = (id: string) => `/assets/chains/${id}.svg`;
