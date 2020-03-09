import * as React from "react";
import Link from "next/link";
import { Box } from "../styles/components/box";
import navigation from "../data/navigation.json";

const { items } = navigation;

const Header: React.FC = () => (
  <Box as="header">
    <Link href="/">Home</Link>
    <ul className="flex">
      {items.map(item => (
        <li key={item.title}>
          {item.external ? (
            <a href={item.url}>{item.title}</a>
          ) : (
            <Link href={item.url}>{item.title}</Link>
          )}
        </li>
      ))}
    </ul>
  </Box>
);

export default Header;
