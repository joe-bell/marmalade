import * as React from "react";
import { Box } from "../components/box";
import { Container } from "../components/container";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { Header } from "../components/header";
import * as Marmalade from "../types/marmalade";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */

export const LayoutRoot: React.FC<Marmalade.LayoutProps> = props => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);

export const LayoutDefault: React.FC<Marmalade.LayoutProps> = props => (
  <>
    <Head />
    <LayoutRoot>
      <Head />
      <Container as="aside">
        <p>Default Layout</p>
      </Container>
      <Container>
        <Stack>{props.children}</Stack>
      </Container>
    </LayoutRoot>
  </>
);

export const LayoutBlog: React.FC<Marmalade.LayoutProps> = props => (
  <>
    <Head title={props.frontMatter?.title || "Blog"} />
    <LayoutRoot>
      <Container as="aside">
        <p>Blog Layout</p>
      </Container>
      <article>
        {props.frontMatter && props.frontMatter.title && (
          <Container>
            <Box as="h1">
              <h1>{props.frontMatter.title}</h1>
            </Box>
          </Container>
        )}
        <Container>
          <Stack>{props.children}</Stack>
        </Container>
      </article>
    </LayoutRoot>
  </>
);

// @TODO
// Use Next.js dynamic imports to handle layout
export const Layouts: React.FC<Marmalade.LayoutProps> = props => {
  if (!props.frontMatter || !props.frontMatter.layout) {
    return <LayoutDefault {...props} />;
  }

  if (props.frontMatter.layout === "blog") {
    return <LayoutBlog {...props} />;
  }

  return <LayoutDefault {...props} />;
};
