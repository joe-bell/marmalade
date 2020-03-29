import * as React from "react";
import { Header } from "../components/header";

const LayoutRoot: React.FC = props => (
  <>
    <Header />
    <main>{props.children}</main>
  </>
);

export default LayoutRoot;
