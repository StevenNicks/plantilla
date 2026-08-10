import { getProfile } from '../services/user.service.js'

export async function profile(req, res, next) {
   try {
      const user = await getProfile(req.user.id)

      res.status(200).json({ status: 'success', user })
   } catch (error) {
      next(error)
   }
}
