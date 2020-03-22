/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { LayoutRoot } from "./root";

// @ts-ignore
export default frontMatter => {
  // @ts-ignore
  return ({ children }) => {
    console.log(frontMatter);
    return (
      <>
        <Head />
        <LayoutRoot>
          <Head />
          {children && (
            <Container paddingTop={3} paddingBottom={6}>
              <Stack>{children}</Stack>
            </Container>
          )}
        </LayoutRoot>
      </>
    );
  };
};
