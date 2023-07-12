import Sequelize from 'sequelize';

const dbName = process.env.DATABASE;
const username = process.env.BDC_USERNAME;
const password = process.env.BDC_PASSWORD;
const host = process.DB_HOST || 'localhost';


const sequelize = new Sequelize(dbName, username, password, {
  host,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
