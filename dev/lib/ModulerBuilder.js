const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const jsbeautify = require("js-beautify");

module.exports = class ModulerBuilder {
  static from = function(...args) {
    return new this(...args);
  };
  static signals = {
    Return: class {

    },
  };
  constructor(basedir) {
    this.basedir = basedir;
  }
  subpath = function(...subpaths) {
    return path.resolve(this.basedir, ...subpaths);
  };
  getParameters = function(extra = {}) {
    return {
      fs,
      path,
      ejs,
      process,
      global,
      ModulerBuilder,
      modulerBuilder: this,
      ...extra,
    };
  };
  build = function() {
    const templatePath = this.subpath(`src/main.ojs`);
    const sourcePath = this.subpath("src/moduler.api.dist.js");
    const modulerTplSource = fs.readFileSync(templatePath).toString();
    const modulerSource = ejs.render(modulerTplSource, this.getParameters({
      __FILE__: templatePath
    }), {});
    const modulerBeautified = jsbeautify.js(modulerSource, {
      indent_size: 2
    });
    fs.writeFileSync(sourcePath, modulerBeautified, "utf8");
  };
  includeTemplate = function() {
    const templatePath = this.subpath(`src/main.ojs`);
    const sourcePath = this.subpath("src/moduler.api.dist.js");
    const modulerTplSource = fs.readFileSync(templatePath).toString();
    const modulerSource = ejs.render(modulerTplSource, this.getParameters({
      __FILE__: templatePath
    }), {});
    const modulerBeautified = jsbeautify.js(modulerSource, {
      indent_size: 2
    });
    fs.writeFileSync(sourcePath, modulerBeautified, "utf8");
  };
  includeModuleExportsContent = function(templatePath, extraArgs = {}) {
    return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *|; *$/g, "").trim(), this.getParameters(extraArgs));
  };
  includeFunctionBodyTemplate = function(templatePath, extraArgs = {}) {
    return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *(async *)?function *\([^)]*\) *\{|\} *;? *$/g, "").trim(), this.getParameters(extraArgs));
  };
};