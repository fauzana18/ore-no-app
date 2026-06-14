const { Sequelize } = require('sequelize')

const db = new Sequelize('orenoapp_orenoapp', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db