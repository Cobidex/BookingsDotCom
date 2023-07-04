const Sequelize = require('sequelize');

const dbName = process.env.BDC_DBNAME;
const username = process.env.BDC_USERNAME;
const password = process.env.BDC_PASSWORD;
const host = process.DB_HOST || 'localhost';


const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect: 'mysql',
});

module.exports = sequelize;
