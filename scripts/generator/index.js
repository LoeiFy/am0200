const { extname, dirname } = require('path')
const getCss = require('./css')

module.exports = function generator() {
  const { store, fs, outputHTML } = this
  const data = store.get('data')
  const { hash, dest, file } = getCss(this)
  const repos = data.slice(1).map(({ name, description }) => ({ name, description }))
  const status = store.get('status', 'acyort-server')

  let scriptHash

  if (!status) {
    const js = fs.readdirSync(dirname(dest)).find(n => n.includes('.js'))
    if (js) {
      [, scriptHash] = js.split('.')
    }
  }

  const { path } = status || {}

  if (!path || extname(path) !== '.css') {
    data.forEach((item) => {
      outputHTML({
        template: 'page',
        path: item.name === 'index'
          ? 'index.html'
          : `${item.name.toLowerCase()}/index.html`,
        data: {
          ...item,
          cssHash: hash,
          scriptHash,
          repos,
        },
      })
    })
  }

  if (!path || extname(path) === '.css') {
    fs.outputFileSync(dest, file)
  }
}
