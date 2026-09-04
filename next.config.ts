import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/sponsors.html', destination: '/childrens-center/sponsor', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
    ]
  },
}

export default nextConfig
