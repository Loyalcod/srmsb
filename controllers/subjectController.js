const subject = require("../model/subjectModel")


exports.createSubject = async(req,res)=>{
    if(!(req.body.subjectName || req.body.subjectCode)) return res.status(400).json({error:"data not properly formatted"})
    const { subjectName, subjectCode } = req.body

    try {

        const subjectExist = await subject.exists({$or: [{subjectName},{subjectCode}]})
        if(subjectExist) return res.status(400).json({error:"subject already exist"})
        const newsubject = new subject ({
            subjectName,
            subjectCode,
        })

        const saveSubject = newsubject.save()
        res.json(newsubject)
        
    } catch (error) {
        res.json({error:error.message})
    }
}


exports.getSubject = async(req,res)=>{
    try {
        const getsubjectall = await subject.find()
        res.json(getsubjectall)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getoneSubject = async(req,res)=>{
    const { subjectId } = req.params 

    try {
        const getonesbj = await subject.findById(subjectId)
        res.json(getonesbj)

    } catch (error) {
        res.json({error:error.message})
    }

}

exports.updateOnesubject = async(req,res)=>{
    const { subjectId } = req.params

    const subjectName = req.body.subjectName != ""? req.body.subjectName : subject.subjectName
    const subjectCode = req.body.subjectCode != ""? req.body.subjectCode : subject.subjectCode

    try {
        const updateOnesbj = await subject.updateOne(
            {_id: subjectId},
            {$set: {subjectName,subjectCode}}
        )

        res.json(updateOnesbj)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteSubject = async(req,res)=>{
    const {subjectId } = req.params

    try {
        
        const deleteSubjectone = await subject.deleteOne({_id:subjectId})
        res.json(deleteSubjectone)
        
    } catch (error) {
        res.json({error:error.message})
    }
}