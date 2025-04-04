
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./dbconnect")
const employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  basic_salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  HRA: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  allowances: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tax: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deductions: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PF: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  attendance: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Employee', 'HR', 'Admin'),
    allowNull: false
  },
  workingHours: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  month: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

sequelize.sync().then(() => {
  console.log('employee table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = employee;