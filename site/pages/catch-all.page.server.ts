import { buildPageIndex } from "../routing";
import { PageContext } from "../renderer/types";
import { renderToString } from "react-dom/server";
import h from "@macrostrat/hyper";
const modules = import.meta.glob("../../content/**/*.md");

console.log("Modules", modules);

const [pageIndex, permalinkIndex] = buildPageIndex();

type OurPageContext = {
  mdxContent: string | null;
};

export async function onBeforeRender(
  pageContext: PageContext
): Promise<{ pageContext: OurPageContext }> {
  const ctx = permalinkIndex[pageContext.urlPathname];
  const mdxContentFile = ctx?.contentFile;
  const pageFile = modules["../../content/" + mdxContentFile];

  console.log(pageFile);
  if (pageFile == null) {
    return {
      pageContext: {
        mdxContent: null,
      },
    };
  }
  const _mdxContent = pageFile == null ? null : await pageFile();

  const pageContent = h("div", [h("h1", ctx.title), h(_mdxContent.default)]);

  const mdxContent = await renderToString(pageContent);

  const title = ctx?.title;
  return {
    pageContext: {
      mdxContent,
    },
  };
}

export const passToClient = ["mdxContentFile", "mdxContent", "title"];
