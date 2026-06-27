const {DataTypes} = require('sequelize')
const db = require('../config/database')

const masterData = db.define(
    "masterData",
    {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        codeId : DataTypes.STRING,
        codeDesc : DataTypes.STRING,
        codeType : DataTypes.STRING,
        systemCode : DataTypes.STRING,
        systemCodeDsesc : DataTypes.STRING,
        isActive : {
            type : DataTypes.INTEGER,
            defaultValue : 1
        },
        isDeleted : {
            type : DataTypes.INTEGER,
            defaultValue : 0
        },
    }
)

module.exports = masterData