const { join } = require('path')

module.exports = {
  port: 2333,
  entry: {
    main: 'index.js',
    path: join(__dirname, 'src'),
  },
  sourceMap: false,
  output: {
    filename: 'page.[hash:8].js',
  },
}
