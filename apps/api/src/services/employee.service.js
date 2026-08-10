import { Employee } from '../models/employee.model.js'

export async function createEmployee({ documentType, documentNumber, firstName, middleName, birthDate }) {
   const existing = await Employee.findOne({ documentNumber })
   if (existing) {
      const error = new Error('Ya existe un empleado con ese número de documento')
      error.status = 409
      throw error
   }

   return Employee.create({ documentType, documentNumber, firstName, middleName, birthDate })
}

export async function getEmployees() {
   return Employee.find().sort({ createdAt: -1 })
}

export async function getEmployeeById(id) {
   const employee = await Employee.findById(id)
   if (!employee) {
      const error = new Error('El empleado no existe')
      error.status = 404
      error.code = 'EMPLOYEE_NOT_FOUND'
      throw error
   }

   return employee
}

export async function updateEmployee(id, { documentType, documentNumber, firstName, middleName, birthDate }) {
   const employee = await Employee.findById(id)
   if (!employee) {
      const error = new Error('El empleado no existe')
      error.status = 404
      error.code = 'EMPLOYEE_NOT_FOUND'
      throw error
   }

   if (documentNumber && documentNumber !== employee.documentNumber) {
      const existing = await Employee.findOne({ documentNumber })
      if (existing) {
         const error = new Error('Ya existe un empleado con ese número de documento')
         error.status = 409
         throw error
      }
   }

   if (documentType !== undefined) employee.documentType = documentType
   if (documentNumber !== undefined) employee.documentNumber = documentNumber
   if (firstName !== undefined) employee.firstName = firstName
   if (middleName !== undefined) employee.middleName = middleName
   if (birthDate !== undefined) employee.birthDate = birthDate

   return employee.save()
}

export async function deleteEmployee(id) {
   const employee = await Employee.findByIdAndDelete(id)
   if (!employee) {
      const error = new Error('El empleado no existe')
      error.status = 404
      error.code = 'EMPLOYEE_NOT_FOUND'
      throw error
   }

   return employee
}
