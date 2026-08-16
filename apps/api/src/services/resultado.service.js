import { Resultado } from '../models/resultado.model.js'
import { Tamizaje } from '../models/tamizaje.model.js'
import { Employee } from '../models/employee.model.js'

const EMPLOYEE_FIELDS = 'firstName middleName lastName secondLastName documentType documentNumber'
const TAMIZAJE_FIELDS = 'name code status'

export async function getResultados({ tamizaje, employee } = {}) {
   const filter = {}
   if (tamizaje) filter.tamizaje = tamizaje
   if (employee) filter.employee = employee

   return Resultado.find(filter)
      .sort({ createdAt: -1 })
      .populate('tamizaje', TAMIZAJE_FIELDS)
      .populate('employee', EMPLOYEE_FIELDS)
}

export async function getResultadoById(id) {
   const resultado = await Resultado.findById(id)
      .populate('tamizaje', TAMIZAJE_FIELDS)
      .populate('employee', EMPLOYEE_FIELDS)

   if (!resultado) {
      const error = new Error('El resultado no existe')
      error.status = 404
      error.code = 'RESULTADO_NOT_FOUND'
      throw error
   }

   return resultado
}

export async function createResultado({
   tamizaje,
   employee,
   height,
   weight,
   waistWidth,
   systolic,
   diastolic,
   pulse,
   oxygenSaturation,
   glucose,
   temperature,
}) {
   const tamizajeExists = await Tamizaje.exists({ _id: tamizaje })
   if (!tamizajeExists) {
      const error = new Error('El tamizaje no existe')
      error.status = 404
      error.code = 'TAMIZAJE_NOT_FOUND'
      throw error
   }

   const employeeExists = await Employee.exists({ _id: employee })
   if (!employeeExists) {
      const error = new Error('El empleado no existe')
      error.status = 404
      error.code = 'EMPLOYEE_NOT_FOUND'
      throw error
   }

   const existing = await Resultado.findOne({ tamizaje, employee })
   if (existing) {
      const error = new Error('Este empleado ya tiene un resultado registrado para este tamizaje')
      error.status = 409
      throw error
   }

   const resultado = await Resultado.create({
      tamizaje,
      employee,
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

   return getResultadoById(resultado._id)
}

export async function updateResultado(id, {
   height,
   weight,
   waistWidth,
   systolic,
   diastolic,
   pulse,
   oxygenSaturation,
   glucose,
   temperature,
}) {
   const resultado = await Resultado.findById(id)
   if (!resultado) {
      const error = new Error('El resultado no existe')
      error.status = 404
      error.code = 'RESULTADO_NOT_FOUND'
      throw error
   }

   if (height !== undefined) resultado.height = height
   if (weight !== undefined) resultado.weight = weight
   if (waistWidth !== undefined) resultado.waistWidth = waistWidth
   if (systolic !== undefined) resultado.systolic = systolic
   if (diastolic !== undefined) resultado.diastolic = diastolic
   if (pulse !== undefined) resultado.pulse = pulse
   if (oxygenSaturation !== undefined) resultado.oxygenSaturation = oxygenSaturation
   if (glucose !== undefined) resultado.glucose = glucose
   if (temperature !== undefined) resultado.temperature = temperature

   await resultado.save()

   return getResultadoById(resultado._id)
}

export async function deleteResultado(id) {
   const resultado = await Resultado.findByIdAndDelete(id)
   if (!resultado) {
      const error = new Error('El resultado no existe')
      error.status = 404
      error.code = 'RESULTADO_NOT_FOUND'
      throw error
   }

   return resultado
}
