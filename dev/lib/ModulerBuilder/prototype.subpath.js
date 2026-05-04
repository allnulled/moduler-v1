module.exports = function (...subpaths) {
  return path.resolve(this.basedir, ...subpaths);
};