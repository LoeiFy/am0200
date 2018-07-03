import detail from './template/detail.js'
import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
  }

  render(name, callback) {
    this.container.addClass('loading')

    window.fetch(`/json/${name}.json`)
      .then(res => res.json())
      .then(res => detail(res))
      .then((res) => {
        setTimeout(() => {
          this.container.removeClass('loading')
          this.container.html(res)
          callback()
        }, 500)
      })
  }
}
