import { createAccessToken } from '../libs/jwt.js'
import { sendMail } from '../libs/mailer.js'
import { passwordResetEmail } from '../libs/email-templates.js'
import { CLIENT_URL } from '../configuration/config.js'
import {
   createUser,
   findByEmail,
   toPublicUser,
   verifyPassword,
   createPasswordResetToken,
   resetPasswordWithToken,
} from './user.service.js'

export async function registerService({ email, password }) {
   const user = await createUser({ email, password })
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

export async function forgotPasswordService(email) {
   const rawToken = await createPasswordResetToken(email)

   // No revelamos si el correo existe o no: si no hay token, simplemente no se envía nada
   if (!rawToken) return

   const resetUrl = `${CLIENT_URL}/auth/reset-password?token=${rawToken}`
   const { text, html } = passwordResetEmail({ resetUrl })

   await sendMail({
      to: email,
      subject: 'Recupera tu contraseña',
      text,
      html,
   })
}

export async function resetPasswordService(token, password) {
   await resetPasswordWithToken(token, password)
}
