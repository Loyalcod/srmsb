const express = require("express")
const { registerAdmin } = require("../controllers/AdminController")
const router = express.Router()


/* -------------------------------------------------------- register admin router ------------------------------------------------------- */
router.post('/',registerAdmin)



module.exports = router
