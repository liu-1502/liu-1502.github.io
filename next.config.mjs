/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Xuất tĩnh để deploy GitHub Pages (user-site ở root -> không cần basePath).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
