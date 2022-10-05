const express = require("express")
const { createCombo, getCombo, getOnecombo, ToggolStatusCombo, deleteOneCombo } = require("../controllers/stdSbjComboCrude")
const router = express.Router()


/* ---------------------------------------------- combination of student and subject router --------------------------------------------- */
router.post('/',createCombo)

/* --------------------------------------------- get all student subject combination router --------------------------------------------- */
router.get('/',getCombo)

/* --------------------------------------------- get one student subject combination router --------------------------------------------- */
router.get('/:comboId',getOnecombo)

/* ---------------------------------------- toggole one student subject combination status router --------------------------------------- */
router.get('/specific/:comboId',ToggolStatusCombo)

/* ---------------------------------------- delete one student subject combination status router ---------------------------------------- */
router.delete('/:studentId/:subjectId/:comboId',deleteOneCombo)





module.exports = router