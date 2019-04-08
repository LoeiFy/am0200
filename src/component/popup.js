import $ from './query'

export default class {
  constructor() {
    this.e = $('#popup')
    this.init()
  }

  open() {
    this.e.addClass('active')
  }

  init() {
    this.e.on('click', ({ target }) => {
      if (target.id === 'popup') {
        this.e.removeClass('active')
      }
    })
    window.onkeyup = ({ keyCode }) => {
      if (keyCode === 27) {
        this.e.removeClass('active')
      }
    }
  }
}
