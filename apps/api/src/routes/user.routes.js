import { Router } from 'express'
import * as UserController from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.use(authRequired)

router.get('/profile', UserController.profile)

router.post('/', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

export default router
