// @ts-check
const fs = require("fs");
const matter = require("gray-matter");
const _glob = require("glob");
const path = require("path");

/**
 * @param {string} glob - glob to search, in glob format.
 */
module.exports = glob =>
  _glob.sync(glob).map(file => {
    const content = fs.readFileSync(file, "utf8");
    const { data } = matter(content);

    const dir = path
      .dirname(file)
      .split(path.sep)
      .slice(2);
    const fileName = path.basename(file, path.extname(file));

    const route =
      fileName === "index"
        ? `/${path.join(...dir)}`
        : `/${path.join(...dir, fileName)}`;

    return Object.assign(data, {
      path: route,
    });
  });
