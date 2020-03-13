import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { LayoutDefault } from "../../layouts/layouts";
import { getMDXPostsByLatest } from "../../../scripts";
import * as Marmalade from "../../types/marmalade";

export async function getStaticProps() {
  return { props: { posts: getMDXPostsByLatest() } };
}

type BlogIndexProps = {
  posts: Marmalade.FrontMatterWithPath[];
};

const BlogIndex: NextPage<BlogIndexProps> = ({ posts }) => (
  <LayoutDefault>
    <h1>Blog</h1>
    <ol reversed>
      {posts.map(post => (
        <li key={post.title}>
          <Link href={post.path}>{post.title}</Link>
          <time dateTime={post.date}>{post.date}</time>
        </li>
      ))}
    </ol>
  </LayoutDefault>
);

export default BlogIndex;
