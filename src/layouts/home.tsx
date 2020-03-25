/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container, Heading } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import PostList from "../components/post-list";
import { LayoutRoot } from "./root";
import * as Marmalade from "../types/marmalade";
// @ts-ignore
import { frontMatter as posts } from "../pages/blog/*.{md,mdx}";

const LayoutHome: Marmalade.Layout = frontMatter =>
  // @ts-ignore
  ({ children, ...props }) => {
    console.log(frontMatter);

    return (
      <>
        <Head />
        <LayoutRoot>
          <Head />
          <Container paddingTop={3} paddingBottom={6}>
            <Stack>
              {children && children}
              <Heading as="h2" mt={4}>
                Latest Posts
              </Heading>
              <PostList columns={[1, 2]} posts={posts} />
            </Stack>
          </Container>
        </LayoutRoot>
      </>
    );
  };

export default LayoutHome;
