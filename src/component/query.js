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

  ready() {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(this)
      })
    })
  }
}

export default e => new Query(e)
