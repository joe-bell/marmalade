/** @jsx jsx */
import * as React from "react";
import { jsx, Box, BoxProps } from "theme-ui";
import { hideVisually as hideVisuallyStyles } from "polished";

export type HideProps = {
  hideVisually?: boolean;
  hideCompletely?: boolean;
} & BoxProps;
// `forwardRef` a sticky issue:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834#issuecomment-497445051
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Hide = React.forwardRef<any, HideProps>(
  ({ hideCompletely, hideVisually, children, ...props }, ref) =>
    jsx(
      Box,
      {
        ...props,
        ref,
        sx: {
          ...(hideVisually && hideVisuallyStyles()),
          ...(hideCompletely && { display: "none" }),
        },
      },
      children
    )
);
