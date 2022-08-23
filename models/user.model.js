const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const User = (sequelize) => sequelize.define('User',{
    user_id : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    user_name : {
        type:DataTypes.STRING,
        allowNull:false
    },
    is_applied : {
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    timestamps: false
});

module.exports = User;