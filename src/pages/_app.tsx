import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
import { Global } from "../styles/global";
import marmalade from "../theme";

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={marmalade}>
    <Global />
    <Styled.root>
      <Component {...pageProps} />
    </Styled.root>
  </ThemeProvider>
);

export default MarmaladeApp;
