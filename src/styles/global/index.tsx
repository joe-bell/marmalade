import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const Global = createGlobalStyle(
  ({ theme: { base, boxSizing, color, fontFace, fontFamily } }) => [
    fontFace && fontFace,
    // Box Sizing
    {
      html: {
        boxSizing,
      },
      "*, *::before, *::after": {
        boxSizing: "inherit",
      },
    },
    // Reset
    reset,
    // Page
    // 1. As we've forced the base fontSize to 16px we can confidently set our
    //    fontSize to a more accessible '100%'.
    {
      html: {
        backgroundColor: color.background[100],
        fontSize: "100%",
        lineHeight: base.lineHeight / base.fontSize,
        fontFamily,
        color: color.text[100],
        minHeight: "100%",
        textSizeAdjust: "100%" /* [1] */,
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale" /* [2] */,
        WebkitFontSmoothing: "antialiased" /* [2] */,
      },
    },
  ]
);
