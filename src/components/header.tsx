/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Link from "next/link";
import { meta, navigation } from "../../marmalade.config";
import { Box, Container } from "theme-ui";
import { Hide } from "./hide";

export const Header: React.FC = () => (
  <Box as="header" py={4}>
    <Container>
      <Hide hideVisually>{meta.title}: home page</Hide>
      <Link href="/">
        <a>
          <Hide hideVisually>Home</Hide>
          <span aria-hidden="true">{meta.title}</span>
        </a>
      </Link>
      <ul>
        {navigation.map(item => (
          <li key={item.title}>
            {item.external ? (
              <a href={item.url}>{item.title}</a>
            ) : (
              <Link href={item.url}>
                <a>{item.title}</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </Container>
  </Box>
);
