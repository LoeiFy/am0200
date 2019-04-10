const fetcher = require('./fetcher')
const generator = require('./generator')

const { NODE_ENV } = process.env

module.exports = (acyort) => {
  if (NODE_ENV === 'dev') {
    acyort.config.url = 'http://127.0.0.1:2222' // eslint-disable-line no-param-reassign
  }

  acyort.workflow.register(
    fetcher.bind(acyort),
    generator.bind(acyort),
  )
}
