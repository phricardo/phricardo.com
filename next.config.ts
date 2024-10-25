import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://github.com/phricardo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
