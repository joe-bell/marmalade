/** @jsx jsx */
import * as React from "react";
import { jsx, Grid, GridProps } from "theme-ui";
export type ArticleProps = GridProps;

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834#issuecomment-497445051
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Article = React.forwardRef<any, ArticleProps>(
  ({ children, gap = 3, ...props }, ref) => (
    // @ts-ignore
    <Grid ref={ref} gap={gap} {...props}>
      {children}
    </Grid>
  )
);

export default Article;
