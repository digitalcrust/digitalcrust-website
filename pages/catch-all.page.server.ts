import { buildPageIndex } from "../routing";

const [pageIndex, permalinkIndex] = buildPageIndex();

export async function onBeforeRender(pageContext) {
  const ctx = permalinkIndex[pageContext.urlPathname];
  const contentFile = ctx?.permalink;
  const title = ctx?.title;
  return {
    pageContext: {
      contentFile,
      title,
    },
  };
}

export const passToClient = ["contentFile", "title"];
