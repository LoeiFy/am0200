const checkSum = require('./checksum')

module.exports = function generator() {
  const githubCssPath = require.resolve('github-markdown-css')
  const { store, fs, outputHTML } = this
  const data = store.get('data')
  const cssFile = fs.readFileSync(githubCssPath, 'utf8')
  const cssHash = checkSum(cssFile)

  data.forEach((item) => {
    outputHTML({
      template: 'page',
      path: `${item.name}.html`,
      data: item,
    })
  })
}
