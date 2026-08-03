import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.14'],
  // ponytail: strict mode enabled for edge case safety, no fancy custom webpack config needed
};

export default nextConfig;
