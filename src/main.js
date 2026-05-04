module.exports = (function(clazz) {
  return Object.assign(clazz, {
    global: new clazz(".")
  });
})(class Moduler {
  constructor(basedir) {
    this.basedir = basedir;
    this.modules = {};
  }
  env = {
    isNodejs: typeof global !== "undefined" && typeof require !== "undefined" && typeof process !== "undefined",
    isBrowser: typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined",
  };
  subpath = function(...subpaths) {
    return this.basedir + "/" + subpaths.join("/");
  };
  scan = function(resource) {
    const url = this.resolve(resource);
    if (this.env.isNodejs) {
      return require("fs").promises.readFile(url, "utf8");
    }
    return fetch(url).then(response => response.text());
  };
});