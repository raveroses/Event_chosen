import type { NextConfig } from "next";


const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dlxoluszbgnwotiqlndq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/eventimages/**",
      },
    ],
  },
};

export default nextConfig;
