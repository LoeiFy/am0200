import './component/title.js'
import './component/konami.js'
import Portfolios from './component/portfolios.js'
import Top from './component/top.js'

const portfolios = new Portfolios('.bottom')
const top = new Top('.top')

window.onload = () => {
  portfolios.render()
  top.render()
}
