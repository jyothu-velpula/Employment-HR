const { Op, Sequelize } = require("sequelize");
const { Leave, Employees, masterData } = require("../models");

/*
========================================
Create Leave
========================================
*/
exports.createLeave = async (req, res, next) => {
    try {

        const {
            employee,
            userId,
            leaveType,
            fromDate,
            toDate,
            reason
        } = req.body;

        if (
            !employee ||
            !userId ||
            !leaveType ||
            !fromDate ||
            !toDate ||
            !reason
        ) {
            return res.status(200).json({
                error: true,
                message: "All Fields Are Required."
            });
        }

        const employees = await Employees.findOne({
            where: {
                employeeId : employee,
                isActive: 1
            }
        });

        if (!employees) {
            return res.status(200).json({
                error: true,
                message: "Employee Not Found."
            });
        }

        const start = new Date(fromDate);
        const end = new Date(toDate);

        if (start > end) {
            return res.status(200).json({
                error: true,
                message: "From Date cannot be greater than To Date."
            });
        }

        // Check overlapping leave
        const checkLeave = await Leave.findOne({
            where: {
                employeeId : employee,
                isActive: 1,
                status: {
                    [Op.ne]: "Rejected"
                },
                [Op.or]: [
                    {
                        fromDate: {
                            [Op.between]: [fromDate, toDate]
                        }
                    },
                    {
                        toDate: {
                            [Op.between]: [fromDate, toDate]
                        }
                    },
                    {
                        [Op.and]: [
                            {
                                fromDate: {
                                    [Op.lte]: fromDate
                                }
                            },
                            {
                                toDate: {
                                    [Op.gte]: toDate
                                }
                            }
                        ]
                    }
                ]
            }
        });

        if (checkLeave) {
            return res.status(200).json({
                error: true,
                message: "Leave Already Applied for selected dates."
            });
        }

        const totalDays =
            Math.ceil(
                (end.getTime() - start.getTime()) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        const leave = await Leave.create({
            employeeId : employee,
            userId,
            leaveType,
            fromDate,
            toDate,
            totalDays,
            reason,
            status: "Pending"
        });

        return res.status(201).json({
            error: false,
            message: "Leave Applied Successfully.",
            result: leave
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};


/*
========================================
Get All Leaves
========================================
*/

exports.getAllLeave = async (req, res, next) => {

    try {

        let employeeId;
        let status;

        if (req.body) {
            employeeId = req.body.employeeId;
            status = req.body.status;
        }

        employeeId = employeeId ? { employeeId } : undefined;
        status = status ? { status } : undefined;

        const leaves = await Leave.findAll({

            where: {

                [Op.and]: [

                    { isActive: 1 },

                    employeeId,

                    status

                ]

            },
            include : [
                {
                    model : Employees,
                    as : "employeeDetails",
                    attributes : [],
                    required : false,
                    include : [
                        {
                            model : masterData,
                            as : "getDepart",
                            required : false,
                            attributes : [],
                            where : {
                                codeId : "DEP"
                            }
                        }
                    ]
                }
            ],
            attributes : {
                include : [
                    [Sequelize.col("employeeDetails.employeeName"), "employeeName"],
                    [Sequelize.col("employeeDetails.getDepart.systemCodeDsesc"), "department"],
                ]
            },

            order: [["id", "DESC"]]

        });

        if (leaves.length == 0) {

            return res.status(200).json({

                error: true,

                message: "No Data Found."

            });

        }

        return res.status(201).json({

            error: false,

            message: "Leave List Fetched Successfully.",

            result: leaves,

            count: leaves.length

        });

    } catch (error) {

        console.log(error);

        next(error);

    }

};


/*
========================================
Get Leave
========================================
*/

exports.getLeave = async (req, res, next) => {

    try {

        const { id } = req.body;

        const leave = await Leave.findOne({

            where: {

                id,

                isActive: 1

            }

        });

        if (!leave) {

            return res.status(200).json({

                error: true,

                message: "Leave Not Found."

            });

        }

        return res.status(201).json({

            error: false,

            message: "Leave Details Fetched Successfully.",

            result: leave

        });

    } catch (error) {

        console.log(error);

        next(error);

    }

};


/*
========================================
Update Leave
========================================
*/

exports.updateLeave = async (req, res, next) => {

    try {

        const {

            id,

            leaveType,

            fromDate,

            toDate,

            reason

        } = req.body;

        const leave = await Leave.findOne({

            where: {

                id,

                isActive: 1

            }

        });

        if (!leave) {

            return res.status(200).json({

                error: true,

                message: "Leave Not Found."

            });

        }

        const start = new Date(fromDate);

        const end = new Date(toDate);

        const totalDays =
            Math.ceil(
                (end - start) /
                (1000 * 60 * 60 * 24)
            ) + 1;

        await Leave.update({

            leaveType,

            fromDate,

            toDate,

            totalDays,

            reason

        }, {

            where: {

                id

            }

        });

        return res.status(201).json({

            error: false,

            message: "Leave Updated Successfully."

        });

    } catch (error) {

        console.log(error);

        next(error);

    }

};


/*
========================================
Approve / Reject Leave
========================================
*/

exports.approveLeave = async (req, res, next) => {

    try {

        const {

            id,

            status,

            approvedBy,

            remarks

        } = req.body;

        const leave = await Leave.findOne({

            where: {

                id,

                isActive: 1

            }

        });

        if (!leave) {

            return res.status(200).json({

                error: true,

                message: "Leave Not Found."

            });

        }

        await Leave.update({

            status,

            approvedBy,

            approvedDate: new Date(),

            remarks

        }, {

            where: {

                id

            }

        });

        return res.status(201).json({

            error: false,

            message:
                status == "Approved"
                    ? "Leave Approved Successfully."
                    : "Leave Rejected Successfully."

        });

    } catch (error) {

        console.log(error);

        next(error);

    }

};


/*
========================================
Delete Leave
========================================
*/

exports.deleteLeave = async (req, res, next) => {

    try {

        const { id } = req.body;

        const leave = await Leave.findOne({

            where: {

                id

            }

        });

        if (!leave) {

            return res.status(200).json({

                error: true,

                message: "Leave Not Found."

            });

        }

        await Leave.update({

            isActive: 0,

            isDeleted: 1

        }, {

            where: {

                id

            }

        });

        return res.status(201).json({

            error: false,

            message: "Leave Deleted Successfully."

        });

    } catch (error) {

        console.log(error);

        next(error);

    }

};