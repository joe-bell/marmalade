import * as React from "react";
import { LayoutDefault } from "../../layouts/layouts";
import { blogPosts } from "../../data/blog-posts";
import Link from "next/link";

const BlogIndex = () => (
  <LayoutDefault>
    <h1>Blog</h1>
    <ol reversed>
      {blogPosts.map(blogPost => (
        <li key={blogPost.title}>
          <Link prefetch href={blogPost.path}>
            {blogPost.title}
          </Link>
          <time dateTime={blogPost.date}>{blogPost.date}</time>
        </li>
      ))}
    </ol>
  </LayoutDefault>
);

export default BlogIndex;
