import { User } from '../models/user.model.js'

import bcrypt from 'bcryptjs'
import { toUpperCaseTrim } from '../utils/funtions.js'

export function toPublicUser(user) {
   return {
      id: user._id,
      name: user.name,
      email: user.email,
   }
}

export async function getUsers() {
   const users = await User.find().sort({ createdAt: -1 })
   return users.map(toPublicUser)
}

export async function getUserById(id) {
   const user = await User.findById(id)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   return toPublicUser(user)
}

export async function createUser({ name, email, password }) {
   const existing = await User.findOne({ email })
   if (existing) {
      const error = new Error('Ya existe un usuario con ese correo')
      error.status = 409
      throw error
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   return User.create({ name: toUpperCaseTrim(name), email, password: hashedPassword })
}

export async function updateUser(id, { name, email }) {
   const user = await User.findById(id)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   if (email && email !== user.email) {
      const existing = await User.findOne({ email })
      if (existing) {
         const error = new Error('Ya existe un usuario con ese correo')
         error.status = 409
         throw error
      }
   }

   if (name !== undefined) user.name = toUpperCaseTrim(name)
   if (email !== undefined) user.email = email

   await user.save()

   return toPublicUser(user)
}

export async function deleteUser(id) {
   const user = await User.findByIdAndDelete(id)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   return toPublicUser(user)
}

export async function findByEmail(email) {
   return User.findOne({ email }).select('+password')
}

export async function verifyPassword(plainPassword, hashedPassword) {
   return bcrypt.compare(plainPassword, hashedPassword)
}