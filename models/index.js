'use strict';

const Sequelize = require('sequelize').Sequelize;
const config = require(__dirname + '/../config/config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, config);


sequelize.authenticate()
  .then(() => console.log('CONNECTED DATABASE'))
  .catch((err) => console.log("CANNOT CONNECT DATABASE: \n" + err))

module.exports = sequelize;
