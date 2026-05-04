module.exports = function () {
  const templatePath = this.subpath(`src/main.ojs`);
  const sourcePath = this.subpath("src/moduler.api.dist.js");
  const modulerTplSource = fs.readFileSync(templatePath).toString();
  const modulerSource = ejs.render(modulerTplSource, this.getParameters({ __FILE__: templatePath }), {});
  const modulerBeautified = jsbeautify.js(modulerSource, { indent_size: 2 });
  fs.writeFileSync(sourcePath, modulerBeautified, "utf8");
};