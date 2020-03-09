import { ThemeBase, Theme } from "marmalade";

const base: ThemeBase = {
  fontSize: 16,
  lineHeight: 20,
  space: 16,
};

const borderStyle = "solid";
const borderWidth = 1;

const blacks = {
  100: "#0d0d0d",
  80: "#252525",
  60: "#3D3D3D",
  40: "#565656",
  20: "#6E6E6E",
};

const foundation: Theme = {
  base,
  borderStyle,
  borderWidth,
  border: `${borderWidth}px ${borderStyle}`,
  boxShadow: `1px 1px 1px ${blacks[100]}`,
  boxSizing: "border-box",
  breakpoint: {
    small: 500,
    medium: 800,
    large: 1080,
    xlarge: 1200,
  },
  color: {
    primary: blacks,
    secondary: {
      100: "#d9d9d9",
      80: "#dddddd",
      60: "#e1e1e1",
      40: "#e4e4e4",
      20: "#e8e8e8",
    },
    background: {
      100: "#ffffff",
      80: "#fbfbfb",
      60: "#f7f7f7",
      40: "#f4f4f4",
      20: "#f0f0f0",
    },
    text: blacks,
  },
  colorScheme: "light",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  fontSize: {
    body: 16,
  },
  fontWeight: {
    normal: 400,
    semibold: 500,
    bold: 600,
  },
  maxWidth: {
    small: 960,
    medium: 1024,
    large: 1440,
  },
  opacity: {
    disabled: 0.5,
  },
  radius: {
    button: base.space * 0.5,
  },
  space: {
    xxsmall: base.space * 0.25,
    xsmall: base.space * 0.5,
    small: base.space * 0.75,
    medium: base.space,
    large: base.space * 1.25,
    xlarge: base.space * 1.5,
    xxlarge: base.space * 2,
  },
  transitionDuration: {
    slow: 0.3,
    medium: 0.2,
    fast: 0.15,
  },
  zIndex: {
    dialog: 10000,
  },
};

export default foundation;
