const express = require("express")
const { registerAdmin, loginAdmin } = require("../controllers/AdminController")
const router = express.Router()


/* -------------------------------------------------------- register admin router ------------------------------------------------------- */
router.post('/',registerAdmin)

/* --------------------------------------------------------- login admin router --------------------------------------------------------- */
router.post('/login',loginAdmin)



module.exports = router
