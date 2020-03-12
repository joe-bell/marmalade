/* eslint-disable @typescript-eslint/camelcase */
import fs from "fs";
import matter from "gray-matter";
import _glob from "glob";
import path from "path";
import config from "../marmalade.config";
import * as Marmalade from "../src/types/marmalade";

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

export const blogPosts = getFilesByLatest("src/pages/blog/**/*.{md,mdx}");

export const blogJSONFeed = {
  version: "https://jsonfeed.org/version/1",
  title: config.meta.title,
  description: config.meta.description,
  home_page_url: `${config.meta.url}/thoughts`,
  feed_url: `${config.meta.url}/feed.json`,
  icon: `${config.meta.url}/static/icon.jpg`,
  favicon: `${config.meta.url}/static/favicon.png`,
  author: {
    name: config.meta.author,
    url: config.meta.url,
    avatar: config.meta.avatar,
  },
  items: blogPosts.map(post => ({
    id: `${config.meta.url}${post.path}`,
    url: `${config.meta.url}${post.path}`,
    title: post.title,
    // content_text: `${post.summary} See ${config.meta.url}${post.path.`,
    // summary: post.summary,
    // image: post.image,
    date_published: post.date,
  })),
};
