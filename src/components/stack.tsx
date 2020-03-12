import styled from "styled-components";
import { Box, BoxProps } from "./box";
import { rem } from "../styles/utils/rem";
import * as Marmalade from "../types/marmalade";

export type StackProps = {
  /**
   * The gap between Stack items.
   *
   * Accepts any key from `theme.space`.
   */
  gap?: Marmalade.ThemeSpaceKeys;
} & BoxProps;

export const Stack = styled(Box)<StackProps>(
  ({ gap = "medium", theme: { space } }) => {
    const themedGap = rem(space[gap]);

    return {
      /**
       * If a browser supports the `grid-gap` property, let's use it.
       * Otherwise, fallback to the lobotomized owl selector to style children.
       */
      "@supports (grid-gap: 0)": {
        display: "grid",
        gridGap: themedGap,
      },
      "@supports not (grid-gap: 0)": {
        "& > * + *": {
          marginTop: themedGap,
        },
      },
      /* Ensure direct child list-items render without bullets */
      "& > li": {
        listStyleType: "none",
        "&:before": {
          position: "absolute",
          content:
            '"\\200B"' /* Add zero-width space to prevent VoiceOver disable */,
        },
      },
    };
  }
);
