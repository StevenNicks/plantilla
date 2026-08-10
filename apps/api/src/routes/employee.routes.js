import { Router } from 'express'
import { create, getOne, list, remove, update } from '../controllers/employee.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.use(authRequired)

router.post('/', create)
router.get('/', list)
router.get('/:id', getOne)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
