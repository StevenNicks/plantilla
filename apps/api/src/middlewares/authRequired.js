import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../configuration/config.js'

export const authRequired = (req, res, next) => {
   const { token } = req.cookies

   if (!token) return res.status(401).json({ error: { message: 'No autenticado' } });

   jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ error: { message: 'Token inválido' } });

      req.user = user

      next();
   })
}
