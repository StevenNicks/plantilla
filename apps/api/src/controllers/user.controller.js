import * as UserService from '../services/user.service.js'

export async function profile(req, res, next) {
   try {
      const user = await UserService.getUserById(req.user.id)

      res.status(200).json({ status: 'success', user })
   } catch (error) {
      next(error)
   }
}

export async function createUser(req, res, next) {
   try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
         return res.status(400).json({ error: { message: 'name, email y password son obligatorios' } })
      }

      const user = await UserService.createUser({ name, email, password })

      res.status(201).json({ status: 'success', user: UserService.toPublicUser(user) })
   } catch (error) {
      next(error)
   }
}

export async function getUsers(req, res, next) {
   try {
      const users = await UserService.getUsers()

      res.status(200).json({ status: 'success', users })
   } catch (error) {
      next(error)
   }
}

export async function getUserById(req, res, next) {
   try {
      const user = await UserService.getUserById(req.params.id)

      res.status(200).json({ status: 'success', user })
   } catch (error) {
      next(error)
   }
}

export async function updateUser(req, res, next) {
   try {
      const { name, email } = req.body

      const user = await UserService.updateUser(req.params.id, { name, email })

      res.status(200).json({ status: 'success', user })
   } catch (error) {
      next(error)
   }
}

export async function deleteUser(req, res, next) {
   try {
      await UserService.deleteUser(req.params.id)

      res.status(200).json({ status: 'success', message: 'Usuario eliminado' })
   } catch (error) {
      next(error)
   }
}
