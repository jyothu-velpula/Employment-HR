const { DataTypes, Model } = require ('sequelize')
const db = require('../config/database')
const model = require('./index')

const Employees = db.define(
    "employees",
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        employeeName : DataTypes.STRING,
        employeeCode : DataTypes.STRING,
        employeeId : DataTypes.STRING,
        userId : DataTypes.STRING,
        email : DataTypes.STRING,
        mobileNo : DataTypes.STRING,
        department : DataTypes.STRING,
        designation : DataTypes.STRING,
        status : DataTypes.INTEGER,
        salary : DataTypes.STRING,
        gender : DataTypes.STRING,
        isActive : {
            type : DataTypes.INTEGER,
            defaultValue : 1
        },
        isDeleted : {
            type : DataTypes.INTEGER,
            defaultValue : 1
        }   
    }
)

Employees.associate = function(models){
    Employees.belongsTo(models.masterData,{
    foreignKey : "gender",
    targetKey : "systemCode",
    as : "getGender"
})

Employees.hasMany(models.Leave,{
    foreignKey:"employeeId",
    sourceKey:"employeeId",
    as:"leaveDetails"
});

Employees.belongsTo(models.masterData,{
    foreignKey:"department",
    targetKey:"systemCode",
    as:"getDepart"
});
}

module.exports = Employees