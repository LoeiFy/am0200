import detail from './template/detail.js'
import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
  }

  setImgs(imgs) {
    const { elements } = $(imgs)
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].onload = function load() {
        const { width, height } = this
        $(this).css({
          display: 'inline-block',
          width: `${width * 0.5}px`,
          height: `${height * 0.5}px`,
        })
      }
    }
    return this
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
          this.setImgs('.detail img')
          callback()
        }, 500)
      })
  }
}
