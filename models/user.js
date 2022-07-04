const Sequelize = require('sequelize').Sequelize;
const db = require('./index');

const User = db.define('user', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING(255)
      },
    }, { paranoid: true });

const Course = db.define('course', {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING(50)
    },
    subject: {
      type: Sequelize.STRING(50)
    },
    schoolyear: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
  }, { paranoid: true });


Course.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Course, { as: 'course' });

module.exports = {
    User,
    Course
};