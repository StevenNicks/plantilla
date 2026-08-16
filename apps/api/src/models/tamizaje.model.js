import mongoose from 'mongoose';
import { toUpperCaseTrim } from '../utils/funtions.js';

const tamizajeSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
         set: toUpperCaseTrim,
      },
      code: {
         type: Number,
         required: true,
         unique: true,
      },
      status: {
         type: String,
         required: true,
         enum: ['active', 'inactive'],
         default: 'active',
      },
   },
   {
      timestamps: true, // agrega createdAt y updatedAt automáticamente
   }
);

export const Tamizaje = mongoose.model('Tamizaje', tamizajeSchema);
