import { Router } from 'express'
import { profile } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.get('/profile', authRequired, profile)

export default router
