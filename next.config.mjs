/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
        port: '',
        // pathname: '/65e7dd4a9cb27f8b45b3/**',
      },
    ],
  },
    
};

export default nextConfig;

