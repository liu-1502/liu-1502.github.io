/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Xuất tĩnh để deploy GitHub Pages (user-site ở root -> không cần basePath).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Mỗi lần build có một mã riêng, gắn vào địa chỉ file game (lib/events.ts) để trình duyệt không dùng lại bản game cũ sau khi deploy.
  env: { NEXT_PUBLIC_BUILD: String(Date.now()) },
};

export default nextConfig;
