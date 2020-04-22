/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import NextLink from "next/link";
import { meta, navigation } from "../../marmalade.config";
import { Box, Button, Container, Link, Flex, useColorMode } from "theme-ui";
import { Wrap } from "raam";
import { Hide } from "./hide";

export const Header: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <Box as="header" py={4}>
      <Container>
        <Flex
          sx={{
            flexDirection: ["column", "row"],
            alignItems: ["top", "center"],
            justifyContent: "space-between",
            "& > *:last-child": {
              marginTop: [2, 0],
            },
          }}
        >
          <Hide hideVisually>{meta.title}: home page</Hide>
          <NextLink href="/" passHref>
            <Link variant="home">
              <Hide hideVisually>Home</Hide>
              <span aria-hidden="true">{meta.title}</span>
            </Link>
          </NextLink>
          <Wrap as="ul" gap={3}>
            {navigation.map(item =>
              item.external ? (
                <Link variant="nav" href={item.url}>
                  {item.title}
                </Link>
              ) : (
                <NextLink href={item.url}>
                  <Link variant="nav">{item.title}</Link>
                </NextLink>
              )
            )}

            <Button
              onClick={() => {
                setColorMode(colorMode === "default" ? "dark" : "default");
              }}
            >
              Toggle {colorMode === "default" ? "Dark" : "Light"}
            </Button>
          </Wrap>
        </Flex>
      </Container>
    </Box>
  );
};
