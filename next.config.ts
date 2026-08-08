import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.*"],
  serverExternalPackages: ["file-type"]
};

export default nextConfig;
