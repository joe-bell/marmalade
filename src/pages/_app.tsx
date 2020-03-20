/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
// @ts-ignore
import swiss from "../themes/swiss";
import { Layouts } from "../layouts/layouts";
import { Global } from "../styles/global";

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={swiss}
    // @ts-ignore
    components={{
      // @ts-ignore

      // This doesn't work well, missing theme keys means the container doesn't
      // render nicely at all.
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
