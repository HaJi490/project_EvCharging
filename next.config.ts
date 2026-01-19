import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true,
  
  // // 이 부분 추가!
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && isServer) {
  //     config.infrastructureLogging = {
  //       level: 'error',
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
