/** @type {import('next').NextConfig} */

const config = {
  transpilePackages: [
    '@hid/ui',
    '@hid/types',
    '@hid/config',
  ],
  images: {
    formats:          ['image/avif', 'image/webp'],
    minimumCacheTTL:  60,
    remotePatterns: [
      {
        protocol:  'https',
        hostname:  '**.supabase.co',
        pathname:  '/storage/v1/object/public/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error'] }
      : false,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/images/:path*',
          destination: '/placeholder.svg',
        },
      ],
    }
  },
}

export default config
