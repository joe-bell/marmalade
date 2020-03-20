const heading = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading",
};

export default {
  colors: {
    text: "hsl(10, 20%, 20%)",
    background: "hsl(10, 10%, 98%)",
    primary: "hsl(10, 80%, 50%)",
    secondary: "hsl(10, 60%, 50%)",
    highlight: "hsl(10, 40%, 90%)",
    purple: "hsl(250, 60%, 30%)",
    muted: "hsl(10, 20%, 94%)",
    gray: "hsl(10, 20%, 50%)",
    modes: {
      dark: {
        text: "hsl(10, 10%, 98%)",
        background: "hsl(10, 20%, 20%)",
      },
    },
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  links: {
    base: {
      textDecoration: "none",
      "&:hover": {
        color: "secondary",
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
    default: {
      textDecoration: "none",
      color: "primary",
      "&:hover": {
        color: "secondary",
      },
      variant: "links.base",
    },
    home: {
      variant: ["links.base", "textStyles.heading"],
    },
    nav: {
      fontSize: 1,
      color: "text",
      "&:hover": {
        color: "primary",
      },
      variant: ["links.base", "textStyles.heading"],
    },
  },
  textStyles: {
    heading,
    display: {
      variant: "textStyles.heading",
      fontSize: [5, 6],
      fontWeight: "display",
      letterSpacing: "-0.03em",
    },
  },
  sizes: {
    container: 768,
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    blockquote: {
      padding: 3,
      bg: "highlight",
      borderRadius: 4,
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "primary",
      borderLeftWidth: 4,
    },
    h1: {
      variant: "textStyles.display",
    },
    h2: {
      variant: "textStyles.heading",
      fontSize: 5,
    },
    h3: {
      variant: "textStyles.heading",
      fontSize: 4,
    },
    h4: {
      variant: "textStyles.heading",
      fontSize: 3,
    },
    h5: {
      variant: "textStyles.heading",
      fontSize: 2,
    },
    h6: {
      variant: "textStyles.heading",
      fontSize: 1,
    },
    a: {
      variant: "links.default",
    },
    pre: {
      variant: "prism",
      fontFamily: "monospace",
      fontSize: 1,
      p: 3,
      color: "text",
      bg: "muted",
      overflow: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      color: "secondary",
      fontSize: 1,
    },
    inlineCode: {
      fontFamily: "monospace",
      color: "secondary",
      bg: "muted",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      "th,td": {
        textAlign: "left",
        py: "4px",
        pr: "4px",
        pl: 0,
        borderColor: "muted",
        borderBottomStyle: "solid",
      },
    },
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px",
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px",
    },
    hr: {
      border: 0,
      borderBottom: "1px solid",
      borderColor: "muted",
    },
    img: {
      maxWidth: "100%",
    },
    ul: {
      "&.contains-task-list": {
        listStyleType: "none",
        paddingLeft: 0,
        ul: {
          paddingLeft: "1.2rem",
        },
      },
    },
  },
  prism: {
    ".comment,.prolog,.doctype,.cdata,.punctuation,.operator,.entity,.url": {
      color: "gray",
    },
    ".comment": {
      fontStyle: "italic",
    },
    ".property,.tag,.boolean,.number,.constant,.symbol,.deleted,.function,.class-name,.regex,.important,.variable": {
      color: "purple",
    },
    ".atrule,.attr-value,.keyword": {
      color: "primary",
    },
    ".selector,.attr-name,.string,.char,.builtin,.inserted": {
      color: "secondary",
    },
  },
};
