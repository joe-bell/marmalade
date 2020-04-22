import * as React from "react";
import { Container, Heading } from "theme-ui";
import { Stack } from "raam";
import { filterByDir } from "../../scripts";
import config from "../../marmalade.config";
import Article from "../components/article";
import { Head } from "../components/head";
import PostList from "../components/post-list";
import * as Marmalade from "../types";
import LayoutRoot from "./root";
// https://github.com/jescalan/babel-plugin-import-glob-array/issues/7
// @ts-ignore
import { frontMatter as mdxPages } from "../pages/**/*.{md,mdx}";

const posts = filterByDir(mdxPages, config.homePosts);

const LayoutHome: Marmalade.Layout = () => ({ children }) => (
  <>
    <Head />
    <LayoutRoot>
      <Container paddingTop={3} paddingBottom={6}>
        <Stack>
          {children && <Article>{children}</Article>}
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
