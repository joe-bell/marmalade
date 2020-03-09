import { LayoutProps } from "marmalade";
import * as React from "react";
import { Stack } from "../styles/components/stack";
import Header from "../components/Header";

/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */

export const LayoutRoot: React.FC<LayoutProps> = props => (
  <>
    <Header />
    {props.children}
  </>
);

export const LayoutDefault: React.FC<LayoutProps> = props => (
  <LayoutRoot>
    <aside>
      <p>Default Layout</p>
    </aside>
    <main>
      <Stack>{props.children}</Stack>
    </main>
  </LayoutRoot>
);

export const LayoutBlog: React.FC<LayoutProps> = props => (
  <LayoutRoot>
    <aside>
      <p>Blog Layout</p>
    </aside>
    <main>
      <article>
        {props.frontMatter && props.frontMatter.title && (
          <h1>{props.frontMatter.title}</h1>
        )}
        <Stack>{props.children}</Stack>
      </article>
    </main>
  </LayoutRoot>
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
