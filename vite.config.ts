import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import mdx from "@mdx-js/rollup";
import wikiLinks from "remark-wiki-link";
import { UserConfig } from "vite";

import { buildPageIndex } from "./routing";

const [pageIndex, permalinkIndex] = buildPageIndex();
const permalinks = Object.keys(permalinkIndex);

const config: UserConfig = {
  plugins: [
    react(),
    mdx({
      remarkPlugins: [
        [
          wikiLinks,
          {
            pageResolver: (name: string) => pageIndex[name] || [],
            permalinks,
            hrefTemplate: (permalink: string) => `/${permalink}`,
            aliasDivider: "|",
          },
        ],
      ],
      include: ["content/**/*.md"],
      mdxExtensions: [".mdx", ".md"],
      mdExtensions: [],
    }),
    ssr(),
  ],
};

export default config;
