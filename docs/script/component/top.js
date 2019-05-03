import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
    this.onLink = () => null
  }

  render() {
    this.container.append(this.template)
  }

  set link(fn) {
    this.onLink = fn
  }

  get template() {
    const container = document.createElement('div')
    const img = document.createElement('img')
    const div = document.createElement('div')

    div.innerHTML = '<h3>LoeiFy</h3><p>Software Engineer</p>'
    img.src = 'https://avatars2.githubusercontent.com/u/2193211'
    img.onclick = (e) => {
      e.stopPropagation()
      const ts = $('#toast')
      ts.html('cheats: ↑ ↑ ↓ ↓ ← → ← → b a')
      if (!ts.hasClass('active')) {
        ts.addClass('active')
        setTimeout(() => {
          ts.removeClass('active')
        }, 1000)
      }
    }
    container.appendChild(img)
    container.appendChild(div)
    container.onclick = () => this.onLink()

    return container
  }
}
