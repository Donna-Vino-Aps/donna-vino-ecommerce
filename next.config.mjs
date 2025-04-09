/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: "/\.mjs$/",
      include: "/node_modules/",
      type: "javascript/auto",
    });
    return config;
  },
};

export default nextConfig;
