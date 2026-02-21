import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  // Skip TypeScript type-checking during build on the server.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;