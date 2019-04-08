import './component/title'
import $ from './component/query'
import Konami from './component/konami'
import Popup from './component/popup'
import Top from './component/top'
import Portfolios from './component/portfolios'

document.addEventListener('DOMContentLoaded', () => {
  const popup = new Popup()
  const konami = new Konami()
  const top = new Top('.top')
  const portfolios = new Portfolios('.bottom')

  top.render()
  portfolios.render()
  konami.active = () => popup.open()

  top.link = (path) => {
    console.log(path)
  }

  $('#menu').on('click', () => $('.left').addClass('active'))
})
