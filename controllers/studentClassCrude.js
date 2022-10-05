const studentClass = require("../model/studentClassModel")


exports.studentclassCreate = async(req,res)=>{
    if(!(req.body.className || req.body.grade)) return res.status(400).send({error:"data not properly formatted"})
    const {className,grade} = req.body

    try {
        const classExist = await studentClass.exists({className})
        if(classExist) return res.status(403).send({error:"class already exist"})
        const createClass = await studentClass.create({
            className,
            grade
        })

        res.json(createClass)

    } catch (error) {
        res.json({error:error.message})
    }
}


exports.getStudentClass = async(req,res)=>{
    try {
        const getClass = await studentClass.find()
        res.json(getClass)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getOneStudentClass = async(req,res)=>{
    const {classId} = req.params 

    try {
        const getoneClass = await studentClass.findById(classId)
        res.json(getoneClass)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updateStudentClass = async(req,res)=>{
    const { classId } = req.params

    const className = req.body.className !=''? req.body.className : studentClass.className
    const grade = req.body.grade !=''? req.body.grade : studentClass.grade

    try {
        const updateClass = await studentClass.updateOne(
            {_id:classId},
            {$set: {className,grade}}
        )
        res.json(updateClass)

    } catch (error) {
        res.json({error:error.message})
    }


}

exports.deleteOneClass = async(req,res)=>{
    const { classId } = req.params 

    try {
        const deleteonestudentClass = await studentClass.deleteOne({_id:classId})
        res.json(deleteonestudentClass)
        
    } catch (error) {
        res.json({error:error.message})
    }
}