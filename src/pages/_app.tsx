/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
import { Global } from "../styles/global";
import marmalade from "../theme";

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={marmalade}
    // @ts-ignore
    components={{
      // @ts-ignore
      wrapper: props => <div>{props.children}</div>,
    }}
  >
    <Global />
    <Styled.root>
      <Component {...pageProps} />
    </Styled.root>
  </ThemeProvider>
);

export default MarmaladeApp;
