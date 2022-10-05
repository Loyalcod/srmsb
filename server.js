/* -------------------------------------------------------- IMPORT EXPRESS MODULE ------------------------------------------------------- */
const express = require("express")
const server = express()
const cors = require("cors")
const corsOption = require('./config/corsOption')
const credential = require("./middlewares/credentials")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const path = require("path")
const connectDB = require("./config/db")
require("dotenv").config({path: path.resolve(__dirname,'./.env')})

connectDB()
server.use(credential)
server.use(cors(corsOption))

const port = process.env.PORT 

server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(cookieParser())

server.get('/',(req,res)=>{
    res.send("this is the server side")
})

/* ------------------------------------------------------------ Admin router ------------------------------------------------------------ */
const AdminRouter = require("./router/AdminRouter")
server.use('/admin',AdminRouter)

/* --------------------------------------------------------- result crude router -------------------------------------------------------- */
const resultRouter = require("./router/resultRouter")
server.use('/result',resultRouter)

const verifyAuthentication = require("./middlewares/Authmiddlewares")
server.use(verifyAuthentication)

/* -------------------------------------------------------- student class router -------------------------------------------------------- */
const studentClassRouter = require("./router/studentClassRouter")
server.use('/studentClass',studentClassRouter)

/* -------------------------------------------------------- student crude router -------------------------------------------------------- */
const studentRouter = require("./router/studentRouter")
server.use('/student',studentRouter)

/* -------------------------------------------------------- subject crude router -------------------------------------------------------- */
const subjectRouter = require("./router/subjectRouter")
server.use('/subject',subjectRouter)


/* ---------------------------------------------- student subject combination crude router ---------------------------------------------- */
const stdSbjComboRouter = require("./router/stdSbjComboRouter")
server.use('/combo',stdSbjComboRouter)

const totalCountRounter = require("./router/totalcountRouter")
server.use("/total", totalCountRounter)

server.listen(port,()=>{
    console.log("this server is running")
})