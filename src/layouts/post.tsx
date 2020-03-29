import * as React from "react";
import NextLink from "next/link";
import { Badge, Box, Container, Heading, Text } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { Inline } from "../components/inline";
import * as Marmalade from "../types";
import LayoutRoot from "./root";

const LayoutPost: Marmalade.Layout = frontMatter => ({ children }) => (
  <>
    <Head title={frontMatter.title || "Blog"} />
    <LayoutRoot>
      <article>
        {frontMatter.title && (
          <Container>
            <Heading as="h1" sx={{ fontSize: [5, 6], fontWeight: "display" }}>
              {frontMatter.title}
            </Heading>
          </Container>
        )}
        {children && (
          <Container>
            <Stack>{children}</Stack>
          </Container>
        )}
      </article>
      <Container as="footer" py={5}>
        <Text>Filed under:</Text>
        {frontMatter.tags && (
          <Inline as="ul" gap={2}>
            {frontMatter.tags.map((tag: string) => (
              <Box as="li" key={tag}>
                <NextLink href={`./tag/${tag}`}>
                  <Badge as="a" sx={{ cursor: "pointer" }}>
                    {tag}
                  </Badge>
                </NextLink>
              </Box>
            ))}
          </Inline>
        )}
      </Container>
    </LayoutRoot>
  </>
);

export default LayoutPost;
