/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: [
      "scontent-syd2-1.xx.fbcdn.net",
      "platform-lookaside.fbsbx.com",
      "scontent.xx.fbcdn.net",
      "scontent.fbsyd4-1.fna.fbcdn.net",
    ],
  },
};

export default config;
