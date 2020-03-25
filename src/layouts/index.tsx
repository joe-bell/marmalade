/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as React from "react";
import { Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import { LayoutRoot } from "./root";
import * as Marmalade from "../types";

const LayoutDefault: Marmalade.Layout = () => {
  // @ts-ignore
  return ({ children }) => {
    return (
      <>
        <Head />
        <LayoutRoot>
          <Container>
            <Stack>{children && children}</Stack>
          </Container>
        </LayoutRoot>
      </>
    );
  };
};

export default LayoutDefault;
