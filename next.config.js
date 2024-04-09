/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withMDX = (await import("@next/mdx")).default();

/** @type {import("next").NextConfig} */
const config = {
  pageExtensions: ["mdx", "ts", "tsx"],
};

export default withMDX(config);
