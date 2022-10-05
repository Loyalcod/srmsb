const mongoose = require("mongoose")


const AdminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        dropDups: [true,'user already exist']
    },

    password: {
        type: String,
        required: true
    }
},{timestamps: true})


module.exports = mongoose.model('admin',AdminSchema)