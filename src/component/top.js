import { user } from './template/list.js'
import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
  }

  render() {
    this.container.append(user())
  }
}
