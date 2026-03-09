/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Cloudflare Pages 등 정적 호스팅: 빌드 시 out 폴더 생성 */
  output: 'export',
};

module.exports = nextConfig;
