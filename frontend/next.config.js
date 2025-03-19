/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  i18n,

  // 疑似当前前后端请求路径不匹配（多出了/api），重定向到后端路径
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', 
      },
    ]
  },
}

module.exports = nextConfig
