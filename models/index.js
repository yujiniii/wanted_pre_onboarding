const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = require('./user.model')(sequelize);
const Company = require('./company.model')(sequelize);
const Recruit = require('./recruit.model')(sequelize);


const db = {};
db.sequelize = sequelize;

db.User = User;
db.Recruit = Recruit;
db.Company = Company;


module.exports = db;
