/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['img.media-amazon.com', 'm.media-amazon.com']
  }
}

module.exports = nextConfig
