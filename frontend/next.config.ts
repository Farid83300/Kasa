import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-eu-west-1.amazonaws.com',
        pathname: '/course.oc-static.com/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
    // Désactive l'optimisation automatique (et donc le check anti-SSRF)
    // uniquement pertinent car le backend tourne en local pour ce projet pédagogique
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
