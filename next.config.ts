import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  // Skip TypeScript type-checking during build on the server.
  // Types are verified locally before every deploy — prevents OOM on 2GB RAM.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
