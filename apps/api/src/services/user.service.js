import { User } from '../models/user.model.js'
import { Employee } from '../models/employee.model.js'

import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const PASSWORD_RESET_EXPIRATION_MS = 60 * 60 * 1000 // 1 hora

export function toPublicUser(user) {
   return {
      id: user._id,
      email: user.email,
   }
}

export async function getUsers({ unlinked } = {}) {
   const filter = {}

   if (unlinked) {
      const linkedUserIds = await Employee.distinct('user')
      filter._id = { $nin: linkedUserIds }
   }

   const users = await User.find(filter).sort({ createdAt: -1 })
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

export async function createUser({ email, password }) {
   const existing = await User.findOne({ email })
   if (existing) {
      const error = new Error('Ya existe un usuario con ese correo')
      error.status = 409
      throw error
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   return User.create({ email, password: hashedPassword })
}

export async function updateUser(id, { email, password }) {
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

   if (email !== undefined) user.email = email
   if (password) user.password = await bcrypt.hash(password, 10)

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

   await Employee.deleteOne({ user: id })

   return toPublicUser(user)
}

export async function findByEmail(email) {
   return User.findOne({ email }).select('+password')
}

export async function verifyPassword(plainPassword, hashedPassword) {
   return bcrypt.compare(plainPassword, hashedPassword)
}

export async function createPasswordResetToken(email) {
   const user = await User.findOne({ email })
   if (!user) return null

   const rawToken = crypto.randomBytes(32).toString('hex')
   user.passwordResetTokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
   user.passwordResetExpires = new Date(Date.now() + PASSWORD_RESET_EXPIRATION_MS)
   await user.save()

   return rawToken
}

export async function resetPasswordWithToken(rawToken, newPassword) {
   const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')

   const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpires: { $gt: new Date() },
   }).select('+passwordResetTokenHash +passwordResetExpires')

   if (!user) {
      const error = new Error('El enlace de recuperación no es válido o expiró')
      error.status = 400
      error.code = 'INVALID_RESET_TOKEN'
      throw error
   }

   user.password = await bcrypt.hash(newPassword, 10)
   user.passwordResetTokenHash = undefined
   user.passwordResetExpires = undefined
   await user.save()

   return user
}