import './component/title'
import $ from './component/query'
import Konami from './component/konami'
import Popup from './component/popup'
import Top from './component/top'
import Portfolios from './component/portfolios'
import Portfolio from './component/portfolio'

document.addEventListener('DOMContentLoaded', () => {
  const popup = new Popup()
  const konami = new Konami()
  const top = new Top('.top')
  const portfolios = new Portfolios('.bottom')
  const portfolio = new Portfolio('.right')

  top.render()
  portfolios.render()
  konami.active = () => popup.open()
  top.link = () => portfolio.goto('/')
  portfolios.link = name => portfolio.goto(name)

  window.addEventListener('popstate', () => {
    const { pathname } = window.location
    portfolio.goto(pathname, false)
  })

  $('#menu').on('click', () => $('.left').addClass('active'))
})
