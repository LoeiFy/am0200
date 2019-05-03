const { join } = require('path')
const CleanCSS = require('clean-css')
const checkSum = require('./checksum')

const githubCssPath = require.resolve('github-markdown-css')

module.exports = (acyort) => {
  const { fs, config } = acyort
  const { base, public: publicPath, templatePath } = config.get()

  const cssPath = join(templatePath, 'source', 'style')
  const cssList = fs.readdirSync(cssPath)

  let cssFiles = []

  cssList.forEach((name) => {
    if (name === 'index.css') {
      return
    }
    const current = join(cssPath, name)
    cssFiles.push(fs.readFileSync(current, 'utf8'))
  })

  cssFiles.push(fs.readFileSync(githubCssPath, 'utf8'))

  cssFiles = new CleanCSS().minify(cssFiles.join('\n')).styles

  const cssHash = checkSum(cssFiles)
  const cssDest = join(base, publicPath, 'dist', `index.${cssHash}.css`)

  return {
    hash: cssHash,
    dest: cssDest,
    file: cssFiles,
  }
}
