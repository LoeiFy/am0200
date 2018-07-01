const fs = require('fs')

const config = {
  dev: {
    css: '<link rel="stylesheet" href="./src/index.css" />',
    js: '<script type="module" src="./src/index.js"></script>',
  },
  prod: {
    css: '<link rel="stylesheet" href="./dist/index.css" />',
    js: '<script src="./dist/index.js"></script>',
  },
}
const { NODE_ENV } = process.env
const { css, js } = config[NODE_ENV]
const index = fs
  .readFileSync('./src/index.html', 'utf8')
  .replace('@@css', css)
  .replace('@@js', js)

fs.writeFileSync('./index.html', index, 'utf8')
