const Sequelize = require('sequelize')
const db = require('../config/database')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const { Employees } = require('../models')
const Op = Sequelize.Op

exports.RegisterUser = async (req, res, next) => {
    try {
        const { name, role, userType, gender, email, password } = req.body
        let loginId;
        const checkExist = await User.findOne({
            where: { email }
        })

        if (checkExist) {
            return res.status(201).json({
                error: true,
                message: "User Already Exists..!"
            })
        }

        const hsahPawword = await bcrypt.hash(password, 10)

        const count = await User.findOne({
            order : [['id','DESC']]
        })
        if(count){
            let lastCount = count.id + 1
            loginId = `OWN000`+lastCount
        } else {
            loginId = "OWN0001"
        }

        const create = await User.create({
            name, role, email, password: hsahPawword, encryptPassword: hsahPawword, userType, gender, loginId
        })

        return res.status(201).json({
            error: false,
            message: "User Resigration Is Successful.",
            details: create
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const checkExist = await User.findOne({
            where: {
                [Op.and]: [
                    { email },
                    { isActive: 1 }
                ]
            },
            include : [
                {
                    model : Employees,
                    as : "getEmpdetails",
                    attributes : [],
                    required : false 
                }
            ],
            attributes : {
                include : [
                    [Sequelize.col("getEmpdetails.employeeId"), "employeeId"],
                    [Sequelize.col("getEmpdetails.employeeName"), "employeeName"]
                ]
            }
        })

        if (!checkExist) {
            return res.status(201).json({
                error: true,
                message: "User Not Found..!"
            })
        }

        const matchPawword = await bcrypt.compare(password, checkExist.password)
        console.log("matchPawword", matchPawword, req.body)

        if (!matchPawword) {
            return res.status(201).json({
                error: true,
                message: "Invalid Password / Email or Password is Wrong..!"
            })
        } else {
            return res.status(201).json({
                error: false,
                message: "Login Is Successful.",
                details: checkExist
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}