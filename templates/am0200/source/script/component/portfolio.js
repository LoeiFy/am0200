import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
    this.loading = false
    this.prev = undefined
  }

  goto(name, initiative = true) {
    const toast = $('#toast')
    $('.left').removeClass('active')

    if (this.loading || name === this.prev) {
      return
    }

    this.prev = name
    this.loading = true
    this.container.html('')
    this.container.addClass('loading')

    toast.removeClass('active')
    $('.item').removeClass('active')
    if (name !== '/') {
      $(`.${name.split('/')[1]}`).addClass('active')
    }

    window.fetch(`${window.host}${name === '/' ? '' : name}/`)
      .then(res => res.text())
      .then((res) => {
        const title = res
          .split(/<title>([\s\S]*)<\/title>/)[1]
          .replace(/[\r\n]/g, '')
          .trim()
        const main = res.match(/<body>([\s\S]*)<\/body>/)
        const fragment = document.createElement('div');

        [fragment.innerHTML] = main

        const child = fragment.querySelector('#main-content')
        this.container.append(child)
        document.title = title

        if (initiative) {
          window.history.pushState(null, title, name)
        }

        this.loading = false
        this.container.removeClass('loading')
      })
      .catch(({ message }) => {
        this.loading = false
        toast.html(message || 'loading error')
        toast.addClass('active')
      })
  }
}
