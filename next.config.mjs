/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
