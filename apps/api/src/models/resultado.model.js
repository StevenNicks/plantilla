import mongoose from 'mongoose';

const resultadoSchema = new mongoose.Schema(
   {
      tamizaje: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Tamizaje',
         required: true,
      },
      employee: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Employee',
         required: true,
      },
      height: {
         type: Number, // cm
         required: true,
      },
      weight: {
         type: Number, // kg
         required: true,
      },
      waistWidth: {
         type: Number, // cm
         required: true,
      },
      systolic: {
         type: Number, // mmHg
         required: true,
      },
      diastolic: {
         type: Number, // mmHg
         required: true,
      },
      pulse: {
         type: Number, // lpm
         required: true,
      },
      oxygenSaturation: {
         type: Number, // %
         required: true,
      },
      glucose: {
         type: Number, // mg/dL
         required: true,
      },
      temperature: {
         type: Number, // °C
         required: true,
      },
   },
   {
      timestamps: true, // agrega createdAt y updatedAt automáticamente
   }
);

// Un empleado solo puede tener un resultado por tamizaje
resultadoSchema.index({ tamizaje: 1, employee: 1 }, { unique: true });

export const Resultado = mongoose.model('Resultado', resultadoSchema);
