import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/sponsors.html', destination: '/childrens-center/sponsor', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      // Renamed pages. `permanent: true` emits a 308, which Next serves natively and
      // which Google treats exactly as it treats a 301.
      {
        source: '/classes/meditative-wellness-walk',
        destination: '/classes/meditative-walk',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
