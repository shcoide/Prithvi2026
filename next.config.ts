import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  // Skip TypeScript type-checking during build on the server.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint checking during build on the server.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;