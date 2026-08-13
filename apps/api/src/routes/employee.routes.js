import { Router } from 'express'
import * as EmployeeController from '../controllers/employee.controller.js'
import { authRequired } from '../middlewares/authRequired.js'

const router = Router()

router.use(authRequired)

router.get('/', EmployeeController.getEmployees)
router.get('/by-user/:userId', EmployeeController.getEmployeeByUserId)
router.get('/:id', EmployeeController.getEmployeeById)
router.post('/', EmployeeController.createEmployee)
router.post('/with-user', EmployeeController.createEmployeeWithUser)
router.put('/:id', EmployeeController.updateEmployee)
router.delete('/:id', EmployeeController.deleteEmployee)

export default router
