// Config
// ==========================

type Meta = {
  title: string;
  description: string;
  author: string;
  url: string;
  avatar: string;
  icon?: string;
  favicon: string;
  social?: {
    github?: string;
    instagram?: string;
    twitter?: string;
  };
  manifestThemeColor?: string;
  manifestBackgroundColor?: string;
};

type NavigationItem = {
  title: string;
  url: string;
  external?: boolean;
};

export type Config = {
  meta: Meta;
  navigation: NavigationItem[];
  /**
   * Pages directory used to generate the RSS feed, e.g. 'blog'.
   * If empty, the feed will output all MDX pages as posts.
   */
  rssPosts?: string | string[];
  /**
   * Pages directory used to generate the posts on the home template.
   * If empty, the feed will output all MDX pages as posts.
   */
  homePosts?: string | string[];
  copyright?: string;
  hideAttribution?: boolean;
};

// FrontMatter
// ==========================

export type FrontMatterCustom = {
  __dir: string[];
  __path: string;
  __wordCount: number;
  __dateString?: string;
};

export type FrontMatter = {
  title?: string;
  /**
   * Note: `post-index` is a bespoke layout and incompatible with MDX.
   */
  layout?: "default" | "post" | "home";
  date?: string;
  image?: string;
  summary?: string;
  tags?: string[];
  __resourcePath: string;
};

export type FrontMatterExtended = FrontMatterCustom & FrontMatter;

// Pages
// ==========================

export type MDXPages = FrontMatterExtended[];

// Layouts
// ==========================

export type Layout = (frontMatter: FrontMatterExtended) => React.FC;

export type LayoutProps = {
  posts?: FrontMatterExtended[];
} & FrontMatter;
