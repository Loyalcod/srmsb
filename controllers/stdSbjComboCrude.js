const combo = require("../model/stdSbjComboModel")
const studentModel = require("../model/studentModel")
const subjectModel = require("../model/subjectModel")


exports.createCombo = async(req,res)=>{
    const {studentId, subjectId }= req.body

    try {
        const comboExist = await studentModel.findById(studentId)
        if(comboExist.subjectId.includes(subjectId)){
            return res.status(400).json({error:"the student subject combination have been decleared already"})
        }
        const comboCreate = await combo.create({
            studentId,
            subjectId
        })

        const pushSubjectinStudent = await studentModel.findOneAndUpdate(
            {_id:studentId},
            {$push: {subjectId: subjectId}}
        )

        const pushStudentinSubject = await subjectModel.findOneAndUpdate(
            {_id: subjectId},
            {$push: {studentId: studentId}}
        )

        res.json(comboCreate)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getCombo = async(req,res)=>{
    try {
        const getallcombo = await combo.find()
        .populate({
            path: 'studentId',
            populate: {
                path:'classId' 
            }
        }).populate('subjectId')
        res.json(getallcombo)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOnecombo = async(req,res)=>{
    const { comboId } = req.params 

    try {
        const getonecombo = await combo.findById(comboId)
        .populate('studentId').populate('subjectId')
        res.json(getonecombo)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.ToggolStatusCombo = async(req,res)=>{
    const { comboId } = req.params

    try {
        const getStatusforToggole = await combo.findById(comboId).select('status')
        let realStatus = getStatusforToggole.status

        realStatus === true? realStatus = false : realStatus = true
        const ToggoleStatus =await combo.updateOne(
            {_id: comboId},
            {$set: {status:realStatus}}
        )
        res.json(ToggoleStatus)
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteOneCombo = async(req,res)=>{
    const { comboId, studentId, subjectId } = req.params

    try {

        const pullSubjectinStudent = await studentModel.findOneAndUpdate(
            {_id:studentId},
            {$pull: {subjectId: subjectId}}
        )

        const pullStudentinSubject = await subjectModel.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {studentId: studentId}}
        )

        const deletecomboOne = await combo.deleteOne({_id: comboId})
        
        res.json(deletecomboOne)
        
    } catch (error) {
        res.json({error:error.message})
    }
}


