import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ERXES_API_URL: process.env.ERXES_API_URL || "",
    ERXES_URL: process.env.ERXES_URL || "",
    ERXES_FILE_URL: process.env.ERXES_FILE_URL || "",
    ERXES_APP_TOKEN: process.env.ERXES_APP_TOKEN || "",
    ERXES_CLIENT_PORTAL_TOKEN: process.env.ERXES_CLIENT_PORTAL_TOKEN || "",
    ERXES_CMS_ID: process.env.ERXES_CMS_ID || "",
    ERXES_CLIENT_PORTAL_ID: process.env.ERXES_CLIENT_PORTAL_ID || "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mongoliansecretstory.next.erxes.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
