import * as React from "react";
import { Container, Heading } from "theme-ui";
import { Stack } from "raam";
import Article from "../components/article";
import { Head } from "../components/head";
import * as Marmalade from "../types";
import PostList from "../components/post-list";
import LayoutRoot from "./root";

export type LayoutPostIndexProps = {
  posts?: Marmalade.MDXPages;
  title?: string;
};

const LayoutPostIndex: React.FC<LayoutPostIndexProps> = ({
  children,
  posts,
  title,
}) => (
  <>
    <Head />
    <LayoutRoot>
      <Container as={Stack}>
        {title && <Heading as="h1">{title}</Heading>}
        {children && <Article>{children}</Article>}
        {posts && <PostList posts={posts} />}
      </Container>
    </LayoutRoot>
  </>
);

export default LayoutPostIndex;
