module.exports = function (templatePath, extraArgs = {}) {
  return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *(async *)?function *\([^)]*\) *\{|\} *;? *$/g, "").trim(), this.getParameters(extraArgs));
};