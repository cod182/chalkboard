/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  image: {
    domains: ['img.media-amazon.com']
  }
}

module.exports = nextConfig
