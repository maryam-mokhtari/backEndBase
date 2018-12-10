module.exports = {
  finalize(result, res) {
    result.validateResultForOutput();
    res.status(result.status)
    res.send(result);
  }
}
