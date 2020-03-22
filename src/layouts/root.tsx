import * as React from "react";
import { Header } from "../components/header";

export const LayoutRoot: React.FC = props => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);
