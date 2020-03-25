import * as React from "react";
import { Box, Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { Header } from "../components/header";
import * as Marmalade from "../types";
import Link from "next/link";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */

export const LayoutRoot: React.FC<Marmalade.LayoutProps> = props => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);

export const LayoutDefault: React.FC<Marmalade.LayoutProps> = ({
  children,
  ...props
}) => (
  <>
    <Head />
    <LayoutRoot {...props}>
      <Head />
      {children && (
        <Container paddingTop={3} paddingBottom={6}>
          <Stack>{children}</Stack>
        </Container>
      )}
    </LayoutRoot>
  </>
);

export const LayoutPostsIndex: React.FC<Marmalade.LayoutProps> = ({
  children,
  posts,
  ...props
}) => {
  const title = props.title || "Blog";
  return (
    <>
      <Head title={title} />
      <LayoutRoot {...props}>
        <Container as="aside">
          <p>{title}</p>
          {posts && (
            <ol reversed>
              {posts.map(
                (post: any) =>
                  post.title && (
                    <li key={post.title}>
                      <>
                        <Link href={`../..${post.__path}`}>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <a>{post.title}</a>
                        </Link>
                        <time dateTime={post.date}>{post.date}</time>
                      </>
                    </li>
                  )
              )}
            </ol>
          )}
          {children && children}
        </Container>
      </LayoutRoot>
    </>
  );
};

export const LayoutPoot: React.FC<Marmalade.LayoutProps> = ({
  children,
  ...props
}) => (
  <>
    <Head title={props.title || "Blog"} />
    <LayoutRoot {...props}>
      <Container as="aside">
        <p>Blog Layout</p>
      </Container>
      <article>
        {props.title && (
          <Container>
            <Box as="h1">
              <h1>{props.title}</h1>
            </Box>
          </Container>
        )}
        {children && (
          <Container>
            <Stack>{children}</Stack>
          </Container>
        )}
      </article>
    </LayoutRoot>
  </>
);

// @TODO
// Use Next.js dynamic imports to handle layout
export const Layouts: React.FC<Marmalade.LayoutProps> = props => {
  return <LayoutDefault {...props} />;
};
