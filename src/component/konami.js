const KONAMI = '38,38,40,40,37,39,37,39,66,65'

let keys = []

const konami = () => {
  window.onkeydown = ({ keyCode }) => {
    if (keyCode === 38) {
      keys = [38]
    }
    keys.push(keyCode)
    if (keys.length === 10) {
      if (KONAMI === keys.join()) {
        alert('?')
      }
      keys = []
    }
  }
}

export default konami()
