/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kinopoiskapiunofficial.tech"],
  },
  env: {
    KP_API_KEY: process.env.KP_API_KEY,
  },
};

module.exports = nextConfig;
