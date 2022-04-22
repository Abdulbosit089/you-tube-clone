import userRouter from "./routes/users.js"
import fileUpload from "express-fileupload"
import express from "express"
import cors from "cors"
import path from "path"
import os from "os"
const app = express()
import multer from 'multer'


process.IPV4 = os.networkInterfaces()['wlp1s0'][0].address

let corsConfig = {
    origin: 'https://you-tube-by-abdulbosit.herokuapp.com',
    optionsSuccessStatus: 200 
  }

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(fileUpload())
app.use( express.urlencoded({extended:true}) )
app.use(cors(corsConfig))
app.use(userRouter)


process.HOST = 'http://' + process.IPV4 + ':' + PORT;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(),'/src/uploads'))
    },
    filename: function (req, file, cb) {
        
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,   uniqueSuffix + '-' +  file.originalname)
    }
})
  
const upload = multer({ storage: storage })
app.post('/image', upload.single('avatar'), (req,res) => {
  res.send('image uploads')
})

app.post('/video', upload.single('video'), (req,res) => {
    res.send('video uploads')
  })

app.listen(PORT,console.log("Server is running on :" +process.HOST))
