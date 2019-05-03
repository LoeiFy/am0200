const { join } = require('path')
// const getCss = require('./css')

module.exports = function generator() {
  const { store, util, fs } = this
  const data = store.get('data')
  const { base, public: publicDir } = this.config.get()
  const status = store.get('status', 'acyort-server')

  const repos = data.slice(1).map(({ name, description }) => ({ name, description }))

  const html = () => {
    data.forEach((item) => {
      util.outputHTML({
        template: 'page',
        path: item.name === 'index'
          ? 'index.html'
          : `${item.name.toLowerCase()}/index.html`,
        data: {
          ...item,
          css: '/style/index.css',
          script: '/script/index.js',
          repos,
        },
      })
    })
  }

  const source = () => {
    util.copySource()
  }

  if (status) {
    const { path = '' } = status
    const outputPath = join(base, publicDir, 'style', 'github-markdown.css')
    const markdownCss = require.resolve('github-markdown-css')

    if (!fs.existsSync(outputPath)) {
      fs.copySync(markdownCss, outputPath)
    }

    if (path.includes('/am0200/source/')) {
      source()
      return
    }
    if (path.includes('/layout/page.html')) {
      html()
      return
    }

    html()
    source()
  }

  // const { store, fs, util } = this
  // const data = store.get('data')
  // const repos = data.slice(1).map(({ name, description }) => ({ name, description }))
  // const status = store.get('status', 'acyort-server')

  // const { hash, dest, file } = getCss(this)

  // let scriptHash

  // if (!status) {
  //   const js = fs.readdirSync(dirname(dest)).find(n => n.includes('.js'))
  //   if (js) {
  //     [, scriptHash] = js.split('.')
  //   }
  // }

  // const { path } = status || {}

  // if (!path || extname(path) !== '.css') {
  //   data.forEach((item) => {
  //     util.outputHTML({
  //       template: 'page',
  //       path: item.name === 'index'
  //         ? 'index.html'
  //         : `${item.name.toLowerCase()}/index.html`,
  //       data: {
  //         ...item,
  //         cssHash: hash,
  //         scriptHash,
  //         repos,
  //       },
  //     })
  //   })
  // }

  // if (!path || extname(path) === '.css') {
  //   fs.outputFileSync(dest, file)
  // }
}
