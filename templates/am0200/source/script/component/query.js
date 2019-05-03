class Query {
  constructor(e) {
    const regex = /HTML.*?Element/
    if (e) {
      const type = Object.prototype.toString.call(e)
      this.elements = regex.test(type) ? [e] : Array.from(document.querySelectorAll(e))
    }
  }

  html(content) {
    this.elements.forEach((e) => {
      e.innerHTML = content
    })
    return this
  }

  addClass(name) {
    this.elements.forEach(e => e.classList.add(name))
    return this
  }

  hasClass(name) {
    return this.elements[0].classList.contains(name)
  }

  css(styles) {
    this.elements.forEach((e) => {
      Object.keys(styles).forEach((key) => {
        e.style[key] = styles[key]
      })
    })
    return this
  }

  on(events, callback) {
    const evs = events
      .split(',')
      .map(ev => ev.trim())

    this.elements.forEach((e) => {
      evs.forEach((ev) => {
        e.addEventListener(ev, callback, false)
      })
    })

    return this
  }

  removeClass(name) {
    this.elements.forEach(e => e.classList.remove(name))
    return this
  }

  append(items) {
    if (Array.isArray(items)) {
      items.forEach(item => this.elements[0].appendChild(item))
      return this
    }
    this.elements[0].appendChild(items)
    return this
  }

  get ctx() {
    return this.elements[0]
  }
}

export default e => new Query(e)
