import { ThemeSpace, ThemeColorValue, Theme } from "marmalade";
import styled from "styled-components";
import { rem } from "../utils/rem";
import { system } from "styled-system";

type BoxSpaceProps = keyof ThemeSpace;

/**
 * **Access theme colors via dot notation.**
 *
 * Usage: `key.variant`
 * e.g. `primary.100`
 *
 * TODO: Type dot notation (somehow?)
 */
type BoxColorProps = ThemeColorValue;

export type BoxProps = {
  backgroundColor?: BoxColorProps;
  borderColor?: BoxColorProps;
  color?: BoxColorProps;
  gridGap?: BoxSpaceProps;
  margin?: BoxSpaceProps;
  marginTop?: BoxSpaceProps;
  marginRight?: BoxSpaceProps;
  marginBottom?: BoxSpaceProps;
  marginLeft?: BoxSpaceProps;
  padding?: BoxSpaceProps;
  paddingTop?: BoxSpaceProps;
  paddingRight?: BoxSpaceProps;
  paddingBottom?: BoxSpaceProps;
  paddingLeft?: BoxSpaceProps;
};

const styleProps = (properties: string[], scaleKey: keyof Theme) =>
  properties.reduce(
    (acc, property) => ({
      ...acc,
      [property]: {
        property,
        scale: scaleKey,
        // For spacial units, convert to 'rem'.
        ...(scaleKey === "space" && {
          transform: (value: BoxSpaceProps, scale: ThemeSpace) =>
            rem(scale[value]),
        }),
      },
    }),
    {}
  );

export const Box = styled.div<BoxProps>(
  system({
    ...styleProps(["color", "backgroundColor", "borderColor"], "color"),
    ...styleProps(
      [
        "gridGap",
        "margin",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
        "padding",
        "paddingTop",
        "paddingRight",
        "paddingBottom",
        "paddingLeft",
      ],
      "space"
    ),
  })
);
