/* eslint-disable @typescript-eslint/camelcase */
import fs from "fs";
import _glob from "glob";
import { promisify } from "util";
import path from "path";
import config from "../marmalade.config";
import * as Marmalade from "../src/types";

const DIR_RSS = config.rssPosts || "src/pages";
const DIR_PUBLIC = path.join(process.cwd(), "public");
const DIR_CONTENT = "src/pages";

// =============================================================================
// Utils
// =============================================================================

const sanitizeArray = (arr: string[]) =>
  arr.filter((value: string, index: number) => arr.indexOf(value) === index);

// =============================================================================
// FrontMatter Extend
// =============================================================================

export const extendFrontMatter = (
  mdxContent: string,
  frontMatter: Marmalade.FrontMatter
): Marmalade.FrontMatterCustom => {
  // Paths
  // ----------------------------------

  // Get the current working directory and strip the leading slash.
  const _cwd = process.cwd().replace(/^(\/)/, "");
  // Strip the current working directory
  const _rootPath = frontMatter.__resourcePath
    .replace(_cwd, "")
    .split(path.sep)
    .filter(item => item);
  // Get index of 'pages' directory to calculate where to trim the path.
  const _pagesIndex = _rootPath.indexOf("pages");
  // Create a relative file path array.
  // e.g. Users/<name>/marmalade/src/pages/blog/post.mdx => ['blog', 'post.mdx']
  const _relativePath = _rootPath.slice(_pagesIndex && _pagesIndex + 1);

  const _fileName = path
    .basename(
      frontMatter.__resourcePath,
      path.extname(frontMatter.__resourcePath)
    )
    .toLowerCase();

  // Get the page sub-directory if there is one
  const dir = _relativePath.slice(0, -1);
  const dirPath = dir.length === 0 ? "" : path.join(...dir).toLowerCase();

  const nextPath = `/${
    _fileName === "index" ? dirPath : path.join(dirPath, _fileName)
  }`;

  // Date
  // ----------------------------------

  const dateString = frontMatter.date
    ? new Date(frontMatter.date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;

  return {
    __dir: dir,
    __path: nextPath,
    __wordCount: mdxContent.split(/\s+/g).length,
    ...(dateString && { __dateString: dateString }),
  };
};

// =============================================================================
// getPaths
// =============================================================================

export const getAllTagsPaths = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const paths = pagesFrontMatter
    .filter(post => post.tags)
    // Map through each tag and convert into a next path (without src/pages)
    .map(post =>
      post.tags?.map(tag => path.join("/", ...post.__dir, "tag", tag))
    )
    // I'll solve this later, maybe?
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    .flat();

  return sanitizeArray(paths);
};

const shouldCreateIndex = (srcDir: string[]): boolean => {
  // We don't want files from the root pages directory
  if (srcDir.length === 0) {
    return false;
  }

  const indexFile = path.join(DIR_CONTENT, ...srcDir, "index.*");

  return _glob.sync(indexFile).length === 0 ? true : false;
};

export const getAllIndexPaths = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const indexPaths = pagesFrontMatter
    .filter(post => shouldCreateIndex(post.__dir))
    .map(post => `/${path.join(...post.__dir)}`);

  return sanitizeArray(indexPaths);
};

// =============================================================================
// Filter
// =============================================================================

export type FilterByDate = (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => Marmalade.FrontMatterExtended[];

export const filterByDate: FilterByDate = pagesFrontMatter =>
  pagesFrontMatter.every(file => file.date)
    ? // I *might* fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      pagesFrontMatter.sort((a, b) => new Date(b.date) - new Date(a.date))
    : pagesFrontMatter;

export type FilterByDir = (
  pagesFrontMatter: Marmalade.FrontMatterExtended[],
  dirname?: string | string[]
) => Marmalade.FrontMatterExtended[];

export const filterByDir: FilterByDir = (posts, dirName = "src/pages") => {
  const dirNames = Array.isArray(dirName) ? dirName : [dirName];

  const filtered = posts.filter(
    post =>
      // Ignore files in the root directory
      post.__dir.length > 0 &&
      // Include files that match the defined directories
      dirNames
        .map(dir => (post.__resourcePath.includes(dir) ? true : false))
        .includes(true) &&
      // Ignore index files
      !post.__resourcePath
        .split(path.sep)
        .pop()
        ?.includes("index")
  );

  return filterByDate(filtered);
};

// =============================================================================
// File Generation
// =============================================================================

export const generatePostsJSONFeed = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const fileName = "feed.json";
  const filePath = path.join(DIR_PUBLIC, fileName);

  const posts = filterByDir(pagesFrontMatter, DIR_RSS);

  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: config.meta.title,
    description: config.meta.description,
    home_page_url: config.meta.url,
    feed_url: path.join(config.meta.url, fileName),
    icon: path.join(config.meta.url, config.meta.icon || config.meta.favicon),
    favicon: path.join(config.meta.url, config.meta.favicon),
    author: {
      name: config.meta.author,
      url: config.meta.url,
      avatar: config.meta.avatar,
    },
    items: posts.map(post => {
      const postUrl = path.join(config.meta.url, post.__path);

      return {
        id: postUrl,
        url: postUrl,
        ...(post.title && { title: post.title }),
        ...(post.date && { date_published: post.date }),
        ...(post.summary && {
          summary: post.summary,
          // @TODO Revisit after Async API
          // content_html: instead maybe?
          content_text: `${post.summary} - To read in full, please visit ${postUrl}.`,
        }),
        ...(post.image && { image: post.image }),
        ...(post.tags && { tags: post.tags }),
        ...(post.summary && { summary: post.summary }),
      };
    }),
  };

  return promisify(fs.writeFile)(filePath, JSON.stringify(feed, null, 2))
    .then(() =>
      console.log(
        `✅ RSS feed created for "${
          Array.isArray(DIR_RSS) ? DIR_RSS.join(", ") : DIR_RSS
        }" at: ${filePath}`
      )
    )
    .catch(err => console.error(err));
};

export const generateManifest = async (dir = DIR_PUBLIC) => {
  const manifestPath = path.join(dir, "manifest.webmanifest");
  const manifest = {
    name: config.meta.title,
    description: config.meta.description,
    // @TODO Generate Favicons
    // icons: [
    //   {
    //     src: "/images/icons-192.png",
    //     type: "image/png",
    //     sizes: "192x192",
    //   },
    //   {
    //     src: "/images/icons-512.png",
    //     type: "image/png",
    //     sizes: "512x512",
    //   },
    // ],
    start_url: "/",
    display: "standalone",
    scope: "/",
  };

  return promisify(fs.writeFile)(
    manifestPath,
    JSON.stringify(manifest, null, 2)
  )
    .then(() => console.log(`✅ Manifest created at: ${manifestPath}`))
    .catch(err => console.error(err));
};
