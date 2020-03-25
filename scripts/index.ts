/* eslint-disable @typescript-eslint/camelcase */
import fs from "fs";
import _glob from "glob";
import { promisify } from "util";
import path from "path";
import matter from "gray-matter";
import config from "../marmalade.config";
import * as Marmalade from "../src/types/marmalade";

const DIR_PUBLIC = path.join(process.cwd(), "public");
const DIR_CONTENT = "src/pages";

// =============================================================================
// Utils
// =============================================================================

const isEmpty = (arr: unknown[]) =>
  !Array.isArray(arr) || !arr.length ? true : false;

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
  // ---------------------------------------------------------------------------

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
  // ---------------------------------------------------------------------------

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
// File Get
// =============================================================================

type GetFiles = (glob: string) => Promise<any[] | []>;

export const getFiles: GetFiles = async glob => {
  try {
    const files = await promisify(_glob)(`${DIR_CONTENT}/${glob}`);

    if (isEmpty(files)) {
      throw new Error(`🚨 No files found matching: ${glob}`);
    }

    return files.map(file => {
      const content = fs.readFileSync(file, "utf8");
      const { data } = matter(content);

      const _fileName = path.basename(file, path.extname(file));

      const root = DIR_CONTENT.split(path.sep);
      const dir = path
        .dirname(file)
        .split(path.sep)
        .slice(root.length);

      const src = [...root, ...dir, _fileName];

      const nextPath =
        _fileName === "index"
          ? path.join(...dir)
          : path.join(...dir, _fileName);

      return Object.assign(data, {
        root,
        dir,
        src,
        path: nextPath,
      });
    });
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getFilesByLatest: GetFiles = async glob => {
  try {
    const files = await getFiles(glob);

    if (isEmpty(files)) {
      throw new Error(`🚨 No files found matching: ${glob}`);
    }

    // Check if pages in the specified glob contain the date property.
    const filesContainDate = files.every(file => file.date);

    return filesContainDate
      ? // I *might* fix this
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        files.sort((a, b) => new Date(b.date) - new Date(a.date))
      : files;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMDXPostsByLatest = async () => {
  const rssGlob = !config.rssPostsDir
    ? "**/*.{md,mdx}"
    : Array.isArray(config.rssPostsDir)
    ? `{${config.rssPostsDir.join(",")}}/**/*.{md,mdx}`
    : `${config.rssPostsDir}/**/*.{md,mdx}`;

  try {
    const files = await getFilesByLatest(rssGlob);

    if (isEmpty(files)) {
      throw new Error(`🚨 No posts found matching: ${config.rssPostsDir}`);
    }

    return files.filter(
      // Only return files from the defined pages directory, and ignore custom
      // index pages
      post => post.dir.length !== 0 && post.src.pop() !== "index"
    );
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAllTagsPaths = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const paths = pagesFrontMatter // Get only paths that contain `tags`
    .filter(post => post.tags)
    // Map through each tag and convert into a tag root path (without src/pages)
    .map(post =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      post.tags?.map(tag => path.join("/", ...post.__dir, "tag", tag))
    )
    // I'll solve this later, maybe?
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    .flat();

  return sanitizeArray(paths);
};

export const getAllIndexPaths = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const shouldCreateIndex = (srcDir: string[]): boolean => {
    // We don't want files from the root pages directory
    if (srcDir.length === 0) {
      return false;
    }

    const indexFile = path.join(DIR_CONTENT, ...srcDir, "index.*");

    return _glob.sync(indexFile).length === 0 ? true : false;
  };

  const indexPaths = pagesFrontMatter
    .filter(post => shouldCreateIndex(post.__dir))
    .map(post => `/${path.join(...post.__dir)}`);

  return sanitizeArray(indexPaths);
};

// =============================================================================
// File Generation
// =============================================================================

// =======================

type FilterPagesByLatest = (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => Marmalade.FrontMatterExtended[];

const filterPagesByLatest: FilterPagesByLatest = pagesFrontMatter => {
  // Check if pages in the specified glob contain the date property.
  const pagesContainDate = pagesFrontMatter.every(file => file.date);

  return pagesContainDate
    ? // I *might* fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      pagesFrontMatter.sort((a, b) => new Date(b.date) - new Date(a.date))
    : pagesFrontMatter;
};

export const generatePostsJSONFeed = async (
  pagesFrontMatter: Marmalade.FrontMatterExtended[]
) => {
  const fileName = "feed.json";
  const filePath = path.join(DIR_PUBLIC, fileName);

  const postsDir = Array.isArray(config.rssPostsDir)
    ? config.rssPostsDir
    : [config.rssPostsDir];

  // Filter posts that the directory matches ones defined in rsspostsDir

  const posts = filterPagesByLatest(pagesFrontMatter)
    .filter(
      // Only return files from the defined pages directory, and ignore custom
      // index pages
      post =>
        post.__dir.length !== 0 &&
        post.__resourcePath.split(path.sep).pop() !== "index"
    )
    .filter(post =>
      postsDir.map(postDir => postDir && post.__resourcePath.includes(postDir))
    );

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
        `✅ RSS feed created for "${postsDir.join(", ")}" at: ${filePath}`
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
