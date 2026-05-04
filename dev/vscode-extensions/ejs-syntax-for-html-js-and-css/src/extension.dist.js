const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

function activate(context) {

  console.log("EJS extension ACTIVATED");

  const disposable = vscode.workspace.onDidSaveTextDocument(async (document) => {

    //console.log("EJS triggered!");

    const filePath = document.fileName;

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

      const rendered = ejs.render(content, {}, {
        filename: filePath
      });

      const newPath = filePath.replace(ext, extMap[ext]);

      await fs.promises.writeFile(newPath, rendered, "utf-8");

      console.log("Rendered:", newPath);

    } catch (err) {
      vscode.window.showErrorMessage("EJS error: " + err.message);
    }

  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};