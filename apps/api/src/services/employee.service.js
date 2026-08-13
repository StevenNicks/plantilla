import { Employee } from '../models/employee.model.js'
import { User } from '../models/user.model.js'
import { createUser } from './user.service.js'

async function assertUserIsLinkable(userId, { excludeEmployeeId } = {}) {
   const user = await User.findById(userId)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   const linkedEmployee = await Employee.findOne({ user: userId })
   if (linkedEmployee && String(linkedEmployee._id) !== String(excludeEmployeeId)) {
      const error = new Error('Ese usuario ya está vinculado a otro empleado')
      error.status = 409
      throw error
   }
}

export async function getEmployees() {
   return Employee.find().sort({ createdAt: -1 }).populate('user', 'email')
}

export async function getEmployeeByUserId(userId) {
   return Employee.findOne({ user: userId }).populate('user', 'email')
}

export async function getEmployeeById(id) {
   const employee = await Employee.findById(id).populate('user', 'email')
   if (!employee) {
      const error = new Error('El empleado no existe')
      error.status = 404
      error.code = 'EMPLOYEE_NOT_FOUND'
      throw error
   }

   return employee
}

export async function createEmployee({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user }) {
   const existing = await Employee.findOne({ documentNumber })
   if (existing) {
      const linkedUserExists = await User.exists({ _id: existing.user })
      if (linkedUserExists) {
         const error = new Error('Ya existe un empleado con ese número de documento')
         error.status = 409
         throw error
      }

      // El registro existente quedó huérfano (su usuario ya no existe): lo re-vinculamos al usuario actual
      await assertUserIsLinkable(user, { excludeEmployeeId: existing._id })

      existing.documentType = documentType
      existing.firstName = firstName
      existing.middleName = middleName
      existing.lastName = lastName
      existing.secondLastName = secondLastName
      existing.birthDate = birthDate
      existing.user = user

      return existing.save()
   }

   await assertUserIsLinkable(user)

   return Employee.create({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user })
}

export async function createEmployeeWithUser({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, email, password }) {
   const existing = await Employee.findOne({ documentNumber })
   if (existing) {
      const linkedUserExists = await User.exists({ _id: existing.user })
      if (linkedUserExists) {
         const error = new Error('Ya existe un empleado con ese número de documento')
         error.status = 409
         throw error
      }

      // El registro existente quedó huérfano (su usuario ya no existe): se crea el usuario y se re-vincula
      const user = await createUser({ email, password })

      existing.documentType = documentType
      existing.firstName = firstName
      existing.middleName = middleName
      existing.lastName = lastName
      existing.secondLastName = secondLastName
      existing.birthDate = birthDate
      existing.user = user._id

      return existing.save()
   }

   const user = await createUser({ email, password })

   try {
      return await Employee.create({ documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user: user._id })
   } catch (error) {
      // No dejar un usuario huérfano si la creación del empleado falla (ej. documentNumber duplicado en una carrera)
      await User.findByIdAndDelete(user._id)
      throw error
   }
}

export async function updateEmployee(id, { documentType, documentNumber, firstName, middleName, lastName, secondLastName, birthDate, user }) {
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

   if (user && String(user) !== String(employee.user)) {
      await assertUserIsLinkable(user, { excludeEmployeeId: employee._id })
   }

   if (documentType !== undefined) employee.documentType = documentType
   if (documentNumber !== undefined) employee.documentNumber = documentNumber
   if (firstName !== undefined) employee.firstName = firstName
   if (middleName !== undefined) employee.middleName = middleName
   if (lastName !== undefined) employee.lastName = lastName
   if (secondLastName !== undefined) employee.secondLastName = secondLastName
   if (birthDate !== undefined) employee.birthDate = birthDate
   if (user !== undefined) employee.user = user

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
