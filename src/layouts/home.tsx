/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
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
          {children && (
            <Container paddingTop={3} paddingBottom={6}>
              <Stack>{children}</Stack>
            </Container>
          )}
          <Container>
            {posts.map((post: any) => (
              <p key={post.title}>{post.title}</p>
            ))}
          </Container>
        </LayoutRoot>
      </>
    );
  };

export default LayoutHome;
