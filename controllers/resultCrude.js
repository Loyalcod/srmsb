const result = require("../model/resultModel")
const student = require("../model/studentModel")
const subject = require("../model/subjectModel")



exports.createResult = async(req,res)=>{
    if(!(req.body.studentId || req.body.subjectId || req.body.classId || req.body.mark)) return res.status(400).json({error:"data not properly formatted"})
    const { studentId, subjectId, classId, mark } = req.body

    try {
        const resultExsit = await result.exists({studentId, subjectId, classId})
        if(resultExsit) return res.status(401).json({error:"result already decleared for student"})

        const createResult = await result.create({
            studentId,
            subjectId,
            classId,
            mark
        })

        const pushResultinStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$push: {resultId: createResult._id}}
        )

        const pushResultinSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$push: {resultId: createResult._id}}
        )

        res.json(createResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getresult = async(req,res)=>{
    try {
        const getResult = await result.find()
        .populate('studentId').populate('subjectId').populate('classId')
        res.json(getResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getoneResult = async(req,res)=>{
    const { resultId } = req.params 

    try {
        const getoneresult = await result.findById(resultId)
        .populate('studentId').populate('subjectId').populate('classId')
        res.json(getoneresult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.checkResultin = async(req,res) =>{
    const {registrationNo,email} = req.params 

    try {

        const resultExist = await student.exists({email, registrationNo})
        if(!resultExist) return res.status(401).json("result don't exist")

        const checkesult = await student.find({email,registrationNo})
        .populate('classId')
        .populate({
            path: 'resultId',
            populate:{
                path: 'subjectId'
            }
        })

        res.json(checkesult)
        
    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateresult = async(req,res)=>{
    const { resultId } = req.params 

    const mark = req.body.mark !=''? req.body.mark : result.mark

    try {

        const updateResult = await result.updateOne(
            {_id: resultId},
            {$set: {mark}}
        )
        
        res.json(updateResult)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteresult = async(req,res)=>{
    const {resultId, studentId, subjectId} = req.params

    try {
        const removeResultIdFromStudent = await student.findOneAndUpdate(
            {_id: studentId},
            {$pull: {resultId}}
        )

        const removeResultIdfromSubject = await subject.findOneAndUpdate(
            {_id: subjectId},
            {$pull: {resultId}}
        )

        const deleteResult = await result.deleteOne({_id: resultId})
        res.json(deleteResult)
    } catch (error) {
        res.json({error:error.message})
    }
}