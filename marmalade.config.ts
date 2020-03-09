import { Config } from "marmalade";
import foundation from "./src/styles/themes/foundation";

const config: Config = {
  meta: {
    title: "Marmalade",
    emoji: "🍊",
    description: "",
    author: "Joe Bell",
    avatar: "",
    social: {
      twitter: "joebell_",
    },
  },
  navigation: [
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Blog",
      url: "/blog",
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
  initialTheme: {
    light: foundation,
    dark: foundation,
  },
};

export default config;
