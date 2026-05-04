#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"

refrescador \
  -w "$(pwd)/" \
  -i "**.dist.*" \
  -i "**/dist.*" \
  -i "**/tests/**/*" \
  -i "**/*.dist.*" \
  -i "**/extension.js" \
  -d 0 \
  -e "sh" \
  -e "ts" \
  -e "tsx" \
  -e "js" \
  -e "json" \
  -e "css" \
  -e "html" \
  -p "3004" \
  -x 'cp "$(pwd)/ejs-syntax-for-html-js-and-css/src/extension.entry.js" "$(pwd)/ejs-syntax-for-html-js-and-css/src/extension.dist.js"' \
  -x 'bash "$(pwd)/build.sh" "@{refrescador.file}"' \
  -x 'bash "$(pwd)/test.sh" "@{refrescador.file}"'