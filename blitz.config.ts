import { BlitzConfig } from "blitz";

const config: BlitzConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  // 设置应用运行在子目录下
  basePath: "/flags", // 将 "subdirectory" 替换为你需要的路径
};

module.exports = config;
