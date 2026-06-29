const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Users = db.define("users",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        encryptPassword: DataTypes.STRING,
        userType: DataTypes.STRING,
        role: DataTypes.STRING,
        loginId: DataTypes.STRING,
        employeeId: DataTypes.STRING,
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }
)

Users.associate = function (models) {
    Users.belongsTo(models.Employees, {
        foreignKey: "employeeId",
        targetKey: "employeeId",
        as: "getEmpdetails"
    })
}

module.exports = Users