const express = require("express")
const { totalcount } = require("../controllers/totalcountCrude")
const router = express.Router()


/* --------------------------------------------------------- total count router --------------------------------------------------------- */
router.get('/',totalcount)



module.exports = router