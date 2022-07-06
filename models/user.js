const Sequelize = require('sequelize').Sequelize;
const db = require('./index');

const User = db.define('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING(55)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      status:{
        type: Sequelize.STRING(10)
      },
      roleId: {
        type: Sequelize.INTEGER
      }
    }, { paranoid: true });

const Role = db.define('role', {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
  name: {
      type: Sequelize.STRING
  }
  }, { paranoid: true });



module.exports = {
    User,
    Role
};