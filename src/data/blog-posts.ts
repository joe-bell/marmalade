import preval from "babel-plugin-preval/macro";
import { FrontMatterWithPath } from "marmalade";

const getBlogPosts = () =>
  preval`module.exports = require('../utils/get-files-by-latest')('src/pages/blog/**/*.{md,mdx}')`;

export type BlogPosts = FrontMatterWithPath[];

export const blogPosts: BlogPosts = getBlogPosts();
