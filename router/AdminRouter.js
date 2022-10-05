const express = require("express")
const { registerAdmin, loginAdmin, refreshLoginAdmin, logoutAdmin } = require("../controllers/AdminController")
const router = express.Router()


/* -------------------------------------------------------- register admin router ------------------------------------------------------- */
router.post('/',registerAdmin)

/* --------------------------------------------------------- login admin router --------------------------------------------------------- */
router.post('/login',loginAdmin)

/* ----------------------------------------------------- refresh login admin router ----------------------------------------------------- */
router.get('/refresh',refreshLoginAdmin)

/* --------------------------------------------------------- logout admin router -------------------------------------------------------- */
router.get('/logout',logoutAdmin)

module.exports = router
