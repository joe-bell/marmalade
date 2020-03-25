/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container, Heading } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { LayoutRoot } from "./root";
import * as Marmalade from "../types";
import PostList from "../components/post-list";

export type LayoutPostIndexProps = {
  posts?: Marmalade.Posts;
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
