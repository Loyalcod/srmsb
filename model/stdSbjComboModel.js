const mongoose = require("mongoose")

const stdsbjComboSchema = mongoose.Schema({
    studentId: {type: mongoose.Types.ObjectId, ref: 'student'},
    subjectId: {type: mongoose.Types.ObjectId, ref: 'subject'},

    status: {
        type: Boolean,
        default: 1
    }
},{timestamps: true})

const stdsbjComboModel = mongoose.model('combo',stdsbjComboSchema)


module.exports = stdsbjComboModel