/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["your-domain.name", "localhost:3000"],
    },
  },
};

export default nextConfig;
