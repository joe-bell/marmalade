/** @jsx jsx */
import * as React from "react";
import { jsx, Flex, FlexProps, GridProps } from "theme-ui";
import { li } from "./reset";

type InlineMargin = string | number | null;

const inlineMargin = ({
  gap,
  negative = false,
}: {
  gap: InlineMargin;
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => (theme: any) => {
  if (typeof gap === "undefined" || gap === null) {
    return null;
  }

  const themedGap = theme.space[gap] || gap;
  const sign = negative ? -1 : 1;

  return typeof themedGap === "number"
    ? `${(themedGap / 2) * sign}px`
    : `calc(${themedGap} / 2 * ${sign})`;
};

const responsiveInlineMargin = ({
  gap,
  negative = false,
}: {
  /* I can't be bothered to fix this right now */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gap: any;
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => (theme: any) => {
  if (Array.isArray(gap)) {
    return gap.map(gapValue =>
      inlineMargin({ gap: gapValue, negative })(theme)
    );
  }

  if (typeof gap === "number" || typeof gap === "string") {
    return [inlineMargin({ gap: gap, negative })(theme)];
  }

  return null;
};

export type InlineProps = FlexProps & Pick<GridProps, "gap">;

// `forwardRef` a sticky issue:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834#issuecomment-497445051
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Inline = React.forwardRef<any, InlineProps>(
  ({ gap = 3, sx, children, ...props }, ref) =>
    jsx(
      Flex,
      {
        ...props,
        ref,
        sx: {
          flexWrap: "wrap",
          overflow: "hidden",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: theme =>
            responsiveInlineMargin({ gap, negative: true })(theme),
          "& > *": {
            margin: theme => responsiveInlineMargin({ gap })(theme),
          },
          /* Ensure direct child list-items render without bullets */
          "& > li": li.listStyleTypeNone,
          ...(sx && sx),
        },
      },
      children
    )
);
