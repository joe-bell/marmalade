import * as React from "react";
import { Box } from "theme-ui";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

const LayoutRoot: React.FC = props => (
  <>
    <Header />
    <Box as="main" sx={{ minHeight: "85vh" }}>
      {props.children}
    </Box>
    <Footer />
  </>
);

export default LayoutRoot;
