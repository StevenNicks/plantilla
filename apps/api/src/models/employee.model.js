import mongoose from 'mongoose';
import { toUpperCaseTrim } from '../utils/funtions.js';

const employeeSchema = new mongoose.Schema(
   {
      documentType: {
         type: String,
         required: true,
         enum: ['CC', 'CE', 'TI', 'PA', 'RC'], // Cédula, Cédula extranjería, Tarjeta identidad, Pasaporte, Registro civil
      },
      documentNumber: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      firstName: {
         type: String,
         required: true,
         trim: true,
         set: toUpperCaseTrim,
      },
      middleName: {
         type: String,
         trim: true,
         set: toUpperCaseTrim,
      },
      lastName: {
         type: String,
         required: true,
         trim: true,
         set: toUpperCaseTrim,
      },
      secondLastName: {
         type: String,
         trim: true,
         set: toUpperCaseTrim,
      },
      birthDate: {
         type: Date,
         required: true,
      },
      gender: {
         type: String,
         required: true,
         enum: ['M', 'F', 'O'], // Masculino, Femenino, Otro
      },
      bloodType: {
         type: String,
         enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      },
      status: {
         type: String,
         required: true,
         enum: ['active', 'inactive'],
         default: 'active',
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         unique: true,
      },
   },
   {
      timestamps: true, // agrega createdAt y updatedAt automáticamente
   }
);

export const Employee = mongoose.model('Employee', employeeSchema);
