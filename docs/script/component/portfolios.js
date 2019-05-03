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
    return JSON.parse(window.repos || '[]')
      .map(({ name, description }) => {
        const e = document.createElement('div')
        const { pathname } = window.location
        const c = pathname.split('/')[1]

        e.className = `item ${name.toLowerCase()}${c === name ? ' active' : ''}`
        e.innerHTML = `<h3>${name}</h3><p>${description}</p>`
        e.onclick = () => this.onLink(`/${name.toLowerCase()}`)

        return e
      })
  }
}
