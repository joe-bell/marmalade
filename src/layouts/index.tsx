import * as React from "react";
import { Container } from "theme-ui";
import { Head } from "../components/head";
import { Stack } from "../components/stack";
import * as Marmalade from "../types";
import LayoutRoot from "./root";

const LayoutDefault: Marmalade.Layout = () => {
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
