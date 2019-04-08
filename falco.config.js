const { join } = require('path')

module.exports = {
  port: 2333,
  entry: {
    main: 'index.js',
    path: join(__dirname, 'src'),
  },
  mode: 'development',
  sourceMap: false,
  output: {
    filename: 'index.[hash:8].js',
  },
  template: join(__dirname, 'docs', 'index.html'),
}
