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
  webpack: (config) => {
    // Ignorar erros de importação durante build
    config.optimization = {
      ...config.optimization,
      // Ignorar erros não fatais ao compilar
      minimize: true,
      splitChunks: {
        chunks: 'all',
      },
    }
    return config
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wellness-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wellness-platform/' : '',
  // Desabilitar verificações rigorosas durante build
  experimental: {
    strictNextHead: false,
  },
  // Ignorar erros de build
  onDemandEntries: {
    // Período em ms onde o servidor irá manter páginas no buffer
    maxInactiveAge: 25 * 1000,
    // Páginas que devem ser sempre renderizadas
    pagesBufferLength: 2,
  },
}

export default nextConfig
