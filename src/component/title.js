let dash = ':'

const title = () => {
  setTimeout(() => {
    dash = dash === ':' ? ' ' : ':'
    document.title = document.title.replace(/AM 02.*?00/, `AM 02${dash}00`)
    title()
  }, 1000)
}

export default title()
