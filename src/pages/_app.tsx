/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "../themes/provider";
import { foundationLight } from "../themes/foundation";
import { Global } from "../styles/global";
import { Layouts } from "../layouts/layouts";

const MarmaladeApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={foundationLight}>
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
