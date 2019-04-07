const getCss = require('./css')

module.exports = function generator() {
  const { store, fs, outputHTML } = this
  const data = store.get('data')
  const { hash, dest, file } = getCss(this)

  data.forEach((item) => {
    outputHTML({
      template: 'page',
      path: item.name === 'index'
        ? 'index.html'
        : `${item.name.toLowerCase()}/index.html`,
      data: {
        ...item,
        cssHash: hash,
      },
    })
  })

  fs.outputFileSync(dest, file)
}
