const express = require("express")
const { createStudent, getStudent, getoneStudent, updatestudent, deleteStudent } = require("../controllers/studentController")
const router = express.Router()




/* -------------------------------------------------------- student class router -------------------------------------------------------- */
router.post('/',createStudent)

/* --------------------------------------------------------- get student router --------------------------------------------------------- */
router.get('/',getStudent)

/* ------------------------------------------------------- get one student router ------------------------------------------------------- */
router.get('/:studentId',getoneStudent)

/* -------------------------------------------------------- update student router ------------------------------------------------------- */
router.patch('/:studentId',updatestudent)

/* -------------------------------------------------------- delete student router ------------------------------------------------------- */
router.delete('/:studentId',deleteStudent)


module.exports = router