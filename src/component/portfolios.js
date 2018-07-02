import { list } from './template.js'
import $ from './query.js'

export default class {
  constructor(e) {
    this.container = $(e)
  }

  urls = [
    {
      title: 'GitHub',
      url: 'https://github.com/loeify',
    },
    {
      title: 'Email',
      url: 'mailto:loeify@gmail.com',
    },
    {
      title: 'Blog',
      url: 'https://mirror.am0200.com',
    },
  ]

  render() {
    window.fetch('/json/portfolios.json')
      .then(res => res.json())
      .then(res => this.urls.concat(res))
      .then(res => list(res))
      .then(res => this.container.html(res))
  }
}
