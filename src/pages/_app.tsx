import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "../styles/themes/provider";
import { foundation } from "../styles/themes/foundation";
import { Global } from "../styles/global";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={foundation}>
      <React.Fragment>
        <Global />
        <Component {...pageProps} />
      </React.Fragment>
    </ThemeProvider>
  );
}
