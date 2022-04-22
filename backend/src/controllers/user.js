import { AuthorizationError, InternalServerError } from '../utils/errors.js'
import JWT from '../utils/jwt.js'
import sha256 from 'sha256'
import fs from "fs"
import path from 'path'
const usersPath = path.join(process.cwd(),"src","db","users.json")
const GET = (req, res, next) => {
    try {

        const users = JSON.parse(fs.readFileSync(path.join(process.cwd(),"src","db","users.json")))
        users.map(el=>{
            delete el.token
             delete el.password
        })

        res.send(users)

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}


const LOGIN = (req, res, next) => {
    try {
        const { username, password ,token } = req.body

        const users = JSON.parse(fs.readFileSync(usersPath))
        const user = users.find(user => user.username == username && user.password == sha256(password))

        if (!user) {
            return next(new AuthorizationError(400, "Wrong username or password!"))
        }

        delete user.password

        return res.status(200).json({
            status: 200,
            message: "The user successfully logged in!",
            token: JWT.sign({ userId: user.userId, agent: req.headers['user-agent'], ip: req.ip }),
            data: user
        })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}


const REGISTER = (req, res, next) => {
    try {
        const users = JSON.parse(fs.readFileSync(usersPath))
        console.log(typeof req.files.file.data)
        if(!req.body.password || !req.body.username || !req.body.imgName){
            return next(new AuthorizationError(400, "Invalid request!"))
        }

        req.body.userId = users.length ? users.at(-1).userId + 1 : 1
        if(req.body.password.length>16 || req.body.password.length<8){
            return next(new AuthorizationError(400, "Incorrect password length!"))
        }

        req.body.password = sha256(req.body.password)

        const user = users.find(user => user.username == req.body.username)
        if (user) {
            return next(new AuthorizationError(400, "The user already exists!"))
        }
        req.body.token = JWT.sign({ userId: req.body.userId, agent: req.headers['user-agent'], ip: req.ip })
        
        users.push(req.body)
        fs.writeFileSync(usersPath, JSON.stringify(users,null,4))

        fs.writeFileSync(path.join(process.cwd(),"src","uploads",req.files.file.name),req.files.file.data)

        fs.writeFileSync(path.join(process.cwd(),"src","db","tokens.json"),{ "device" :req.body.device, "token" : req.body.token })

        delete req.body.password

        return res.status(200).json({
            status: 200,
            message: "The user successfully registered!",
            token: JWT.sign({ userId: req.body.userId, agent: req.headers['user-agent'], ip: req.ip }),
            data: req.body
        })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const CHECK = async (req,res)=>{
    try {

        const users = JSON.parse(fs.readFileSync(path.join(process.cwd(),"src","db","users.json")))
        users.map(el=>{
            delete el.token
             delete el.password
        })

        res.send(users)

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}
export default {
    LOGIN, REGISTER, GET,CHECK
}