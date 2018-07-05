class Query {
  constructor(e) {
    if (e) {
      this.elements = Array.from(document.querySelectorAll(e))
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
}

export default e => new Query(e)
