import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
      },
      emailVerifiedAt: {
         type: Date,
         default: null,
      },
      password: {
         type: String,
         required: true,
         select: false, // no se trae por defecto en los queries
      },
      rememberToken: {
         type: String,
         select: false,
      },
   },
   {
      timestamps: true, // agrega createdAt y updatedAt automáticamente
   }
);

export const Usuario = mongoose.model('Usuario', userSchema);