import './component/title.js'
import Portfolios from './component/portfolios.js'
import $ from './component/query.js'

const portfolios = new Portfolios('.bottom')

;(async () => {
  await $().ready()
  portfolios.render()
})()
