---
title: "Getting Started"
layout: "post"
date: "2020-03-28"
summary: "Learn how to get up and running with Marmalade."
tags:
  - css
  - design
---

## Installation

1. There are two options to choose from:

   1. [Generate a new repo](https://github.com/joe-bell/marmalade/generate) from this template repo, **or…**
   2. Clone or fork this template repo:
      ```sh
      git clone git@github.com:joe-bell/marmalade.git
      ```

2. Install dependencies:
   ```sh
   npm i
   ```

### Commands

The following commands are available for use, prefixed with `npm run`:

- `dev` - spins up a hot-reloading development environment.
- `production` - builds the application for production and [exports to static HTML](https://nextjs.org/learn/excel/static-html-export/export-the-index-page).
- `start` - runs the Next.js production server.
- `clean` - flushes `node_modules` and build directories.

## Configuration

For now, basic application info can be configured in [`marmalade.config.js`](./marmalade.config.js).

To configure the initial theme and components used to render MDX/Markdown, you'll need to customise the default [`_app.tsx`](./src/pages/_app.tsx) file.

## Architecture

- `src/`

  - `pages/`

    Supports `.md`, `.mdx`, `.tsx` format.

- `scripts/`

  Node scripts used by the application and Next.js to generate things like index pages.

  These scripts are also available for use in `next.config.js` under `.marmalade`.

  > Unfortunately, Next.js doesn't currently support it's config in `.ts`. To workaround this, scripts are compiled to `.js` in `.marmalade` before build time.
  >
  > It's a hacky solution but I can't think of a better one for now.
