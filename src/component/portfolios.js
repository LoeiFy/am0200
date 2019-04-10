import $ from './query'

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

        e.className = `item ${name.toLowerCase()}`
        e.innerHTML = `<h3>${name}</h3><p>${description}</p>`
        e.onclick = () => this.onLink(`/${name.toLowerCase()}`)

        return e
      })
  }
}
