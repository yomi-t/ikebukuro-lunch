/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers (Static Assets) で配信するため静的エクスポートする
  output: "export",
}

export default nextConfig
