console.log("✅ Next.js config loaded!");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
  async rewrites() {
    console.log("✅ Rewrites called!");
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "/api", // This will serve API responses from /pages/api/page.ts
        },
        {
          source: "/epithet/:path*",
          destination: "/epithet/web/:path*",
        },
        {
          source: "/learn/:path*",
          destination: "/learn",
        },
        {
          source: "/lexicon/:path*",
          destination: "/lexicon",
        },
        {
          source: "/expo/admin/:path*",
          destination: "/expo/admin",
        },
      ],
      fallback: [
        {
          source: "/:path",
          destination: "/page",
        },
      ],
    };
  },
};

module.exports = nextConfig;
