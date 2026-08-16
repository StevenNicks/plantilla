import { Tamizaje } from '../models/tamizaje.model.js'
import { Counter } from '../models/counter.model.js'

async function getNextCode() {
   const counter = await Counter.findByIdAndUpdate(
      'tamizaje',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
   )
   return counter.seq
}

export async function getTamizajes() {
   return Tamizaje.find().sort({ createdAt: -1 })
}

export async function getTamizajeById(id) {
   const tamizaje = await Tamizaje.findById(id)
   if (!tamizaje) {
      const error = new Error('El tamizaje no existe')
      error.status = 404
      error.code = 'TAMIZAJE_NOT_FOUND'
      throw error
   }

   return tamizaje
}

export async function createTamizaje({ name, status }) {
   const code = await getNextCode()

   return Tamizaje.create({ name, code, status })
}

export async function updateTamizaje(id, { name, status }) {
   const tamizaje = await Tamizaje.findById(id)
   if (!tamizaje) {
      const error = new Error('El tamizaje no existe')
      error.status = 404
      error.code = 'TAMIZAJE_NOT_FOUND'
      throw error
   }

   if (name !== undefined) tamizaje.name = name
   if (status !== undefined) tamizaje.status = status

   return tamizaje.save()
}

export async function deleteTamizaje(id) {
   const tamizaje = await Tamizaje.findByIdAndDelete(id)
   if (!tamizaje) {
      const error = new Error('El tamizaje no existe')
      error.status = 404
      error.code = 'TAMIZAJE_NOT_FOUND'
      throw error
   }

   return tamizaje
}
