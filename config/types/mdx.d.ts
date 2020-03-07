declare module "@mdx-js/react" {
  import * as React from "react";
  import { LayoutProps } from "marmalade";

  type ComponentType =
    | "a"
    | "blockquote"
    | "code"
    | "delete"
    | "em"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "hr"
    | "img"
    | "inlineCode"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "strong"
    | "sup"
    | "table"
    | "td"
    | "thematicBreak"
    | "tr"
    | "ul"
    | "wrapper";

  export type ComponentProps = {
    children: React.ReactNode;
  } & LayoutProps;

  export type Components = {
    [key in ComponentType]?: React.ComponentType<ComponentProps>;
  };

  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }
  export class MDXProvider extends React.Component<MDXProviderProps> {}
}
