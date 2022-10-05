const AllowedOrigin = require('./allowedOrigin')

const corsOption = {

    origin: (origin,callback)=>{
        if(AllowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("not allowed cors"))
        }
    },
    optionSuccessStatus: 200
    
}

module.exports = corsOption