const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const Company = (sequelize) => sequelize.define('Company',{
    company_id : {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    company_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
});

module.exports = Company;