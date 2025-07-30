import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  webpack: (
    config: any,
    { dev, isServer }: { dev: boolean; isServer: boolean }
  ) => {
    // Ensure splitChunks exists and is not false before modifying
    if (
      !dev &&
      !isServer &&
      config.optimization?.splitChunks &&
      config.optimization.splitChunks !== false
    ) {
      const splitChunks = config.optimization.splitChunks;
      if (typeof splitChunks === "object" && splitChunks.cacheGroups) {
        splitChunks.cacheGroups.styles = {
          name: "styles",
          test: /\.(css|scss)$/,
          chunks: "all",
          enforce: true,
        };
      }
    }
    return config;
  },
};

export default nextConfig;
