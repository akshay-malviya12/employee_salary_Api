// name email password type (employee/hr/admin)
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./dbconnect")
const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  Type: {
    type: DataTypes.ENUM('employee', ' HR', 'Admin'),
    allowNull: false
  },

});

sequelize.sync().then(() => {
  console.log('user table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = user;




