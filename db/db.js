const Sequelize = require('sequelize');
const config = require('../config/config.json').development;
const models = require('../models');
// console.log(config);
 console.log("connected database");

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});
db.sync();
db.models = models;

module.exports = db;