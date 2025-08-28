const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;