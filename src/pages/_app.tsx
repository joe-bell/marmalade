/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import config from "../../marmalade.config";
import { ThemeProvider } from "../styles/themes/provider";
import { Global } from "../styles/global";
import { Layouts } from "../layouts/layouts";

const { initialTheme } = config;

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={initialTheme.light}>
    <MDXProvider
      components={{
        wrapper: props => <Layouts {...props} />,
      }}
    >
      <Global />
      <Component {...pageProps} />
    </MDXProvider>
  </ThemeProvider>
);

export default MarmaladeApp;
