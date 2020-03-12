const path = require("path");
const withOffline = require("next-offline");
const { blogPosts } = require("./.marmalade");

const webpack = (config, { defaultLoaders }) => {
  config.module.rules.push({
    test: /\.mdx?$/,
    use: [
      defaultLoaders.babel,
      "@mdx-js/loader",
      path.join(__dirname, "./config/webpack/mdx-frontmatter.js"),
    ],
  });

  return config;
};

const exportPathMap = async (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) => {
  // @TODO Passthrough static assets.
  // @TODO Generate and add manifest.
  // @TODO Add JSON/RSS feed.
  return defaultPathMap;
};

module.exports = withOffline({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  webpack,
  exportPathMap,
});
