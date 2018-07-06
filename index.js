const fs = require('fs')
const yaml = require('yamljs')

const config = {
  dev: {
    css: '<link rel="stylesheet" href="./src/index.css" />',
    js: '<script type="module" src="./src/index.js"></script>',
  },
  prod: {
    css: '<link rel="stylesheet" href="./dist/index.css" />',
    js: `
      <script src="https://unpkg.com/babel-polyfill/browser.js"></script>
      <script src="https://unpkg.com/whatwg-fetch/fetch.js"></script>
      <script src="./dist/index.js"></script>
    `,
  },
}
const { NODE_ENV } = process.env
const { css, js } = config[NODE_ENV]
const index = fs
  .readFileSync('./src/index.html', 'utf8')
  .replace('@@css', css)
  .replace('@@js', js)
const portfolios = fs.readdirSync('./portfolio', 'utf8')
  .filter(portfolio => portfolio.indexOf('.yml') > -1)
  .map((portfolio) => {
    const data = yaml.load(`./portfolio/${portfolio}`)
    return { name: portfolio.split('.yml')[0], ...data }
  })
const list = portfolios
  .filter(({ name }) => name !== 'default')
  .map(({
    title,
    name,
    subtitle,
    order,
  }) => ({
    title,
    name,
    subtitle,
    order,
  }))

fs.writeFileSync('./index.html', index, 'utf8')
fs.writeFileSync('./json/portfolios.json', JSON.stringify(list), 'utf8')
portfolios.forEach((portfolio) => {
  const { name } = portfolio
  fs.writeFileSync(`./json/${name}.json`, JSON.stringify(portfolio), 'utf8')
})
