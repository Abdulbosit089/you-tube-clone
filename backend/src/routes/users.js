import validation from '../middlewares/validation.js'
import controller from '../controllers/user.js'
import { Router } from "express"

const router = Router()

router.post('/register', validation,controller.REGISTER)
router.post('/login',validation ,controller.LOGIN)
router.get('/users', controller.GET)
router.get('/userscheck', validation,controller.CHECK)

export default router