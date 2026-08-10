import {
   createEmployee,
   deleteEmployee,
   getEmployeeById,
   getEmployees,
   updateEmployee,
} from '../services/employee.service.js'

export async function create(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, birthDate } = req.body

      if (!documentType || !documentNumber || !firstName || !birthDate) {
         return res.status(400).json({
            error: { message: 'documentType, documentNumber, firstName y birthDate son obligatorios' },
         })
      }

      const employee = await createEmployee({ documentType, documentNumber, firstName, middleName, birthDate })

      res.status(201).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function list(req, res, next) {
   try {
      const employees = await getEmployees()

      res.status(200).json({ status: 'success', employees })
   } catch (error) {
      next(error)
   }
}

export async function getOne(req, res, next) {
   try {
      const employee = await getEmployeeById(req.params.id)

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function update(req, res, next) {
   try {
      const { documentType, documentNumber, firstName, middleName, birthDate } = req.body

      const employee = await updateEmployee(req.params.id, {
         documentType,
         documentNumber,
         firstName,
         middleName,
         birthDate,
      })

      res.status(200).json({ status: 'success', employee })
   } catch (error) {
      next(error)
   }
}

export async function remove(req, res, next) {
   try {
      await deleteEmployee(req.params.id)

      res.status(200).json({ status: 'success', message: 'Empleado eliminado' })
   } catch (error) {
      next(error)
   }
}
