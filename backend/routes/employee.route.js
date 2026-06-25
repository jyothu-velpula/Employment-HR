const express = require('express')
const router = express.Router()
const Employees = require("../controllers/employee.controller")

router.post("/Create/Employee",Employees.createEmployee)
router.post("/get/All/Employee",Employees.getAllEmployee)
router.post("/get/Employee",Employees.getEmployee)
router.post("/update/Employee",Employees.updateEmployee)
router.post("/delete/Employee",Employees.deleteEmployee)

module.exports = router