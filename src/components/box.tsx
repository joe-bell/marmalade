import { Globals } from "csstype";
import styled from "styled-components";
import { system } from "styled-system";
import * as Marmalade from "../types/marmalade";
import { rem } from "../styles/utils/rem";

type BoxSpaceProps = keyof Marmalade.ThemeSpace | Globals | "auto" | number;

/**
 * **Access theme colors via dot notation.**
 *
 * Usage: `key.variant`
 * e.g. `primary.100`
 *
 * TODO: Type dot notation (somehow?)
 */
type BoxColorProps = Marmalade.ThemeColorValue;

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
  marginX?: BoxSpaceProps;
  marginY?: BoxSpaceProps;
  padding?: BoxSpaceProps;
  paddingTop?: BoxSpaceProps;
  paddingRight?: BoxSpaceProps;
  paddingBottom?: BoxSpaceProps;
  paddingLeft?: BoxSpaceProps;
  paddingX?: BoxSpaceProps;
  paddingY?: BoxSpaceProps;
  maxWidth?: keyof Marmalade.ThemeMaxWidth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformSpaceToRem = (value: string | number, scale: any) => {
  if (!value) {
    return;
  }

  if (!scale) {
    return typeof value === "string" ? value : rem(value);
  }

  return scale.hasOwnProperty(value) ? rem(scale[value]) : value;
};

const styleProps = (properties: string[], scaleKey: keyof Marmalade.Theme) =>
  properties.reduce(
    (acc, property) => ({
      ...acc,
      [property]: {
        property,
        scale: scaleKey,
        // For spacial units, convert to 'rem'.
        ...(scaleKey === "space" && {
          transform: transformSpaceToRem,
        }),
      },
    }),
    {}
  );

export const Box = styled.div<BoxProps>(
  system({
    ...styleProps(["color", "backgroundColor", "borderColor"], "color"),
    ...styleProps(["maxWidth"], "maxWidth"),
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
    marginX: {
      properties: ["marginLeft", "marginRight"],
      scale: "space",
      transform: transformSpaceToRem,
    },
    marginY: {
      properties: ["marginTop", "marginBottom"],
      scale: "space",
      transform: transformSpaceToRem,
    },
    paddingX: {
      properties: ["paddingLeft", "paddingRight"],
      scale: "space",
      transform: transformSpaceToRem,
    },
    paddingY: {
      properties: ["paddingTop", "paddingBottom"],
      scale: "space",
      transform: transformSpaceToRem,
    },
  })
);
