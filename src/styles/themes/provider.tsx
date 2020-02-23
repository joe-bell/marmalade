import * as React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  ThemeContext as StyledThemeContext,
  createGlobalStyle,
} from "styled-components";

import { Theme } from "./types";

const themeTransitionClass = "is-transitioning-theme";
const themeTransitionDuration = 250;

/**
 * For some reason Styled Components doesn't like this in object format, so
 * let's use a template string for now.
 */
export const ThemeTransition = createGlobalStyle`
  .${themeTransitionClass} {
    &, *, *::before, *::after {
      transition-property: color, background-color, border-color, transform !important;
      transition-timing-function: ease !important;
      transition-duration: ${themeTransitionDuration}ms !important;
    }
  }
`;

/**
 * Rather than encouraging consumers to use `styled-components`' theming API
 * directly, we extend it. This means we have more flexibility in the future to
 * change the underlying framework (e.g. another CSS-in-JS library), if
 * absolutely necessary.
 */

/**
 * Theme Context
 *
 * Allow consumers to access theme values outside of `styled` functions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext: React.Context<any> = StyledThemeContext;
export const useTheme = (): Theme => React.useContext(ThemeContext);

/**
 * Theme Provider
 *
 * See https://www.styled-components.com/docs/advanced#theming
 */
export type ThemeProviderProps = {
  theme: Theme;
  children?: React.ReactChild;
  hasTransition?: boolean;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
  hasTransition,
}) => {
  const initialTheme = React.useRef(true);

  const handleChange = (themeObject: Theme) => {
    if (hasTransition) {
      if (initialTheme.current) {
        initialTheme.current = false;
        return themeObject;
      }

      /* Add the theme class, then remove once transitioned. */
      document && document.documentElement.classList.add(themeTransitionClass);
      setTimeout(() => {
        document &&
          document.documentElement.classList.remove(themeTransitionClass);
      }, themeTransitionDuration + 10);

      return themeObject;
    }

    return themeObject;
  };

  return (
    <StyledThemeProvider theme={() => handleChange(theme)}>
      <React.Fragment>
        <ThemeTransition />
        {children}
      </React.Fragment>
    </StyledThemeProvider>
  );
};
