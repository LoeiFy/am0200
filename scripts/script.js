const fetcher = require('./fetcher')

module.exports = (acyort) => {
  acyort.workflow.register(
    fetcher.bind(acyort),
  )
}
