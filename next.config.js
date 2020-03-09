const path = require("path");
const withOffline = require("next-offline");

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
  return defaultPathMap;
};

module.exports = withOffline({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  webpack,
  exportPathMap,
});
