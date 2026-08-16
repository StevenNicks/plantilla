import * as TamizajeService from '../services/tamizaje.service.js'

export async function getTamizajes(req, res, next) {
   try {
      const tamizajes = await TamizajeService.getTamizajes()

      res.status(200).json({ status: 'success', tamizajes })
   } catch (error) {
      next(error)
   }
}

export async function getTamizajeById(req, res, next) {
   try {
      const tamizaje = await TamizajeService.getTamizajeById(req.params.id)

      res.status(200).json({ status: 'success', tamizaje })
   } catch (error) {
      next(error)
   }
}

export async function createTamizaje(req, res, next) {
   try {
      const { name, status } = req.body

      if (!name) {
         return res.status(400).json({
            error: { message: 'name es obligatorio' },
         })
      }

      const tamizaje = await TamizajeService.createTamizaje({ name, status })

      res.status(201).json({ status: 'success', tamizaje })
   } catch (error) {
      next(error)
   }
}

export async function updateTamizaje(req, res, next) {
   try {
      const { name, status } = req.body

      const tamizaje = await TamizajeService.updateTamizaje(req.params.id, { name, status })

      res.status(200).json({ status: 'success', tamizaje })
   } catch (error) {
      next(error)
   }
}

export async function deleteTamizaje(req, res, next) {
   try {
      await TamizajeService.deleteTamizaje(req.params.id)

      res.status(200).json({ status: 'success', message: 'Tamizaje eliminado' })
   } catch (error) {
      next(error)
   }
}
