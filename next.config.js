const withMdxEnhanced = require("next-mdx-enhanced");
const { extendFrontMatter } = require("./.marmalade");

const exportPathMap = async (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) => {
  // @TODO Passthrough static assets

  return defaultPathMap;
};

const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  exportPathMap,
  // @TODO Investigate
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
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
