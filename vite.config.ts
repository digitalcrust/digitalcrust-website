import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import mdx from "@mdx-js/rollup";
import wikiLinks from "remark-wiki-link";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [react(), mdx({ remarkPlugins: [wikiLinks] }), ssr()],
};

export default config;
