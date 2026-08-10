import { Usuario } from '../models/user.model.js'

import bcrypt from 'bcryptjs'
import { toUpperCaseTrim } from '../utils/funtions.js'

export function toPublicUser(user) {
   return {
      id: user._id,
      name: user.name,
      email: user.email,
   }
}

export async function findByEmail(email) {
   return Usuario.findOne({ email }).select('+password')
}

export async function findById(id) {
   return Usuario.findById(id)
}

export async function getProfile(userId) {
   const user = await findById(userId)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   return toPublicUser(user)
}

export async function createUser({ name, email, password }) {
   const existing = await Usuario.findOne({ email })
   if (existing) {
      const error = new Error('Ya existe un usuario con ese correo')
      error.status = 409
      throw error
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   return Usuario.create({ name: toUpperCaseTrim(name), email, password: hashedPassword })
}

export async function verifyPassword(plainPassword, hashedPassword) {
   return bcrypt.compare(plainPassword, hashedPassword)
}
