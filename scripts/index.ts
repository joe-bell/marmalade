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
const GLOB_MDX = `**/*.{md,mdx}`;

// =============================================================================
// Utils
// =============================================================================

const isEmpty = (arr: any[]) =>
  !Array.isArray(arr) || !arr.length ? true : false;

const sanitizeArray = (arr: string[]) =>
  arr.filter((value: string, index: number) => arr.indexOf(value) === index);

// =============================================================================
// File Get
// =============================================================================

type GetFiles = (glob: string) => Promise<Marmalade.FrontMatterExtended[] | []>;

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
  const rssGlob = !config.rssDir
    ? "**/*.{md,mdx}"
    : Array.isArray(config.rssDir)
    ? `{${config.rssDir.join(",")}}/**/*.{md,mdx}`
    : `${config.rssDir}/**/*.{md,mdx}`;

  try {
    const files = await getFilesByLatest(rssGlob);

    if (isEmpty(files)) {
      throw new Error(`🚨 No posts found matching: ${config.rssDir}`);
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

export const getAllTagsPaths = async (glob = GLOB_MDX) => {
  try {
    const files = await getFiles(glob);

    if (isEmpty(files)) {
      throw new Error(`🚨 No tag paths found matching: ${glob}`);
    }

    const paths = files // Get only paths that contain `tags`
      .filter(post => post.tags)
      // Map through each tag and convert into a tag root path (without src/pages)
      .map(post =>
        post.tags?.map(tag => path.join("/", ...post.dir, "tag", tag))
      )
      // I'll solve this later, maybe?
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      .flat();

    return sanitizeArray(paths);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getAllIndexPaths = async (glob = GLOB_MDX) => {
  const shouldCreateIndex = (srcDir: string[]): boolean => {
    // We don't want files from the root pages directory
    if (srcDir.length === 0) {
      return false;
    }

    const indexFile = path.join(DIR_CONTENT, ...srcDir, "index.*");

    return _glob.sync(indexFile).length === 0 ? true : false;
  };

  try {
    const files = await getFiles(glob);

    if (isEmpty(files)) {
      throw new Error(`🚨 No tag paths found matching: ${glob}`);
    }

    const indexPaths = files
      .filter(post => shouldCreateIndex(post.dir))
      .map(post => `/${path.join(...post.dir)}`);

    return sanitizeArray(indexPaths);
  } catch (err) {
    console.error(err);
    return [];
  }
};

// =============================================================================
// File Generation
// =============================================================================

export const generatePostsJSONFeed = async (dir = DIR_PUBLIC) => {
  const fileName = "feed.json";
  const filePath = path.join(dir, fileName);

  try {
    const posts = await getMDXPostsByLatest();
    const postDir = Array.isArray(config.rssDir)
      ? config.rssDir.join(", ")
      : config.rssDir;

    if (isEmpty(posts)) {
      throw new Error(`🚨 No posts found matching: ${config.rssDir}`);
    }

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
        const postUrl = path.join(config.meta.url, post.path);

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
        console.log(`✅ RSS feed created for "${postDir}" at: ${filePath}`)
      )
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
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
