const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/database')
const masterData = require('../models/masterData')

exports.createMasterData = async(req, res, next)=> {
    try{
        const { codeType, systemCode, systemCodeDesc } = req.body

        if(!codeType ||  !systemCode || !systemCodeDesc){
            return res.status(201).json({
                error : true,
                message : "All Feilds Are Required."
            })
        }

        const codeId = codeType.trim("").slice(0,3).toUpperCase()

        const checkExist = await masterData.findOne({
            where : {
                [Op.and] : [
                    { codeType },
                    { systemCode }
                ]
            }
        })

        if(checkExist && checkExist.isActive == 1){
            return res.status(200).json({
                error : true,
                message : `System Code ${systemCode} Is Already Created For the CodeType ${codeType}`
            })
        } else if(checkExist && checkExist.isActive == 0){
            const update = await masterData.update({
                isActive : 1, isDeleted : 0
            }, {
                where : {
                    [Op.and] : [
                        { codeType },
                        { systemCode }
                    ]
                }
            })

            return res.status(200).json({
                error : false,
                message : `Updated Successfully.`
            })
        } else if(!checkExist){
            const create = await masterData.create({
                codeType, codeDesc : codeType , systemCode, systemCodeDsesc : systemCodeDesc, codeId
            })

            return res.status(200).json({
                error : false,
                message : `Created Successfully.`
            })
        }

    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.getAllMasterData = async(req,res,next)=> {
    try{
        const getAll = await masterData.findAll({
            where : {
                isActive : 1
            },
            order : [['id','DESC']]
        })

        return res.status(201).json({
            error : false,
            message : "List Fetched Successfully.",
            result : getAll
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.getAllCodeId = async(req,res,next)=> {
    try{

        let { codeId, systemCode } = req.body

        if(!codeId){
            return res.status(201).json({
                error : true,
                message : "codeId And systemCode Are Required."
            })
        }

        systemCode = systemCode ? { systemCode } : undefined

        const getAll = await masterData.findAll({
            where : {
                [Op.and] : [
                    {isActive : 1},
                    {codeId},
                    systemCode
                ]
            }
        })

        return res.status(201).json({
            error : false,
            message : "List Fetched Successfully.",
            result : getAll,
            count : getAll.length
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}

exports.updateMasterData = async(req,res,next)=> {
    try{

        const { codeId, systemCode, systemCodeDesc } = req.body

        if(!codeId ||  !systemCode || !systemCodeDesc){
            return res.status(201).json({
                error : true,
                message : "All Fields Are Required."
            })
        }

        const data = await masterData.findOne({
            where : {
                [Op.and] : [
                    {isActive : 1},
                    {codeId},
                    {systemCode}
                ]
            }
        })

        if(data){
            return res.status(201).json({
            error : true,
            message : "SystemCode Is Already Created."
        })
        }

        const find = await masterData.findOne({
            where : {
                codeId
            },
            order : [['id','DESC']]
        })

        const update = await masterData.create({
            codeId, codeType : find?.codeType , codeDesc : find?.codeDesc,
            systemCode, systemCodeDsesc : systemCodeDesc
        })

        return res.status(201).json({
            error : false,
            message : "Updated Sucessfully."
        })
    } catch(error){
        console.log(error)
        next(error)
    }
}