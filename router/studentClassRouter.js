const express = require("express")
const { studentclassCreate, getStudentClass, getOneStudentClass, updateStudentClass, deleteOneClass } = require("../controllers/studentClassCrude")
const router = express.Router()




/* ----------------------------------------------------- student class create router ---------------------------------------------------- */
router.post('/',studentclassCreate)

/* ------------------------------------------------------ get student class router ------------------------------------------------------ */
router.get('/',getStudentClass)

/* ---------------------------------------------------- get one student class router ---------------------------------------------------- */
router.get('/:classId',getOneStudentClass)

/* --------------------------------------------------- update one student class router -------------------------------------------------- */
router.patch("/:classId",updateStudentClass)

/* ----------------------------------------------------- delete student class router ---------------------------------------------------- */
router.delete('/:classId',deleteOneClass)



module.exports = router