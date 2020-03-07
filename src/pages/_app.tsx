/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import { AppProps } from "next/app";
import { ThemeProvider } from "../styles/themes/provider";
import { foundation } from "../styles/themes/foundation";
import { Global } from "../styles/global";
import { Layouts } from "../layouts/layouts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={foundation}>
      <React.Fragment>
        <MDXProvider
          components={{
            wrapper: props => <Layouts {...props} />,
          }}
        >
          <Global />
          <Component {...pageProps} />
        </MDXProvider>
      </React.Fragment>
    </ThemeProvider>
  );
}
