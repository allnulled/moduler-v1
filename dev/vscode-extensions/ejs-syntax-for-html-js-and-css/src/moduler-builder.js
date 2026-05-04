const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const jsbeautify = require("js-beautify");

module.exports = class ModulerBuilder {

  static from = function(...args) {
    return new this(...args);
  };

  constructor(basedir) {
    this.basedir = basedir;
  }

  logreturn(args) {
    console.log(args);
    return args;
  }

  subpath(...subpaths) {
    return this.logreturn(path.resolve(this.basedir, ...subpaths));
  }

  getParameters(extra = {}) {
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
  }

  build() {
    const templatePath = this.subpath(`src/main.ojs`);
    const sourcePath = this.subpath("src/moduler.api.dist.js");
    const modulerTplSource = fs.readFileSync(templatePath).toString();
    const modulerSource = ejs.render(modulerTplSource, this.getParameters({ __FILE__: templatePath }), {});
    const modulerBeautified = jsbeautify.js(modulerSource, { indent_size: 2 });
    fs.writeFileSync(sourcePath, modulerBeautified, "utf8");
  }

  includeTemplate(templatePath, extraArgs = {}) {
    return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString(), this.getParameters(extraArgs));
  }

  includeModuleExportsContent(templatePath, extraArgs = {}) {
    return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *|; *$/g, "").trim(), this.getParameters(extraArgs));
  }

  includeFunctionBodyTemplate(templatePath, extraArgs = {}) {
    return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *(async *)?function *\([^)]*\) *\{|\} *;? *$/g, "").trim(), this.getParameters(extraArgs));
  }

};