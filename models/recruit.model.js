const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Recruit = (sequelize) => sequelize.define('Recruit',{
    recruit_id : {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey : true
    },
    position : {
        type: DataTypes.STRING,
        allowNull:false
    },
    reward : {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    skill:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    timestamps: false
});

module.exports = Recruit;