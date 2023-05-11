import { buildPageIndex } from "../routing";

const [pageIndex, permalinkIndex] = buildPageIndex();

export async function onBeforeRender(pageContext) {
  const contentFile = permalinkIndex[pageContext.urlPathname];
  return {
    pageContext: {
      contentFile,
    },
  };
}

export const passToClient = ["contentFile"];
