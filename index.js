const logger = require('./log')
const log = require('./log').log
const finalize = require('./utils/finalize')
const dbConnect = require('./utils/dbConnect')
const result = require('./utils/result')
const token = require('./utils/token')
const utils = require('./utils/utils')
const base = require('./utils/base')
const outputResult = require('./utils/outputResult')

module.exports = {
  log,
  logger,
  finalize,
  dbConnect,
  result,
  token,
  utils,
  base,
  outputResult
}
