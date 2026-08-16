import * as ResultadoService from '../services/resultado.service.js'

export async function getResultados(req, res, next) {
   try {
      const { tamizaje, employee } = req.query
      const resultados = await ResultadoService.getResultados({ tamizaje, employee })

      res.status(200).json({ status: 'success', resultados })
   } catch (error) {
      next(error)
   }
}

export async function getResultadoById(req, res, next) {
   try {
      const resultado = await ResultadoService.getResultadoById(req.params.id)

      res.status(200).json({ status: 'success', resultado })
   } catch (error) {
      next(error)
   }
}

const REQUIRED_FIELDS = [
   'tamizaje',
   'employee',
   'height',
   'weight',
   'waistWidth',
   'systolic',
   'diastolic',
   'pulse',
   'oxygenSaturation',
   'glucose',
   'temperature',
]

export async function createResultado(req, res, next) {
   try {
      const missing = REQUIRED_FIELDS.filter(
         (field) => req.body[field] === undefined || req.body[field] === null
      )

      if (missing.length > 0) {
         return res.status(400).json({
            error: { message: `Los siguientes campos son obligatorios: ${missing.join(', ')}` },
         })
      }

      const resultado = await ResultadoService.createResultado(req.body)

      res.status(201).json({ status: 'success', resultado })
   } catch (error) {
      next(error)
   }
}

export async function updateResultado(req, res, next) {
   try {
      const {
         height,
         weight,
         waistWidth,
         systolic,
         diastolic,
         pulse,
         oxygenSaturation,
         glucose,
         temperature,
      } = req.body

      const resultado = await ResultadoService.updateResultado(req.params.id, {
         height,
         weight,
         waistWidth,
         systolic,
         diastolic,
         pulse,
         oxygenSaturation,
         glucose,
         temperature,
      })

      res.status(200).json({ status: 'success', resultado })
   } catch (error) {
      next(error)
   }
}

export async function deleteResultado(req, res, next) {
   try {
      await ResultadoService.deleteResultado(req.params.id)

      res.status(200).json({ status: 'success', message: 'Resultado eliminado' })
   } catch (error) {
      next(error)
   }
}
