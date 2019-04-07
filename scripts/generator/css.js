const { join } = require('path')
const checkSum = require('./checksum')

const githubCssPath = require.resolve('github-markdown-css')

module.exports = (acyort) => {
  const { fs, config } = acyort
  const { base, public: publicPath, templatePath } = config
  const cssPath = join(templatePath, 'source')
  const cssList = fs.readdirSync(cssPath)

  let cssFiles = []

  cssList.forEach((name) => {
    const current = join(cssPath, name)
    cssFiles.push(fs.readFileSync(current, 'utf8'))
  })

  cssFiles.push(fs.readFileSync(githubCssPath, 'utf8'))

  cssFiles = cssFiles.join('\n')

  const cssHash = checkSum(cssFiles)
  const cssDest = join(base, publicPath, 'dist', `page.${cssHash}.css`)

  return {
    hash: cssHash,
    dest: cssDest,
    file: cssFiles,
  }
}
