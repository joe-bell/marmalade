import * as React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Error from "next/error";
import {
  getAllTagsPaths,
  getAllIndexPaths,
  generateManifest,
  generatePostsJSONFeed,
  filterByDir,
} from "../../scripts";
import LayoutPostIndex, { LayoutPostIndexProps } from "../layouts/post-index";
// https://github.com/jescalan/babel-plugin-import-glob-array/issues/7
// @ts-ignore
import { frontMatter as pages } from "../pages/**/*.{md,mdx}";

const tagsPaths = getAllTagsPaths(pages);
const indexPaths = getAllIndexPaths(pages);

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate Assets
  await generateManifest();
  await generatePostsJSONFeed(pages);

  const paths = [...tagsPaths, ...indexPaths];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CatchAllPageProps> = async context => {
  const errorProps = { props: { error: true } };

  if (!context.params || !context.params.slug) {
    return errorProps;
  }

  const slug = context.params.slug;
  const slugPath = Array.isArray(slug) ? `/${slug.join("/")}` : `/${slug}`;

  if (indexPaths.includes(slugPath)) {
    const posts = filterByDir(pages, `src/pages${slugPath}`);

    return {
      props: {
        title: `${slug}`,
        posts,
      },
    };
  }

  if (tagsPaths.includes(slugPath)) {
    const tagIndex = slug.indexOf("tag");
    const tagDir = slug[(tagIndex - 1) % slug.length];
    const tagName = slug[(tagIndex + 1) % slug.length];

    const posts = filterByDir(pages, `src/pages/${tagDir}`).filter(
      post => post.tags && post.tags.includes(tagName)
    );

    return {
      props: {
        title: `${tagDir} posts filed under "${tagName}"`,
        posts,
      },
    };
  }

  return errorProps;
};

type CatchAllPageProps = {
  error?: boolean;
} & LayoutPostIndexProps;

const CatchAllPage: React.FC<CatchAllPageProps & NextPage> = ({
  error,
  ...props
}) => (error ? <Error statusCode={404} /> : <LayoutPostIndex {...props} />);

export default CatchAllPage;
