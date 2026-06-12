// cache-bust: v3
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.northernlogcabins.com" },
      { protocol: "https", hostname: "akuwoodpanel.uk" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
