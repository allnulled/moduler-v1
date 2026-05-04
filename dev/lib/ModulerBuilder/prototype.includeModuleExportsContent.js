module.exports = function(templatePath, extraArgs = {}) {
  return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString().replace(/^ *module\.exports *= *|; *$/g, "").trim(), this.getParameters(extraArgs));
};