/* eslint-disable @typescript-eslint/camelcase */
import fs from "fs";
import matter from "gray-matter";
import _glob from "glob";
import path from "path";
import config from "../marmalade.config";
import * as Marmalade from "../src/types/marmalade";

const DIR_PUBLIC = path.join(process.cwd(), "public");

export type GetFiles = (glob: string) => Marmalade.FrontMatterWithPath[];

export const getFiles: GetFiles = glob =>
  _glob.sync(glob).map(file => {
    const content = fs.readFileSync(file, "utf8");
    const { data } = matter(content);

    const dir = path
      .dirname(file)
      .split(path.sep)
      .slice(2);
    const fileName = path.basename(file, path.extname(file));

    const route =
      fileName === "index"
        ? `/${path.join(...dir)}`
        : `/${path.join(...dir, fileName)}`;

    return Object.assign(data, {
      path: route,
    });
  });

export type GetFilesByLatest = GetFiles;

export const getFilesByLatest: GetFilesByLatest = glob => {
  const files = getFiles(glob);

  // Check if pages in the specified glob contain the date property.
  const filesContainDate = files.every(file => file.date);

  return filesContainDate
    ? // I *might* fix this
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      files.sort((a, b) => new Date(b.date) - new Date(a.date))
    : files;
};

export const getMDXPostsByLatest = () =>
  getFilesByLatest(`${config.posts.dir}/**/*.{md,mdx}`);

export const generatePostsJSONFeed = (dir = DIR_PUBLIC) => {
  const fileName = "feed.json";

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
    items: getMDXPostsByLatest().map(post => {
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

  return fs.writeFileSync(
    path.join(dir, fileName),
    JSON.stringify(feed, null, 2)
  );
};

export const generateManifest = (dir = DIR_PUBLIC) => {
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

  return fs.writeFileSync(
    path.join(dir, "manifest.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
};
