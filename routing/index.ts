import matter from "gray-matter";
import { readFileSync } from "fs";
import slugify from "@sindresorhus/slugify";
import { globSync } from "glob";

export function buildPageIndex() {
  // Walk the tree and generate permalinks for each page
  const files = globSync("./text/content/**/*.md");
  let pageIndex: { [k: string]: string[] } = {};
  let permalinkIndex: { [k: string]: string } = {};

  for (const path of files) {
    const sluggedPath = slugifyPath(path).replace("text/content", "");

    const newPath = path.replace(/^text\/content\//, "");
    const lastPart = newPath.split("/").pop();
    permalinkIndex[sluggedPath] = newPath;

    if (lastPart == null) continue;
    const name = lastPart.split(".")[0];
    const pathWithoutExt = newPath.split(".")[0];

    pageIndex[pathWithoutExt] = [sluggedPath];
    if (lastPart && pageIndex[name] == null) {
      pageIndex[name] = [sluggedPath];
    }
  }
  return [pageIndex, permalinkIndex];
}

export function slugifyPath(path: string) {
  // Generate a tokenized slug from a markdown file path using GitHub's style,
  // overridden by the permalink if provided in metadata

  const pathTokens = path.split("/");
  const fileName = pathTokens.pop();
  const fileBase = fileName?.split(".")[0] || "";
  const defaultSlug = slugify(fileBase);

  // Get yaml frontmatter from file
  const content = readFileSync(path, "utf8");
  const { data = {} } = matter(content);
  const { permalink, slug } = data;

  const fileSlug = permalink ?? slug ?? defaultSlug;

  let tokens = pathTokens.map((token) => slugify(token));

  if (fileSlug != "" && fileSlug != "index") {
    tokens.push(fileSlug);
  }

  // Join the path tokens back together
  return "/" + tokens.join("/");
}
