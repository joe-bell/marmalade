const path = require("path");
const withOffline = require("next-offline");
const utils = require("./config/next/utils");

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

const exportPathMap = async () =>
  utils.withMdxRoutes({
    "/": { page: "/" },
    "/about": { page: "/about" },
  });

module.exports = withOffline({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  webpack,
  exportPathMap,
});
