const Employees = require("./employee");
const Leave = require("./leave");
const masterData = require("./masterData");
const Users = require("./user");

const models = {
    Employees,
    masterData,
    Users,
    Leave
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = models;