const { join } = require('path')

module.exports = {
  entry: {
    main: 'index.js',
    path: join(__dirname, 'templates/am0200/source/script'),
  },
  sourceMap: false,
  output: {
    filename: 'index.[hash:8].js',
  },
}
