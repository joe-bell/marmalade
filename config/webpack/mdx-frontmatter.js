const matter = require("gray-matter");
const stringifyObject = require("stringify-object");

module.exports = async function(src) {
  const callback = this.async();
  const { content, data } = matter(src);

  const frontMatter =
    data &&
    `export const frontMatter = ${stringifyObject(data)}

`;

  const code = `${frontMatter}${content}`;

  return callback(null, code);
};
