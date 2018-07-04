import Portfolio from '../portfolio.js'
import $ from '../query.js'

const portfolio = new Portfolio('.left')

let loading = false

export function list(items) {
  return items
    .sort((a, b) => a.order - b.order)
    .map(({ title, name, subtitle }) => {
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
          $('.top > div').removeClass('active')
          e.classList.add('active')
        })
      }

      return e
    })
}

export function user() {
  const container = document.createElement('div')
  const img = document.createElement('img')
  const div = document.createElement('div')

  div.innerHTML = '<h3>LoeiFy</h3><p>Front-End Developer</p>'
  img.src = 'https://avatars2.githubusercontent.com/u/2193211'
  img.onclick = (e) => {
    e.stopPropagation()
  }
  container.appendChild(img)
  container.appendChild(div)
  container.onclick = () => {
    if (loading || container.classList.contains('active')) {
      return
    }
    loading = true
    portfolio.render('default', () => {
      loading = false
      $('.item').removeClass('active')
      container.classList.add('active')
    })
  }

  return container
}
