import h from "@macrostrat/hyper";
import loadable from "@loadable/component";
import { usePageContext } from "../renderer/usePageContext";
import { Component } from "react";

function Page() {
  const ctx = usePageContext();

  console.log(ctx.urlPathname);

  let pathName = ctx.urlPathname;
  if (pathName.endsWith("/")) {
    pathName = pathName + "index";
  }
  pathName += ".md";

  const PageContent = loadable(() => import("../text/content" + pathName));
  return h(ErrorBoundary, h(PageContent, { fallback: h("div", "Loading...") }));
}

// `Page` is the only page of our app.
export { Page };

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return h("h1", "Something went wrong");
    }
    return this.props.children;
  }
}
