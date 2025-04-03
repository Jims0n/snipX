/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      bodySizeLimit: '2mb',
    },
  },
  typescript: {
    // !! WARN !!
    // Enabling this lets you run build with type errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 