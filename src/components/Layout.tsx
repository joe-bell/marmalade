import * as React from "react";
import Header from "./Header";
import { Box } from "../styles/components/box";

const Layout: React.FC = props => (
  <div className="antialiased">
    <Header />
    <Box
      borderColor="primary.100"
      backgroundColor="secondary.100"
      padding="large"
      margin="xsmall"
      gridGap="large"
    >
      Test
    </Box>
    <main className="mx-auto px-4">{props.children}</main>
  </div>
);

export default Layout;
