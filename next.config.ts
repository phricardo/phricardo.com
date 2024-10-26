import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "https://github.com/phricardo",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
