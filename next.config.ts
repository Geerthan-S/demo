import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/get-quote/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/services/commercial-buildings/:path*",
        destination: "/services/civil-construction",
        statusCode: 301,
      },
      // Old pages now folded into homepage sections
      {
        source: "/about",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/clients",
        destination: "/#clients",
        permanent: true,
      },
      // Old hash-based service links → dedicated page
      {
        source: "/services",
        destination: "/#services",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
