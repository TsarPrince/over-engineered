/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'd1rqe5eqrx4sjq.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'd1rqe5eqrx4sjq.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'www.vondelgym.nl',
      },
      {
        protocol: 'https',
        hostname: 'doraemon-pocket.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
