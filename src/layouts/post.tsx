import * as React from "react";
import NextLink from "next/link";
import { Badge, Container, Heading, Text } from "theme-ui";
import Article from "../components/article";
import { Head } from "../components/head";
// @ts-ignore
import { Wrap, Stack } from "raam";
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
            <Article>{children}</Article>
          </Container>
        )}
      </article>
      <Container as="footer" py={5}>
        <Text>Filed under:</Text>
        {frontMatter.tags && (
          <Wrap as="ul" gap={2}>
            {frontMatter.tags.map((tag: string) => (
              <NextLink key={tag} href={`./tag/${tag}`}>
                <Badge as="a" sx={{ cursor: "pointer" }}>
                  {tag}
                </Badge>
              </NextLink>
            ))}
          </Wrap>
        )}
      </Container>
    </LayoutRoot>
  </>
);

export default LayoutPost;
