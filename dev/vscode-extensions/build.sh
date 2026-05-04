#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"

cd ejs-syntax-for-html-js-and-css

mv src/extension.js src/extension.dist.js

rm ejs-syntax-for-html-js-and-css-0.0.1.backup.vsix
mv ejs-syntax-for-html-js-and-css-0.0.1.vsix ejs-syntax-for-html-js-and-css-0.0.1.backup.vsix

vsce package

code --uninstall-extension allnulled.ejs-syntax-for-html-js-and-css
code --install-extension ejs-syntax-for-html-js-and-css-0.0.1.vsix