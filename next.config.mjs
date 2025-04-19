/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de compilação básicas
  reactStrictMode: false,
  swcMinify: true,

  // Ignorar erros durante a compilação
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configuração para GitHub Pages
  output: 'export',
  distDir: 'out',
  
  // Configurações de imagem para exportação estática
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Configurações de caminho base para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/wellness-platform' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wellness-platform/' : '',

  // Desativar recursos que podem causar problemas de build
  experimental: {
    appDir: false,
    serverActions: false,
  },
}

export default nextConfig
