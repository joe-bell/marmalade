import * as React from "react";
import { Container, Heading } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
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
      <Container>
        <Stack>
          {title && <Heading as="h1">{title}</Heading>}
          {children && children}
          {posts && <PostList posts={posts} />}
        </Stack>
      </Container>
    </LayoutRoot>
  </>
);

export default LayoutPostIndex;
