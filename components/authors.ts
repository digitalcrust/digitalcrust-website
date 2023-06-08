import h from "@macrostrat/hyper";

export function Authors(props) {
  const { authors } = props;
  return h("div.authors", [
    h("h2", "Authors"),
    h(
      "ul",
      authors.map((d) => h("li", d))
    ),
  ]);
}
