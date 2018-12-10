const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey  = fs.readFileSync('/home/maryam/Downloads/user/key/private.key', 'utf8')
const publicKey  = fs.readFileSync('/home/maryam/Downloads/user/key/public.key', 'utf8')

const options = {
  issuer: "TripeMa",
  subject: "maryam@tripema.com",
  audience: "https://tripema.com/",
  expiresIn: "30d",
  algorithm: "RS256",
}

function sign(payload) {
  return jwt.sign(payload, privateKey, options)
}

function verify(token) {
  try {
    return jwt.verify(token, publicKey, options)
  } catch (e) {
    return false
  }
}

function decode(token) {
  return jwt.decode(token, {complete: true})
}

module.exports = {
  sign,
  verify,
  decode,
}
