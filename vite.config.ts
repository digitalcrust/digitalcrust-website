import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import mdx from "@mdx-js/rollup";
import wikiLinks from "remark-wiki-link";
import { UserConfig } from "vite";
import { globSync } from "glob";

// Walk the tree and generate permalinks for each page
const files = globSync("./pages/**/*.page.*");
const permalinks = files.reduce((acc: string[], path: string) => {
  const lastPart = path.split("/").pop();
  if (lastPart) {
    const name = lastPart.split(".")[0];
    console.log(path, name);
    return [...acc, name];
  }
  return acc;
}, []);

console.log(permalinks);

const config: UserConfig = {
  plugins: [
    react(),
    mdx({
      remarkPlugins: [
        [
          wikiLinks,
          {
            pageResolver: (name: string) => [name],
            permalinks,
            hrefTemplate: (permalink: string) => `/${permalink}.page.mdx`,
          },
        ],
      ],
      //include: ["**/*.page.md", "**/*.page.mdx"],
    }),
    ssr(),
  ],
};

export default config;
