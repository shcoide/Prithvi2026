import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // All images are local (served from /public), no external domains needed
    unoptimized: false,
  },
};

export default nextConfig;
