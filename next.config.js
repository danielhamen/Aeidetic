console.log("✅ Next.js config loaded!");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
