import * as React from "react";
import { Container } from "theme-ui";
import Article from "../components/article";
import { Head } from "../components/head";
import * as Marmalade from "../types";
import LayoutRoot from "./root";

const LayoutDefault: Marmalade.Layout = () => {
  return ({ children }) => {
    return (
      <>
        <Head />
        <LayoutRoot>
          <Container>{children && <Article>{children}</Article>}</Container>
        </LayoutRoot>
      </>
    );
  };
};

export default LayoutDefault;
