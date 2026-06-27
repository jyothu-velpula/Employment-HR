const { Model, Op } = require("sequelize")
const Employees = require("../models/employee")

exports.createEmployee = async(req, res, next)=> {
    try{
        const { employeeName, email, mobileNo, employeeCode, userId, department, designation, status, gender, salary } = req.body
        let employeeId;
        const checkExist = await Employees.findOne({
            where : {
                [Op.or]: [
                    { email },
                    { mobileNo }
                ]
            }
        })

        if(checkExist){
            return res.status(200).json({
                error : true,
                message : "Employee Already Exists."
            })
        }

        const lastEmp = await Employees.findOne({
            order : [['id','DESC']]
        })

        if(lastEmp){
            const lastCount = lastEmp.id + 1
            employeeId = "EMP000"+ lastCount 
        } else {
            employeeId = "EMP0001"
        }

        const create = await Employees.create({
            employeeName, email, mobileNo, employeeCode, salary,
            userId, department, designation, status, employeeId, gender
        })

        return res.status(201).json({
            error : false,
            message : "Employee Created Successfully.",
            result : create
        })

    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.getAllEmployee = async (req, res, next) => {
    try {

        let department;
        let designation;

        if (req.body) {
            department = req.body.department
            designation = req.body.designation
        }

        department = department ? { department } : undefined
        designation = designation ? { designation } : undefined
        const allEmp = await Employees.findAll({
            where: {
                [Op.and]: [
                    { isActive: 1 },
                    department,
                    designation
                ]
            }
        })

        if (allEmp.length == 0) {
            return res.status(200).json({
                errror: true,
                message: "No Data Found."
            })
        }

        return res.status(201).json({
            error: false,
            message: "List Fetched Successfully.",
            result: allEmp,
            count: allEmp.length
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.getEmployee = async(req, res, next)=> {
    try{

        const { id } = req.body
        const checkEmp = await Employees.findOne({
            where : { id }
        })

        if(!checkEmp){
            return res.status(200).json({
                errror : true,
                message : "No Data Found."
            })
        }

        return res.status(201).json({
            error : false,
            message : "Employee Details Fetched Successfully.",
            result : checkEmp
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.updateEmployee = async(req, res, next)=> {
    try{

        const { id, status } = req.body
        const checkEmp = await Employees.findOne({
            where : { id }
        })

        if(!checkEmp){
            return res.status(200).json({
                errror : true,
                message : "No Data Found."
            })
        }

        const update = await Employees.update({
            status
        },{
            where : { id }
        })

        return res.status(201).json({
            error : false,
            message : "Employee Details Fetched Successfully.",
            result : update
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.deleteEmployee = async(req, res, next)=> {
    try{

        const { id, status } = req.body
        const checkEmp = await Employees.findOne({
            where : { id }
        })

        if(!checkEmp){
            return res.status(200).json({
                errror : true,
                message : "No Data Found."
            })
        }

        const update = await Employees.update({
            isActive : 0,
            isDeleted : 1
        },{
            where : { id }
        })

        return res.status(201).json({
            error : false,
            message : "Employee Details Fetched Successfully.",
            result : update
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}