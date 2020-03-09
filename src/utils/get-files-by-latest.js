// @ts-check
const getFiles = require("./get-files");

/**
 * @param {string} glob - glob to search, in glob format.
 */
module.exports = glob => {
  const files = getFiles(glob);

  // Check if pages in the specified glob contain the date property.
  const filesContainDate = files.every(file => file.date);

  return filesContainDate
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      files.sort((a, b) => new Date(b.date) - new Date(a.date))
    : files;
};
