const express = require("express")
const router = express.Router()
const masterData = require("../controllers/masterData.controller")

router.post("/create/MasterData",masterData.createMasterData)
router.post("/getAll/MasterData",masterData.getAllMasterData)
router.post("/getAll/CodeIdData",masterData.getAllCodeId)
router.post("/update/MasterData",masterData.updateMasterData)

module.exports = router
