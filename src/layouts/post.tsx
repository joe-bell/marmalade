import * as React from "react";
import { Box, Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { LayoutRoot } from "./root";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */

// @ts-ignore
export default frontMatter => {
  // @ts-ignore
  return ({ children }) => {
    console.log(frontMatter);
    return (
      <>
        <Head title={frontMatter.title || "Blog"} />
        <LayoutRoot>
          <Container as="aside">
            <p>Blog Layout</p>
          </Container>
          <article>
            {frontMatter.title && (
              <Container>
                <Box as="h1">
                  <h1>{frontMatter.title}</h1>
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
  };
};
