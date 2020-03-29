import * as React from "react";
import config from "../../marmalade.config";
import { Box, Container, Link, Text } from "theme-ui";

export const Footer: React.FC = ({ children }) => (
  <Box as="footer" py={4}>
    <Container>
      {children}
      {config.copyright && <Text>{config.copyright}</Text>}
      {!config.hideAttribution && (
        <Link href="https://github.com/joe-bell/marmalade">
          Built with Marmalade
        </Link>
      )}
    </Container>
  </Box>
);
