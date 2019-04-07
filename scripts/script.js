const fetcher = require('./fetcher')
const generator = require('./generator')

module.exports = (acyort) => {
  acyort.workflow.register(
    fetcher.bind(acyort),
    generator.bind(acyort),
  )
}
