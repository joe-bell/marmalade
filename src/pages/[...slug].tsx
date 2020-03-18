import * as React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Error from "next/error";
import {
  getFilesByLatest,
  getAllTagsPaths,
  getAllIndexPaths,
} from "../../scripts";
import { Layouts } from "../layouts/layouts";
import { FrontMatterExtended } from "../types/marmalade";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...getAllTagsPaths(), ...getAllIndexPaths()];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async context => {
  const errorProps = {
    props: {
      error: true,
    },
  };

  if (!context.params || !context.params.slug) {
    return errorProps;
  }

  const slug = context.params.slug;
  const slugPath = Array.isArray(slug) ? `/${slug.join("/")}` : `/${slug}`;

  if (getAllIndexPaths().includes(slugPath)) {
    const posts = getFilesByLatest(`${slugPath}/**/*.{md,mdx}`);

    return {
      props: {
        title: `${slug}`,
        posts,
      },
    };
  }

  if (getAllTagsPaths().includes(slugPath)) {
    const tagIndex = slug.indexOf("tag");
    const tagDirIndex = (tagIndex - 1) % slug.length;
    const tagNameIndex = (tagIndex + 1) % slug.length;
    const tagDir = slug[tagDirIndex];
    const tagName = slug[tagNameIndex];

    const posts = getFilesByLatest(`/${tagDir}/**/*.{md,mdx}`).filter(
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

type IndexPageProps = {
  error?: boolean;
  posts?: FrontMatterExtended[];
};

const IndexPage: React.FC<IndexPageProps & NextPage> = ({
  error,
  ...props
}) => {
  return error ? (
    <Error statusCode={404} />
  ) : (
    <Layouts layout="index" {...props} />
  );
};

export default IndexPage;
