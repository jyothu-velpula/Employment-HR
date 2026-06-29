const express = require("express");

const router = express.Router();

const LeaveController = require("../controllers/leave.controller");

router.post("/Create/Leave", LeaveController.createLeave);

router.post("/GetAll/Leave", LeaveController.getAllLeave);

router.post("/Get/Leave", LeaveController.getLeave);

router.post("/Update/Leave", LeaveController.updateLeave);

router.post("/Delete/Leave", LeaveController.deleteLeave);

router.post("/Approve/Leave", LeaveController.approveLeave);

module.exports = router;