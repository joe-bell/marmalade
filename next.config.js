const withMdxEnhanced = require("next-mdx-enhanced");
const { extendFrontMatter } = require("./.marmalade");

const exportPathMap = async (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) => {
  // @TODO Passthrough static assets.
  // @TODO Generate and add manifest.
  // @TODO Add JSON/RSS feed.

  return defaultPathMap;
};

const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  exportPathMap,
};

module.exports = withMdxEnhanced({
  layoutPath: "src/layouts",
  defaultLayout: true,
  fileExtensions: ["md", "mdx"],
  extendFrontMatter: {
    process: (mdxContent, frontMatter) =>
      extendFrontMatter(mdxContent, frontMatter),
  },
})(nextConfig);
