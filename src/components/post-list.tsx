/** @jsx jsx */
import * as React from "react";
import NextLink from "next/link";
import { jsx, Grid, GridProps, Link, Text } from "theme-ui";
import * as Marmalade from "../types";
import { li } from "./reset";

export type PostListProps = {
  posts: Marmalade.MDXPages;
} & GridProps;

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834#issuecomment-497445051
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostList = React.forwardRef<any, PostListProps>(
  ({ posts, sx, ...props }, ref) => (
    <Grid
      // Oh my dog I hate refs
      // @ts-ignore
      ref={ref}
      as="ol"
      reversed={true}
      sx={{ padding: 0, ...li.listStyleTypeNone, ...(sx && sx) }}
      {...props}
    >
      {posts.map((post, i) => (
        <li key={i}>
          <NextLink href={post.__path}>
            <Link sx={{ fontWeight: "bold", fontSize: 3 }}>{post.title}</Link>
          </NextLink>
          {post.summary && <Text>{post.summary}</Text>}
          {post.__dateString && <Text>{post.__dateString}</Text>}
        </li>
      ))}
    </Grid>
  )
);

export default PostList;
