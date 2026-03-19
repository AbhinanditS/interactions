import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@next/mdx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  outputFileTracingRoot: __dirname,
};

const withMDX = mdx();
export default withMDX(nextConfig);
