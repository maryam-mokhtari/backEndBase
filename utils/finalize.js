const finalize = function(result, res) {
  result.validateResultForOutput()
  res.status(result.status)
  res.send(result)
}

module.exports = finalize
