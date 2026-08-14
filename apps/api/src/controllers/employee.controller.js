import * as EmployeeService from '../services/employee.service.js'

export async function getEmployees(req, res, next) {
   try {
      const employees = await EmployeeService.getEmployees()

      res.status(200).json({ status: 'success', employees })
   } catch (error) {
      next(error)
   }
}

export async function getEmployeeById(req, res, next) {
   try {
      const employee = await EmployeeService.getEmployeeById(req.params.id)

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function getEmployeeByUserId(req, res, next) {
   try {
      const employee = await EmployeeService.getEmployeeByUserId(req.params.userId)

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function createEmployee(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user } = req.body

      if (!documentType || !documentNumber || !firstName || !lastName || !birthDate || !user) {
         return res.status(400).json({
            error: { message: 'documentType, documentNumber, firstName, lastName, birthDate y user son obligatorios' },
         })
      }

      const employee = await EmployeeService.createEmployee({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user })

      res.status(201).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function createEmployeeWithUser(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, email, password } = req.body

      if (!documentType || !documentNumber || !firstName || !lastName || !birthDate || !email || !password) {
         return res.status(400).json({
            error: { message: 'documentType, documentNumber, firstName, lastName, birthDate, email y password son obligatorios' },
         })
      }

      const employee = await EmployeeService.createEmployeeWithUser({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, email, password })

      res.status(201).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function updateEmployee(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user } = req.body

      const employee = await EmployeeService.updateEmployee(req.params.id, {
         documentType,
         documentNumber,
         firstName,
         middleName,
         lastName,
         secondLastName,
         birthDate,
         user,
      })

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function updateEmployeeWithUser(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, email, password } = req.body

      const employee = await EmployeeService.updateEmployeeWithUser(req.params.id, {
         documentType,
         documentNumber,
         firstName,
         middleName,
         lastName,
         secondLastName,
         birthDate,
         email,
         password,
      })

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function deleteEmployee(req, res, next) {
   try {
      await EmployeeService.deleteEmployee(req.params.id)

      res.status(200).json({ status: 'success', message: 'Empleado eliminado' })
   } catch (error) {
      next(error)
   }
}
