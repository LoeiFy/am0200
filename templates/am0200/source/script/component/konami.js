export default class {
  constructor() {
    this.konami = '38,38,40,40,37,39,37,39,66,65'
    this.keys = []
    this.callback = () => null
    this.init()
  }

  init() {
    window.onkeydown = ({ keyCode }) => {
      if (keyCode === 38 && this.keys[0] !== 38) {
        this.keys = []
      }
      this.keys.push(keyCode)
      if (this.keys.length === 10) {
        if (this.konami === this.keys.join()) {
          this.callback()
        }
        this.keys = []
      }
    }
  }

  set active(fn) {
    this.callback = fn
  }
}
