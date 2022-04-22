import fileUpload from "express-fileupload"
import express from 'express'

import os from 'os';
import path from "path";


const PORT = "https://you-tube-by-abdulbosit.herokuapp.com";

process.IPV4 = os.networkInterfaces()['wlp1s0'][0].address
process.HOST = 'http://' + process.IPV4 + ':' + PORT;

const app = express()

app.use(express.json())
app.use(express.text())
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(), 'public')))
app.use( express.urlencoded({extended:true}) )

app.get("/",(req,res)=>{
    res.sendFile(path.join(process.cwd(),"public","views","index.html"))
})

app.post("/saveImage",(req,res)=>{
    console.log(req.files)
    res.send("ok")
})

app.get("/register",(req,res)=>{
    res.sendFile(path.join(process.cwd(),"public","views","register.html"))
})
app.get("/admin",(req,res)=>{
    res.sendFile(path.join(process.cwd(),"public","views","admin.html"))
})
app.listen(PORT,()=>console.log("Server is running on:" + process.HOST))


