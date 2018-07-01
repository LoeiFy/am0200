let dash = ':'

const title = () => {
  setTimeout(() => {
    dash = dash === ':' ? ' ' : ':'
    document.title = `AM 02${dash}00`
    title()
  }, 1000)
}

export default title()
