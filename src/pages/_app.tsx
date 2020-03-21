/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
import marmalade from "../themes/marmalade";
import { Layouts } from "../layouts/layouts";
import { Global } from "../styles/global";

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={marmalade}
    // @ts-ignore
    components={{
      // @ts-ignore
      wrapper: props => (
        <Layouts {...props.frontmatter}>{props.children}</Layouts>
      ),
    }}
  >
    <Global />
    <Styled.root>
      <Component {...pageProps} />
    </Styled.root>
  </ThemeProvider>
);

export default MarmaladeApp;
