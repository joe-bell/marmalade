import * as React from "react";
import { Global as EmotionGlobal } from "@emotion/core";

export const Global: React.FC = () => (
  <EmotionGlobal
    styles={{
      /**
       * Page Setup
       */
      html: {
        minHeight: "100%",
        textSizeAdjust: "100%" /* [1] */,
        textRendering: "optimizeLegibility",
        MozOsxFontSmoothing: "grayscale" /* [2] */,
        WebkitFontSmoothing: "antialiased" /* [2] */,
      },
      /**
       * Prevents an unwanted focus outline from appearing around elements that
       * might still respond to pointer events.
       * https://github.com/chris-pearce/backpack.css
       */
      [`[tabindex='-1']:focus`]: {
        outline: "none",
      },
      /**
       * Removes the outline in cases where the UA determines via heuristics that
       * the focus should not be visible. This is mainly for ensuring that a focus
       * indicator (a "focus ring") does not render for mouse users.
       * https://github.com/chris-pearce/backpack.css
       */
      "*:focus:not(:focus-visible)": {
        outline: "none",
      },
      /**
       * Remove all browser-default margins from certain elements.
       */
      [`body,
        h1, h2, h3, h4, h5, h6,
        p, blockquote, pre,
        dl, dd, ol, ul,
        form, fieldset, legend,
        figure,
        table, th, td, caption,
        hr`]: {
        margin: 0,
        padding: 0,
      },
      /**
       *
       */
      "ul, ol": {
        margin: 0,
        paddingLeft: "1.2rem",
      },
      /**
       * Remove trailing margins from nested lists and common block items
       */
      "li >": {
        "ul, ol, p, blockquote": {
          marginTop: 0,
        },
      },
      /**
       * Set default <table>s behavior.
       */
      table: {
        borderCollapse: "collapse",
        borderSpacing: 0,
      },
      /**
       * Correct display behavior of the 'hidden' attribute.
       */
      "[hidden]": {
        display: "none !important",
      },
    }}
  />
);
