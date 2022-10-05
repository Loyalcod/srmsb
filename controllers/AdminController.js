const bcrypt = require("bcrypt")
const Admin = require("../model/AdminModel")
const jwt = require("jsonwebtoken")


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

exports.loginAdmin =async(req,res)=>{
    if(!(req.body.username || req.body.password)) return res.status(400).json({error:"data not properly formatted"})
    const {username,password} = req.body

    try {
        const admin = await Admin.findOne({username})
        if(admin){
            const validatePass = await bcrypt.compare(password,admin.password)
            if(!validatePass) return res.status(401).json({error:"access denied"})
        }
        const accessToken = jwt.sign({_id:admin._id, username:admin.username}, process.env.ACCESS_JWT_SECRET, {expiresIn: "10m"})
        const refreshToken = jwt.sign({_id: admin._id, username: admin.username}, process.env.REFRESH_JWT_SECRET, {expiresIn: '24h'})

        const storeRefreshToken = await Admin.updateOne(
            {username},
            {$set: {refreshToken}}
        )

        const refreshCookie = res.cookie('jwt',refreshToken,{httpOnly: true, sameSite: 'none', maxAge: 24*60*60*1000})
        console.log(refreshCookie)

        res.json({
            accessToken,
            refreshToken
        })
        
    } catch (error) {
        res.json({error:error.message})

    }
}