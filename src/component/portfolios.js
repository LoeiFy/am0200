import { list } from './template.js'
import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
  }

  render() {
    window.fetch('/json/portfolios.json')
      .then(res => res.json())
      .then(res => list(res))
      .then(res => this.container.html(res))
  }
}
