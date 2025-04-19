/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wellness-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wellness-platform/' : '',
}

export default nextConfig
