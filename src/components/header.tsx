/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import NextLink from "next/link";
import { meta, navigation } from "../../marmalade.config";
import { Box, Button, Container, Link, Flex, useColorMode } from "theme-ui";
import { Inline } from "./inline";
import { Hide } from "./hide";

export const Header: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Box as="header" py={4}>
      <Container>
        <Flex
          sx={{
            alignItems: ["top", "center"],
            justifyContent: "space-between",
          }}
        >
          <Hide hideVisually>{meta.title}: home page</Hide>
          <NextLink href="/">
            <Link variant="home">
              <Hide hideVisually>Home</Hide>
              <span aria-hidden="true">{meta.title}</span>
            </Link>
          </NextLink>
          <Inline as="ul" gap={3}>
            {navigation.map(item => (
              <li key={item.title}>
                {item.external ? (
                  <Link variant="nav" href={item.url}>
                    {item.title}
                  </Link>
                ) : (
                  <NextLink href={item.url}>
                    <Link variant="nav">{item.title}</Link>
                  </NextLink>
                )}
              </li>
            ))}
            <li>
              <Button
                onClick={() => {
                  setColorMode(colorMode === "default" ? "dark" : "default");
                }}
              >
                Toggle {colorMode === "default" ? "Dark" : "Light"}
              </Button>
            </li>
          </Inline>
        </Flex>
      </Container>
    </Box>
  );
};
