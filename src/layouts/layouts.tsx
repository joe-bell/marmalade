import * as React from "react";
import { Stack } from "../styles/components/stack";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */

export type LayoutProps = {
  frontMatter?: {
    layout?: string;
  };
};

export type LayoutsProps = LayoutProps;

const LayoutDefault: React.FC<LayoutProps> = props => (
  <>
    <aside>
      <p>Default Layout</p>
    </aside>
    <main>
      <Stack>{props.children}</Stack>
    </main>
  </>
);

const LayoutBlog: React.FC<LayoutProps> = props => (
  <>
    <aside>
      <p>Blog Layout</p>
    </aside>
    <main>
      <Stack>{props.children}</Stack>
    </main>
  </>
);

export const Layouts: React.FC<LayoutProps> = props => {
  if (!props.frontMatter || !props.frontMatter.layout) {
    return <LayoutDefault {...props} />;
  }

  if (props.frontMatter.layout === "blog") {
    return <LayoutBlog {...props} />;
  }

  return <LayoutDefault {...props} />;
};
