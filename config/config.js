const path = require('path');
require('dotenv').config({ path: __dirname + '/dev.env' });

const development = {
    username: "postgres",
    password: process.env.POSTGRESQL_PASSWORD,
    database: "onboarding",
    host: '127.0.0.1',
    dialect: "postgres",
    operatorAliases : false
  }

  module.exports = development;
