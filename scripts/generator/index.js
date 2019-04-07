const getCss = require('./css')

module.exports = function generator() {
  const { store, fs, outputHTML } = this
  const data = store.get('data')
  const { hash, dest, file } = getCss(this)
  const repos = data.slice(1).map(({ name, description }) => ({ name, description }))

  data.forEach((item) => {
    outputHTML({
      template: 'page',
      path: item.name === 'index'
        ? 'index.html'
        : `${item.name.toLowerCase()}/index.html`,
      data: {
        ...item,
        cssHash: hash,
        repos,
      },
    })
  })

  fs.outputFileSync(dest, file)
}
