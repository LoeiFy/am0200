/* eslint-disable no-await-in-loop */

const { join } = require('path')
const API = require('./api')
const sleep = require('./sleep')
const request = require('./request')

module.exports = async function fetcher() {
  const {
    config,
    store,
    logger,
    fs,
  } = this

  const cacheFile = join(process.cwd(), 'cache.json')

  if (fs.existsSync(cacheFile)) {
    store.set('data', require(cacheFile)) // eslint-disable-line
    return
  }

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

  fs.outputFileSync(cacheFile, JSON.stringify(data))
  store.set('data', data)
}
