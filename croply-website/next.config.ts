import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore
  allowedDevOrigins: ['10.12.13.117'],
  experimental: {
    allowedOrigins: ['10.12.13.117']
  }
};

export default withNextIntl(nextConfig);
