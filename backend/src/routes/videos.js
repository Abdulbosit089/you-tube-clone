import controller from '../controllers/videos.js'
import { Router } from "express"

const router = Router()

router.get('/videos/:username', controller.GET)
router.get("/video/:videoname",controller.ONE)
router.post("/admin",controller.POST)

export default router