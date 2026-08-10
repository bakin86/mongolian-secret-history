import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: secrets are intentionally NOT declared here. `env` inlines values at
  // build time, which would bake the `sk_…` app token into the client bundle.
  // Server code reads process.env directly from .env.local instead.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mongoliansecrethistory.next.erxes.io",
      },
      {
        protocol: "https",
        hostname: "mongoliansecretstory.next.erxes.io",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
