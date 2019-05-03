const { join, dirname } = require('path')
const getCss = require('./css')

module.exports = function generator() {
  const { store, util, fs } = this
  const data = store.get('data')
  const { base, public: publicDir } = this.config.get()
  const status = store.get('status', 'acyort-server')

  const repos = data.slice(1).map(({ name, description }) => ({ name, description }))

  const html = (css, script) => {
    data.forEach((item) => {
      util.outputHTML({
        template: 'page',
        path: item.name === 'index'
          ? 'index.html'
          : `${item.name.toLowerCase()}/index.html`,
        data: {
          ...item,
          css,
          script,
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
      html('/style/index.css', '/script/index.js')
      return
    }

    html('/style/index.css', '/script/index.js')
    source()
    return
  }

  const { hash, dest, file } = getCss(this)
  const buildJs = fs.readdirSync(dirname(dest)).find(n => n.includes('.js'))
  const buildCss = `index.${hash}.css`

  fs.outputFileSync(dest, file)
  html(`/dist/${buildCss}`, `/dist/${buildJs}`)
}
