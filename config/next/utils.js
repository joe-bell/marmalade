const path = require("path");
const glob = require("glob");

// Grab all .md and .mdx files
const mdxPages = glob.sync("src/pages/**/*.{md,mdx}");

// Generate routes from .md and .mdx files
const mdxRoutes = mdxPages.reduce((accumulator, file) => {
  // Get the directory name without `src/pages`
  const dir = path
    .dirname(file)
    .split(path.sep)
    .slice(2);
  const fileName = path.basename(file, path.extname(file));

  const route =
    fileName === "index"
      ? `/${path.join(...dir)}`
      : `/${path.join(...dir, fileName)}`;

  return {
    ...accumulator,
    [route]: {
      page: route,
    },
  };
}, {});

// Merge custom routes with mdxRoutes
const withMdxRoutes = routes => Object.assign(routes, mdxRoutes);

module.exports = {
  mdxRoutes,
  withMdxRoutes,
};
