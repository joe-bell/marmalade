/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container, Heading } from "theme-ui";
import { filterByDir } from "../../scripts";
import config from "../../marmalade.config";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import PostList from "../components/post-list";
import * as Marmalade from "../types";
import { LayoutRoot } from "./root";
// @ts-ignore
import { frontMatter as mdxPages } from "../pages/**/*.{md,mdx}";

const posts = filterByDir(mdxPages, config.homePosts);

const LayoutHome: Marmalade.Layout = () => ({ children }) => (
  <>
    <Head />
    <LayoutRoot>
      <Container paddingTop={3} paddingBottom={6}>
        <Stack>
          {children && children}
          <Heading as="h2" mt={4}>
            Latest Posts
          </Heading>
          {/* @TODO Filter by latest, filter by glob defined in config? */}
          <PostList columns={[1, 2]} posts={posts} />
        </Stack>
      </Container>
    </LayoutRoot>
  </>
);

export default LayoutHome;
