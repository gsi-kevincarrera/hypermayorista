import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demagdtxvkgvtuvcelea.supabase.co',
      },
    ],
  },
}

export default nextConfig
