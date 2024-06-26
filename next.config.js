const VERCEL_BLOB_STORE_ID = process.env.BLOB_READ_WRITE_TOKEN?.match(
  /^vercel_blob_rw_([a-z0-9]+)_[a-z0-9]+$/i,
)?.[1].toLowerCase();

const VERCEL_BLOB_HOSTNAME = VERCEL_BLOB_STORE_ID
  ? `${VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com`
  : undefined;

// const CLOUDFLARE_R2_HOSTNAME =
//   process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN;

// const AWS_S3_HOSTNAME =
//   process.env.NEXT_PUBLIC_AWS_S3_BUCKET &&
//   process.env.NEXT_PUBLIC_AWS_S3_REGION
// eslint-disable-next-line max-len
//     ? `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com`
//     : undefined;

const createNextIntlPlugin = require("next-intl/plugin");
 
const withNextIntl = createNextIntlPlugin();
 
const createRemotePattern = (hostname) => hostname
  ? [{
    protocol: "https",
    hostname,
    port: "",
    pathname: "/**",
  }]
  : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // imageSizes: [200],
    loader: "custom",
    loaderFile: "./src/lib/loader.ts",
    remotePatterns: []
      .concat(createRemotePattern(VERCEL_BLOB_HOSTNAME)),
    // .concat(createRemotePattern(CLOUDFLARE_R2_HOSTNAME))
    // .concat(createRemotePattern(AWS_S3_HOSTNAME)),
    minimumCacheTTL: 31536000,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withNextIntl(withBundleAnalyzer(nextConfig));
