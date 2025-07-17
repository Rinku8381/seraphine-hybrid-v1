/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable standalone output for Windows compatibility
  // output: process.env.NODE_ENV === 'production' ? 'export' : 'default',
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  
  // Performance and Optimization
  reactStrictMode: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
    emotion: true
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**'
      }
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: false, // Disable CSS optimization during development
    scrollRestoration: true,
    optimizePackageImports: ['react', 'next']
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
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        }
      ]
    }
  ],

  // Development settings
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION || '1.0.0'
  },
  
  // Internationalization
  // i18n config is unsupported in App Router, so remove or comment out
  // i18n: {
  //   locales: ['en', 'vi'],
  //   defaultLocale: 'en',
  //   localeDetection: true
  // },
  
  // Build optimization

  
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // Analytics and monitoring

  
  // Development settings
  devIndicators: {
    position: 'bottom-right'
  },
  
  // Error handling
  poweredByHeader: false,
  
  // Server settings
  serverRuntimeConfig: {
    mySecret: process.env.MY_SECRET
  },
  
  // Client settings
  publicRuntimeConfig: {
    staticFolder: '/static'
  }
};

module.exports = nextConfig;
