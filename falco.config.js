const { join } = require('path')

module.exports = {
  entry: join(__dirname, 'templates/am0200/source/script/index.js'),
  sourceMap: false,
  output: {
    filename: 'index.[hash:8].js',
  },
}
