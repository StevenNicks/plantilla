import { loginService, registerService } from '../services/auth.service.js'

const COOKIE_OPTIONS = {
   httpOnly: true,                                    // La cookie NO es accesible desde JavaScript (protege contra XSS)
   // secure: process.env.NODE_ENV === 'production',  // Solo se envía por HTTPS en producción
   secure: false,
   sameSite: 'lax',                                   // Evita que la cookie se envíe en requests de otros sitios (CSRF)
   path: '/',
   maxAge: 24 * 60 * 60 * 1000                        // Duración de la cookie: 1 día
}

export async function register(req, res, next) {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         return res.status(400).json({ error: { message: 'email y password son obligatorios' } })
      }

      const { user, token } = await registerService({ email, password })

      res.cookie('token', token, COOKIE_OPTIONS).status(201).json({
         status: 'success',
         message: `Bienvenido ${user.email}`,
      })
   } catch (error) {
      next(error)
   }
}

export async function login(req, res, next) {
   try {
      const { email, password } = req.body

      if (!email || !password) {
         return res.status(400).json({ error: { message: 'email y password son obligatorios' } })
      }

      const { user, token } = await loginService(email, password)

      res.cookie('token', token, COOKIE_OPTIONS).status(200).json({
         status: 'success',
         message: `Bienvenido ${user.email}`,
      })
   } catch (error) {
      next(error)
   }
}

export async function logout(req, res, next) {
   try {
      res.clearCookie('token', { path: COOKIE_OPTIONS.path }).status(200).json({
         status: 'success',
         message: 'Sesión cerrada',
      })
   } catch (error) {
      next(error)
   }
}
