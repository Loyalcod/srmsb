const express = require("express")
const { createSubject, getSubject, getoneSubject, updateOnesubject, deleteSubject } = require("../controllers/subjectController")
const router = express.Router()



/* -------------------------------------------------------- create subject router ------------------------------------------------------- */
router.post('/',createSubject)

/* --------------------------------------------------------- get subject router --------------------------------------------------------- */
router.get('/',getSubject)

/* ------------------------------------------------------- get one subject router ------------------------------------------------------- */
router.get('/:subjectId',getoneSubject)

/* ------------------------------------------------------ update one subject router ----------------------------------------------------- */
router.patch('/:subjectId',updateOnesubject)

/* ------------------------------------------------------ delete one subject router ----------------------------------------------------- */
router.delete('/:subjectId',deleteSubject)


module.exports = router