import { Router } from 'express'
import * as ResultadoController from '../controllers/resultado.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.use(authRequired)

router.get('/', ResultadoController.getResultados)
router.get('/:id', ResultadoController.getResultadoById)
router.post('/', ResultadoController.createResultado)
router.put('/:id', ResultadoController.updateResultado)
router.delete('/:id', ResultadoController.deleteResultado)

export default router
