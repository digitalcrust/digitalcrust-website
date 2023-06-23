# DigitalCrust website

The [**DigitalCrust Website**](https://digitalcrust.org) describes the motivation and structure of the **DigitalCrust** geoscience community collaboration.

## Contributing

This is a community-led organization, and we encourage contributions from
anyone!
- [Pull requests](https://github.com/digitalcrust/digitalcrust-website/pulls): Proposed changes to content or code.
- [Issues](https://github.com/digitalcrust/digitalcrust-website/issues): Questions and bug reports about website content
- [Discussions](https://github.com/orgs/digitalcrust/discussions): Topics about community structure and governance

GitHub's web editor is now quite good, so making changes to the website content is very simple!

## Structure

- Content is in the [`content`](content) directory. The content archive uses WikiLinks and is designed to be compatible
  with the [Obsidian](https://obsidian.md) knowledge-management tool.
- The website code is in the [`site`](site) directory.

## Under the hood

The application is written in [React](https://reactjs.org) and [Typescript](https://www.typescriptlang.org), built using [Vite](https://vitejs.dev) and [Vite-Plugin-SSR](vite-plugin-ssr), packaged in a [Docker](https://www.docker.com) container, 
and deployed using [GitHub Actions](https://docs.github.com/en/actions). Website hosting and domain registration are maintained by [Macrostrat](https://macrostrat.org).

