/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    eslint: {
        ignoreDuringBuilds: true, // 忽略 eslint 检查
    },
    typescript: {
        ignoreBuildErrors: true, // 忽略 TypeScript 检查
    }
};

export default config;
