const request = require('request')

module.exports = (url, type = 'json') => new Promise((resolve, reject) => {
  const options = {
    url,
    headers: {
      'User-Agent': 'request',
    },
  }

  if (type === 'file') {
    options.headers.Accept = 'application/vnd.github.v3.raw'
  }

  request(options, (err, res, body) => {
    if (err) {
      reject(err)
      return
    }

    if (res.statusCode !== 200) {
      reject(new Error(`Request statusCode error: ${res.statusCode}`))
      return
    }

    if (type === 'json') {
      resolve(JSON.parse(body))
      return
    }

    resolve(body)
  })
})
