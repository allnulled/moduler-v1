module.exports = function (resource) {
  const url = this.resolve(resource);
  if (this.env.isNodejs) {
    return require("fs").promises.readFile(url, "utf8");
  }
  return fetch(url).then(response => response.text());
};