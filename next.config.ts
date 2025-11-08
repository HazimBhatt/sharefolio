import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    optimizeCss: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {protocol:"https",hostname:"res.cloudinary.com"},
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;
