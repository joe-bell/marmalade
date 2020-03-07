import { ThemeSpace } from "marmalade";
import styled from "styled-components";
import { Box, BoxProps } from "./box";
import { rem } from "../utils/rem";

export type StackProps = {
  space?: keyof ThemeSpace;
} & BoxProps;

export const Stack = styled(Box)<StackProps>(({ space, theme }) => ({
  ...(space && {
    /**
     * If a browser supports the `grid-gap` property, let's use it.
     * Otherwise, fallback to the lobotomized owl selector to style children.
     */
    "@supports (grid-gap: 0)": {
      display: "grid",
      gridGap: rem(theme.space[space]),
    },
    "@supports not (grid-gap: 0)": {
      "& > * + *": {
        marginTop: rem(theme.space[space]),
      },
    },
  }),
  /* Ensure direct child list-items render without bullets */
  "& > li": {
    listStyleType: "none",
    "&:before": {
      position: "absolute",
      content:
        '"\\200B"' /* Add zero-width space to prevent VoiceOver disable */,
    },
  },
}));

Stack.defaultProps = {
  space: "medium",
};
