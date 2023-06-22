import h from "@macrostrat/hyper";
import { usePageContext } from "../renderer/usePageContext";
import { Component } from "react";
import { Link } from "../renderer/Link";

const modules = import.meta.glob("../text/content/**/*.md");

function Page() {
  const ctx = usePageContext();

  if (ctx.mdxContent == null) {
    return h("div.page-404", [
      h("h1", "Page not found"),
      h(Link, { href: "/" }, ["Go to home page"]),
    ]);
  }

  // Check if we need to hydrate the page
  const _contentStr = ctx.mdxContent;

  // If we're on the server, we just render the content from a string, otherwise we hydrate it
  const pageContent = h("div", {
    dangerouslySetInnerHTML: { __html: _contentStr },
  });

  return h(ErrorBoundary, [pageContent]);
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
