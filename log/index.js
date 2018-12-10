/*jslint node: true */
"use strict";

const winston = require('winston');

const logger = winston.createLogger({
  format:winston.format.json(),
  transports:[
    new winston.transports.File({
      filename:'error.log',
      level:'error',
      handleExceptions: true
    }),
    new winston.transports.File({
      filename:'info.log',
      level:'info'
    })
  ],
  exitOnError: false
});

module.exports = {
  log:logger
}
