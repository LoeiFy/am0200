import Portfolio from '../portfolio.js'
import $ from '../query.js'

const portfolio = new Portfolio('.left')

let loading = false

export default function (items) {
  return items.map(({ title, name, subtitle }) => {
    const e = document.createElement('div')

    e.className = 'item'
    e.innerHTML = `<h3>${title}</h3><p>${subtitle}</p>`
    e.onclick = () => {
      if (loading || e.classList.contains('active')) {
        return
      }
      loading = true
      portfolio.render(name, () => {
        loading = false
        $('.item').removeClass('active')
        e.classList.add('active')
      })
    }

    return e
  })
}
