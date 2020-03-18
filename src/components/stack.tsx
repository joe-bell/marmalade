/* eslint-disable @typescript-eslint/ban-ts-ignore */
/** @jsx jsx */
import { jsx, BoxOwnProps, GridProps } from "theme-ui";

export type StackProps = BoxOwnProps & Pick<GridProps, "gap">;

export const Stack: React.FC<StackProps> = ({ gap = 3, ...props }) => (
  <div
    {...props}
    sx={{
      /**
       * If a browser supports the `grid-gap` property, let's use it.
       * Otherwise, fallback to the lobotomized owl selector to style children.
       */
      "@supports (grid-gap: 0)": {
        // @ts-ignore
        display: "grid",
        // @ts-ignore
        gridGap: gap,
      },
      "@supports not (grid-gap: 0)": {
        "& > * + *": {
          marginTop: gap,
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
    }}
  />
);
