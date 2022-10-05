const student = require("../model/studentModel")
const studentClass = require("../model/studentClassModel")

exports.createStudent = async(req,res)=>{
    if(!(req.body.studentName || req.body.registrationNo || req.body.email || req.body.gender || req.body.classId || req.body.dob )) return res.status(400).send({error:"data not properly formatted"})

    const { studentName, registrationNo, email, gender, classId, dob } = req.body

    try {
        const studentExist = await student.exists({$or: [{registrationNo},{email}]})
        if(studentExist) return res.status(402).send({error:"student with the email already or reg no. already exist"})

        const createStudent = await student.create({
            studentName,
            registrationNo,
            email,
            gender,
            classId,
            dob
        })

        const updatestudentClass = await studentClass.findById(classId)
        updatestudentClass.studentId.push(createStudent._id)
        const updatedstudentClass = updatestudentClass.save()

        res.json(createStudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getStudent = async(req,res)=>{
    try {
        const getstudent = await student.find().populate('classId')
        res.json(getstudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.getoneStudent = async(req,res)=>{

    const { studentId } = req.params 

    try {
        const getonestudent = await student.findById(studentId).populate('classId')
        res.json(getonestudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.updatestudent = async(req,res)=>{
    const { studentId } = req.params 

    const { studentName, registrationNo, email, gender, classId, dob } = req.body

    try {

        const fromExistStudent = await student.findOne({_id: studentId})
        if(fromExistStudent.classId !== classId){
            
            const removeStudentinClass = await studentClass.findOneAndUpdate(
                {studentId},
                {$pull: {studentId}}
            )

            const pushstudentinClass = await studentClass.findOneAndUpdate(
                {_id: classId},
                {$push: {studentId}}
            )
        }

        const updateStudent = await student.updateOne(
            {_id: studentId},
            {$set: {
                studentName,
                registrationNo,
                email,
                gender,
                classId,
                dob
            }}            
        )

        res.json(updateStudent)

    } catch (error) {
        res.json({error:error.message})
    }
}

exports.deleteStudent = async(req,res)=>{
    
    const { studentId } = req.params

    try {
        
        const pullstudentIdfromClass = await studentClass.findOneAndUpdate(
            {studentId: studentId},
            {$pull: {studentId:studentId}}
        )

        const deletestudent = await student.deleteOne({_id:studentId})
        res.json(deletestudent)
        
    } catch (error) {
        res.json({error:error.message})
    }
}