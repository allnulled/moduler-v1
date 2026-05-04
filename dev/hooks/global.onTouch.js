const fs = require("fs");
const path = require("path");

const REACTIVE_FILES = {
  "/dev/lib/ModulerBuilder.js": function(file, relfile, projectRoot) {
    fs.copyFileSync(file, path.resolve(projectRoot, "dev/vscode-extensions/ejs-syntax-for-html-js-and-css/src/ModulerBuilder.dist.js"));
  }
};

module.exports = async function(file, relfile, projectRoot, modulerBuilder) {
  if(relfile.endsWith(".entry.js")) {
    return fs.promises.copyFile(file, file.replace(/\.entry\.js$/g, ".dist.js"));
  }
  const callback = REACTIVE_FILES[relfile];
  if(typeof callback !== "undefined") {
    return await callback(file, relfile, projectRoot);
  }
};