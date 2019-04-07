const crypto = require('crypto')

module.exports = s => crypto
  .createHash('md5')
  .update(s, 'utf8')
  .digest('hex')
  .slice(0, 8)
