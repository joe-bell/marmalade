import * as React from "react";
import { Container, Heading, Text } from "theme-ui";
import LayoutRoot from "../layouts/root";
// @ts-ignore
import { Inline, Stack } from "raam";

// const Foo = () => <h1>Test</h1>;

const About: React.FC = () => (
  <LayoutRoot>
    <Container>
      <Stack>
        <Heading as="h1">Inline</Heading>
        <Heading as="h2">Array</Heading>
        <Text>In an array of strings</Text>
        <Inline gap={3}>
          {["Test", "Test 2", "Test 3", "Test 4", "Test 5"]}
        </Inline>
        <Text>In an array of strings</Text>
        <Inline as="ul">
          {["Test", "Test 2", "Test 3", "Test 4", "Test 5"]}
        </Inline>
      </Stack>
    </Container>
  </LayoutRoot>
);

export default About;
