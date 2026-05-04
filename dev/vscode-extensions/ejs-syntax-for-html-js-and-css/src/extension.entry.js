const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const ModulerBuilder = require(__dirname + "/moduler-builder.dist.js");

module.exports = {
  deactivate: function () {},
  activate: function (context) {
    console.log("EJS extension ACTIVATED");
    const disposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
      //console.log("EJS triggered!");
      const filePath = document.fileName;
      const dirPath = path.dirname(filePath);
      console.log("Starting moduler builder to compile:" + filePath);
      const modulerRoot = await (async function() {
        let pivot = filePath;
        let previousPivot = null;
        let isntRoot = () => {
          return previousPivot !== pivot;
        };
        let hasntPackageJson = async function() {
          const packagePath = path.resolve(pivot, "package.json");
          try {
            await fs.promises.readFile(packagePath, "utf8");
            console.log("Template root found at: " + packagePath);
            return false;
          } catch (error) {
            return true;
          }
        };
        do {
          previousPivot = pivot;
          pivot = path.dirname(pivot);
        } while(await hasntPackageJson() && isntRoot());
        const finalDir = pivot === previousPivot ? dirPath : pivot;
        return finalDir;
      })();
      const modulerBuilder = ModulerBuilder.from(modulerRoot);
      const extMap = {
        ".ohtml": ".html",
        ".ocss": ".css",
        ".ojs": ".js",
        ".ojson": ".json"
      };
      const ext = Object.keys(extMap).find(e => filePath.endsWith(e));
      if (!ext) return;
      try {
        const content = document.getText();
        const rendered = ejs.render(content, {
          global,
          process,
          require,
          ModulerBuilder,
          modulerBuilder,
          templateRoot: modulerRoot,
          document,
          context,
          __dirname: dirPath,
        }, {
          filename: filePath
        });
        const newPath = filePath.replace(ext, extMap[ext]);
        const formatted = require("js-beautify").js(rendered, { indent_size: 2 });
        await fs.promises.writeFile(newPath, formatted, "utf8");
        console.log("Rendered:", newPath);
      } catch (err) {
        vscode.window.showErrorMessage("EJS error: " + err.message);
      }
    });
    context.subscriptions.push(disposable);
  },
};