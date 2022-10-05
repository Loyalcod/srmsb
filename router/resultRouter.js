const express = require("express")
const { createResult, getresult, getoneResult, checkResultin, updateresult, deleteresult } = require("../controllers/resultCrude")
const router = express.Router()


/* -------------------------------------------------------- result create router -------------------------------------------------------- */
router.post('/',createResult)

/* ---------------------------------------------------------- get result router --------------------------------------------------------- */
router.get('/',getresult)

/* -------------------------------------------------------- get one result router ------------------------------------------------------- */
router.get('/:resultId',getoneResult)

/* --------------------------------------------------------- check result router -------------------------------------------------------- */
router.get('/:registrationNo/:email', checkResultin)

/* ------------------------------------------------------ update one result router ------------------------------------------------------ */
router.patch('/:resultId',updateresult)

/* ------------------------------------------------------ delete one result router ------------------------------------------------------ */
router.delete('/:resultId',deleteresult)