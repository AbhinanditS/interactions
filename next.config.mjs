import mdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

const withMDX = mdx();
export default withMDX(nextConfig);
