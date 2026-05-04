module.exports = (templatePath, extraArgs = {}) {
  return ejs.render(fs.readFileSync(this.subpath(templatePath)).toString(), this.getParameters(extraArgs));
};