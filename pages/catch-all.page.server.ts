import { buildPageIndex } from "../routing";
import { PageContext } from "../renderer/types";
import { renderToString } from "react-dom/server";
import h from "@macrostrat/hyper";
const modules = import.meta.glob("../text/content/**/*.md");

const [pageIndex, permalinkIndex] = buildPageIndex();

type OurPageContext = {
  mdxContentFile: string;
  title: string;
};

export async function onBeforeRender(
  pageContext: PageContext
): Promise<{ pageContext: OurPageContext }> {
  const ctx = permalinkIndex[pageContext.urlPathname];
  const mdxContentFile = ctx?.permalink;
  const _mdxContent = await modules["../text/content/" + mdxContentFile]();
  console.log(_mdxContent.default);
  const mdxContent = await renderToString(h(_mdxContent.default));

  const title = ctx?.title;
  return {
    pageContext: {
      mdxContentFile,
      mdxContent,
      title,
    },
  };
}

export const passToClient = ["mdxContentFile", "mdxContent", "title"];
