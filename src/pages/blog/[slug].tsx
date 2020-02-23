import * as React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { NextPage } from "next";

type BlogContent = {
  content?: string | undefined;
};

type BlogData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

// Using
// https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk

type BlogPostProps = BlogContent & BlogData & NextPage;

const BlogPost: React.FC<BlogPostProps> = props => {
  const markdownBody = props.content;

  const frontmatter = props.data;

  return (
    <Layout>
      <article>
        <img alt="" src={frontmatter.hero_image} />
        <h1>{frontmatter.title}</h1>
        <div>
          <ReactMarkdown
            source={markdownBody}
            renderers={{
              /* eslint-disable react/display-name */
              paragraph: props => <p className="bg-purple-200" {...props} />,
              /* eslint-enable react/display-name */
            }}
          />
        </div>
      </article>
    </Layout>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
BlogPost.getInitialProps = async function(context) {
  // context contains the query param
  const { slug } = context.query;
  // grab the file in the posts dir based on the slug
  const content = await import(`../../../content/blog/${slug}.md`).catch(
    () => ({
      default: 404,
    })
  );
  // also grab the config file so we can pass down siteTitle
  // const config = await import(`../../data/config.json`)
  //gray-matter parses the yaml frontmatter from the md body
  const file = matter(content.default);
  return {
    // siteTitle: config.title,
    ...file,
  };
};

export default BlogPost;
