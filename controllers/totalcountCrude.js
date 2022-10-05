const resultModel = require("../model/resultModel");
const studentClassModel = require("../model/studentClassModel");
const studentModel = require("../model/studentModel");
const subjectModel = require("../model/subjectModel");

exports.totalcount = async(req,res)=>{
    try {
        const studentCount = await studentModel.count()
        const resultCount = await resultModel.count()
        const studentClassCount = await studentClassModel.count()
        const subjectCount = await subjectModel.count()

        res.json({
            studentCount,
            subjectCount,
            resultCount,
            studentClassCount
        })

    } catch (error) {
        res.json({error:error.message})
    }
}
