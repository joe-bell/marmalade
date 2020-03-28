/**
 * @type import('./src/types').Config
 */
const config = {
  meta: {
    title: "marmalade 🍊",
    description: "Another opinionated JAMstack starter.",
    author: "Joe Bell",
    url: "https://marmalade.joebell.co.uk",
    icon: "public/icon.jpg",
    favicon: "public/favicon.jpg",
    avatar: "public/avatar.jpg",
    social: {
      github: "joe-bell",
      instagram: "joebell",
      twitter: "joebell_",
    },
  },
  navigation: [
    {
      title: "Readme",
      url: "/readme",
    },
    {
      title: "Blog",
      url: "/blog",
    },
    {
      title: "Misc",
      url: "/misc",
    },
    {
      title: "Twitter",
      url: "https://twitter.com/joebell_",
      external: true,
    },
    {
      title: "GitHub",
      url: "https://github.com/joe-bell/",
      external: true,
    },
  ],
  rssPosts: ["src/pages/blog"],
  homePosts: ["src/pages/blog"],
};

module.exports = config;
