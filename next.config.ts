import type { NextConfig } from "next";

/**
 * In the Base44 sandbox the preview proxy serves the app from
 * `https://3000-<BASE44_PUBLIC_HOST_SUFFIX>`. Next gates dev assets and HMR by
 * ORIGIN, so that origin has to be allow-listed while running in preview mode.
 * Outside preview mode the list stays empty and Next keeps its default.
 */
const isPreview = process.env.BASE44_PREVIEW_MODE === "1";
const previewOrigins = process.env.BASE44_PUBLIC_HOST_SUFFIX
  ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
  : [];

const nextConfig: NextConfig = {
  allowedDevOrigins: isPreview ? previewOrigins : [],
};

export default nextConfig;
