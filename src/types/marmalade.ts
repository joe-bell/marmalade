// ===========================================================================
//   Starter Config
// ===========================================================================

type Meta = {
  title: string;
  description: string;
  author: string;
  url: string;
  avatar: string;
  icon?: string;
  favicon: string;
  social?: {
    github?: string;
    instagram?: string;
    twitter?: string;
  };
  manifestThemeColor?: string;
  manifestBackgroundColor?: string;
};

type NavigationItem = {
  title: string;
  url: string;
  external?: boolean;
};

export type Config = {
  meta: Meta;
  navigation: NavigationItem[];
  /**
   * Pages directory used to generate the RSS feed, e.g. 'blog'.
   * If empty, the feed will output all MDX pages as posts.
   */
  rssDir?: string | string[];
  attribution?: boolean;
};

// ===========================================================================
//   Layouts & FrontMatter
// ===========================================================================

/**
 * FYI: These have to be optional as we can't check the frontmatter right now.
 */
export type FrontMatter = {
  title?: string;
  layout?: "default" | "post" | "index";
  date?: string;
  image?: string;
  summary?: string;
  tags?: string[];
};

export type FileData = {
  /**
   * Content Root Path
   */
  root: string[];
  /**
   * Content Sub-directory Path
   */
  dir: string[];
  /**
   * File Path
   */
  src: string[];
  /**
   * Next Path (url)
   */
  path: string;
};

export type FrontMatterExtended = FrontMatter & FileData;

export type LayoutProps = {
  posts?: FrontMatterExtended[];
} & FrontMatter;

// ===========================================================================
//   Theme Specification
// ===========================================================================

import { CSSObject } from "styled-components";

// Base
// ==============================================

export type ThemeBase = {
  /**
   * ⚠️ Immutable
   *
   * Base FontSize and Base Space are immutable theme settings, in other words
   * the remain the same in **all** themes and *must not* be changed under any
   * circumstances.
   *
   * These settings are crucial for calculating values such as `rem` without
   * having to over-use theme hooks/context calls.
   *
   * If you need to adjust the body font-size, consider using the theme-specific
   * setting `fontSize.body`.
   *
   * If you need to adjust the space, make use of the `space` theme config.
   */
  readonly space: 16;
  readonly fontSize: 16;
  /**
   * ✅ Customisable
   *
   * Although the base.fontSize cannot be modified, the line-height can be
   * adjusted to suit your font-face use-case.
   */
  readonly lineHeight: number;
};

// Borders
// ==============================================

export type ThemeBorderWidth = number;

export type ThemeBorderStyle = CSSObject["borderStyle"];

export type ThemeBorder = CSSObject["border"];

// Box Shadow
// ==============================================

export type ThemeBoxShadow = CSSObject["boxShadow"];

// Box Sizing
// ==============================================

export type ThemeBoxSizing = CSSObject["boxSizing"];

// Breakpoint
// ==============================================

export type ThemeBreakpoint = {
  small: number /* in `px` */;
  medium: number /* in `px` */;
  large: number /* in `px` */;
  xlarge: number /* in `px` */;
};

// Colors
// ==============================================

export type ThemeColorValue = CSSObject["color"];

export type ThemeColorPalette = {
  100: ThemeColorValue;
  80: ThemeColorValue;
  60: ThemeColorValue;
  40: ThemeColorValue;
  20: ThemeColorValue;
};

export type ThemeColor = {
  primary: ThemeColorPalette;
  secondary: ThemeColorPalette;
  background: ThemeColorPalette;
  text: ThemeColorPalette;
};

// Color Scheme
// ==============================================

export type ThemeColorScheme = "light" | "dark";

// Font
// ==============================================

export type ThemeFontFace = CSSObject | CSSObject[] | undefined;

export type ThemeFontFamily = string;

export type ThemeFontSize = {
  body: number;
};

export type ThemeFontWeight = {
  normal: number;
  semibold: number;
  bold: number;
};

// Max Width
// ==============================================

export type ThemeMaxWidth = {
  small: number /* px */;
  medium: number /* px */;
  large: number /* px */;
};

// Opacity
// ==============================================

export type ThemeOpacity = {
  disabled: number;
};

// Radius
// ==============================================

export type ThemeRadius = {
  button: number;
};

// Space
// ==============================================

export type ThemeSpaceKeys =
  | "xxsmall"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge";

export type ThemeSpace = { [key in ThemeSpaceKeys]: number /* px */ };

// Transition Duration
// ==============================================

export type ThemeTransitionDuration = {
  slow: number;
  medium: number;
  fast: number;
};

// Z-Index
// ==============================================

export type ThemeZIndex = {
  dialog: number;
};

// Theme Schema
// ==============================================

export type Theme = {
  base: ThemeBase;
  border: ThemeBorder;
  borderWidth: ThemeBorderWidth;
  borderStyle: ThemeBorderStyle;
  boxShadow: ThemeBoxShadow;
  boxSizing: ThemeBoxSizing;
  breakpoint: ThemeBreakpoint;
  color: ThemeColor;
  colorScheme: ThemeColorScheme;
  fontFace?: ThemeFontFace;
  fontFamily: ThemeFontFamily;
  fontSize: ThemeFontSize;
  fontWeight: ThemeFontWeight;
  maxWidth: ThemeMaxWidth;
  opacity: ThemeOpacity;
  radius: ThemeRadius;
  space: ThemeSpace;
  transitionDuration: ThemeTransitionDuration;
  zIndex: ThemeZIndex;
};
