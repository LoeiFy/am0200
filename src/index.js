import './component/title.js'
import Konami from './component/konami.js'
import Portfolios from './component/portfolios.js'
import Top from './component/top.js'
import Popup from './component/popup.js'

window.onload = () => {
  const popup = new Popup()
  const portfolios = new Portfolios('.bottom')
  const top = new Top('.top')
  const konami = new Konami()

  portfolios.render()
  top.render()
  konami.active = () => popup.open()
}
