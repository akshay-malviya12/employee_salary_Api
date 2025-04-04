const Sequelize = require("sequelize");
require('dotenv').config();

 const PASSWORD = process.env.PASSWORD
 const DBNAME = process.env.DBNAME

const sequelize = new Sequelize(
  DBNAME,
  'root',
  PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;