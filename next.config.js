/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_OPENAI_ORGANIZATION_KEY:
      process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION_KEY,
  },
};

module.exports = nextConfig;
