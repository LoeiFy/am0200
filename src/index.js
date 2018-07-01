import './component/title.js'

const a = { b: 1 }
const c = { d: 1, ...a }

class A {
  state = null

  render() {
    return this
  }
}

const s = new A()

s.render()

console.log(c)
