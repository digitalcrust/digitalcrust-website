import h from "@macrostrat/hyper";
import { usePageContext } from "../renderer/usePageContext";
import { Component } from "react";
import loadable from "@loadable/component";

const modules = import.meta.glob("../text/content/**/*.md");

function Page() {
  const ctx = usePageContext();
  if (ctx.contentFile == null) {
    return null;
  }

  const fn = "../text/content/" + ctx.contentFile;
  const PageContent = loadable(() => modules[fn]());
  return h(ErrorBoundary, [h("div", [h("h1", ctx.title), h(PageContent)])]);
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
