/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14
  output: "standalone",
  trailingSlash: true,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['localhost'],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self';"
        }
      ]
    }
  ],

  // Development settings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true
  },
  
  // Analytics and monitoring
  analytics: {
    enabled: true,
    beta: true
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION || '1.0.0'
  },
  
  // Internationalization
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    localeDetection: true
  },
  
  // Build optimization
  swcMinify: true,
  swcMinifyOptions: {
    compress: {
      passes: 2
    }
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
