import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Optimizes compatibility on static hostings if needed, but works great on Vercel
  },
};

export default nextConfig;
