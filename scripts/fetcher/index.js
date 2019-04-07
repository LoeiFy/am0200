/* eslint-disable no-await-in-loop */

const API = require('./api')
const sleep = require('./sleep')
const request = require('./request')

module.exports = async function fetcher() {
  const { config, store, logger } = this
  const { repos } = config
  const data = []

  for (let i = 0; i < repos.length; i += 1) {
    const repo = repos[i]
    const repoUrl = API.repo(repo)
    const readmeUrl = API.readme(repo)

    logger.info(`getting data: ${repo}`)

    const { name, description } = await request(repoUrl)
    const content = await request(readmeUrl, 'file')

    data.push({
      name: name === 'am0200' ? 'index' : name,
      description,
      content,
    })

    if (i < repos.length - 1) {
      await sleep()
    }
  }

  store.set('data', data)
}
