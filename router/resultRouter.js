const express = require("express")
const { createResult, getresult, getoneResult, checkResultin, updateresult, deleteresult } = require("../controllers/resultCrude")
const verifyAuthentication = require("../middlewares/Authmiddlewares")
const router = express.Router()




/* -------------------------------------------------------- result create router -------------------------------------------------------- */
router.post('/',verifyAuthentication, createResult)

/* ---------------------------------------------------------- get result router --------------------------------------------------------- */
router.get('/',verifyAuthentication, getresult)

/* -------------------------------------------------------- get one result router ------------------------------------------------------- */
router.get('/:resultId',verifyAuthentication, getoneResult)

/* --------------------------------------------------------- check result router -------------------------------------------------------- */
router.get('/:registrationNo/:email', checkResultin)

/* ------------------------------------------------------ update one result router ------------------------------------------------------ */
router.patch('/:resultId',verifyAuthentication, updateresult)

/* ------------------------------------------------------ delete one result router ------------------------------------------------------ */
router.delete('/:studentId/:subjectId/:resultId',verifyAuthentication, deleteresult)

module.exports = router