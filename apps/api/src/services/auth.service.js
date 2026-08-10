import { createAccessToken } from '../libs/jwt.js'
import { createUser, findByEmail, toPublicUser, verifyPassword } from './user.service.js'

export async function registerService({ name, email, password }) {
   const user = await createUser({ name, email, password })
   const token = await createAccessToken({ id: user._id })

   return { user: toPublicUser(user), token }
}

export async function loginService(email, password) {
   const user = await findByEmail(email)
   if (!user) {
      const error = new Error('El usuario no existe')
      error.status = 404
      error.code = 'USER_NOT_FOUND'
      throw error
   }

   const isValid = await verifyPassword(password, user.password)
   if (!isValid) {
      const error = new Error('Contraseña incorrecta')
      error.status = 401
      error.code = 'INVALID_PASSWORD'
      throw error
   }

   const token = await createAccessToken({ id: user._id })

   return { user: toPublicUser(user), token }
}
