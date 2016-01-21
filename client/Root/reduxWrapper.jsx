import { Provider } from 'react-redux'

if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  module.exports = require('./reduxWrapper.dev')
} else {
  module.exports = Provider
}
