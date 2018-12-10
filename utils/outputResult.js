function outputResult(code, hasError, data, message) {
  return {
    code,
    hasError,
    data,
    message,
  }
}

function validateResult(input) {
  return ((input && input.hasError)  == true)
}

module.exports = {
  outputResult,
  validateResult,
}
