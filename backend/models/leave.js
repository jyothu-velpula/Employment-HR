const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Leave = db.define("leaveManagement", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    employeeId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },

    leaveType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    fromDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    toDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    totalDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        defaultValue: "Pending"
    },

    approvedBy: {
        type: DataTypes.STRING
    },

    approvedDate: {
        type: DataTypes.DATE
    },

    remarks: {
        type: DataTypes.TEXT
    },

    isActive: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    isDeleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});


Leave.associate = function(models){

    Leave.belongsTo(models.Employees,{

        foreignKey:"employeeId",

        targetKey:"employeeId",

        as:"employeeDetails"

    });

}

module.exports = Leave;