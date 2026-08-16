import { Router } from 'express'
import * as TamizajeController from '../controllers/tamizaje.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.use(authRequired)

router.get('/', TamizajeController.getTamizajes)
router.get('/:id', TamizajeController.getTamizajeById)
router.post('/', TamizajeController.createTamizaje)
router.put('/:id', TamizajeController.updateTamizaje)
router.delete('/:id', TamizajeController.deleteTamizaje)

export default router
