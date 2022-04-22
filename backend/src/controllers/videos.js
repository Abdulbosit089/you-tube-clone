import fs from "fs"
import path from 'path'
const videosPath = path.join(process.cwd(),"src","db","videos.json")
const GET = (req,res,next)=>{
    try {
        const videos  = fs.readFileSync(videosPath) 
        if(req.params.videoname){
            return res.send(videos.filter(el=> el.videoname == req.params.videoname))
        }

        res.send(videos)

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

const POST = (req,res,next)=>{
    try {
        const users = JSON.parse(fs.readFileSync(videosPath))
        console.log(req.files.file.data)
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

const ONE = async (req,res,next)=>{
    try {
        const videos  = fs.readFileSync(videosPath) 

        video = videos.filter(el=> el.videoname == req.params.videoname)

        return res.sendFile(path.join(process.cwd(),"src","uploads",video.videoname))

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}

export default {
    GET, POST , ONE
}