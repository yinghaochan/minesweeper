if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  module.exports = require('./storeBuilder.dev')
} else {
  module.exports = require('./storeBuilder.prod')
}
