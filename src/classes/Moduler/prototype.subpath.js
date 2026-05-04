module.exports = function (...subpaths) {
  return this.basedir + "/" + subpaths.join("/");
};