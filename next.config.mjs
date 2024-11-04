import { withAxiom } from "next-axiom";

/** @type {import("next").NextConfig} */
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

export default withAxiom(config);
