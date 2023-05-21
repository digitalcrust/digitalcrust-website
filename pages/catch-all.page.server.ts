import { buildPageIndex } from "../routing";
import { PageContext } from "../renderer/types";
import { renderToString } from "react-dom/server";
import h from "@macrostrat/hyper";
const modules = import.meta.glob("../text/content/**/*.md");

const [pageIndex, permalinkIndex] = buildPageIndex();

type OurPageContext = {
  mdxContent: string | null;
};

export async function onBeforeRender(
  pageContext: PageContext
): Promise<{ pageContext: OurPageContext }> {
  const ctx = permalinkIndex[pageContext.urlPathname];
  const mdxContentFile = ctx?.permalink;
  const pageFile = modules["../text/content/" + mdxContentFile];
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
