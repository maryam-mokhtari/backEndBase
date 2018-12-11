/*jslint node: true */
"use strict";

const initOptions = {
  user: 'postgres',
  host: '127.0.0.1',
  database: process.env.TRIPEMA_DB,
  password: '123',
  port: 5432,
  min: 10,
  max: 100
};


const pgd = require('pg-promise')();

const db = pgd(initOptions);

module.exports = db;
