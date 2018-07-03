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

  ready() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(this)
      })
    })
  }
}

export default e => new Query(e)
