import matter from "gray-matter";
import { readFileSync } from "fs";
import slugify from "@sindresorhus/slugify";
import { globSync } from "glob";

type PageIndex = { [k: string]: string[] };
type PermalinkIndex = { [k: string]: { permalink: string; title: string } };

export function buildPageIndex(): [PageIndex, PermalinkIndex] {
  // Walk the tree and generate permalinks for each page
  // Always happens on the server side.
  const files = globSync("./text/content/**/*.md");
  let pageIndex: PageIndex = {};
  let permalinkIndex: PermalinkIndex = {};

  for (const path of files) {
    // Get yaml frontmatter from file
    const content = readFileSync(path, "utf8");
    const { data = {} } = matter(content);

    let sluggedPath = slugifyPath(path, data).replace("text/content", "");
    if (sluggedPath == "") {
      sluggedPath = "/";
    }

    const newPath = path.replace(/^text\/content\//, "");
    const lastPart = newPath.split("/").pop();

    if (lastPart == null) continue;
    const name = lastPart.split(".")[0];

    const title = data.title ?? name;
    permalinkIndex[sluggedPath] = { permalink: newPath, title };

    const pathWithoutExt = newPath.split(".")[0];

    pageIndex[pathWithoutExt] = [sluggedPath];
    if (lastPart && pageIndex[name] == null) {
      pageIndex[name] = [sluggedPath];
    }
  }
  return [pageIndex, permalinkIndex];
}

export function slugifyPath(path: string, frontmatter: any) {
  // Generate a tokenized slug from a markdown file path using GitHub's style,
  // overridden by the permalink if provided in metadata

  const pathTokens = path.split("/");
  const fileName = pathTokens.pop();
  const fileBase = fileName?.split(".")[0] || "";
  const defaultSlug = slugify(fileBase);

  const { permalink, slug } = frontmatter;

  const fileSlug = permalink ?? slug ?? defaultSlug;

  let tokens = pathTokens.map((token) => slugify(token));

  if (fileSlug != "" && fileSlug != "index") {
    tokens.push(fileSlug);
  }

  // Join the path tokens back together
  let urlPath = tokens.join("/");
  if (urlPath == "") {
    urlPath = "/";
  }
  return urlPath;
}
