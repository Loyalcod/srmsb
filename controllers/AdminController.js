const bcrypt = require("bcrypt")
const Admin = require("../model/AdminModel")


exports.registerAdmin = async(req,res)=>{
    if(!(req.body.fullname || req.body.username || req.body.password)) return res.status(400).json({error:"data is not properly formatted"})
    const {fullname,username,password} = req.body

    try {

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        const createAdmin = await Admin.create({
            fullname,
            username,
            password: hashedPass
        })

        res.json(createAdmin)
        
    } catch (error) {
        res.json({error:error.message})
    }
}