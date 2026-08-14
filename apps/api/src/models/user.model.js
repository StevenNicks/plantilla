import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
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
      passwordResetTokenHash: {
         type: String,
         select: false,
      },
      passwordResetExpires: {
         type: Date,
         select: false,
      },
   },
   {
      timestamps: true, // agrega createdAt y updatedAt automáticamente
   }
);

userSchema.set('toJSON', {
   virtuals: true,
   transform: (_doc, ret) => {
      delete ret._id
      delete ret.__v
      delete ret.password
      delete ret.rememberToken
      delete ret.passwordResetTokenHash
      delete ret.passwordResetExpires
   },
})

export const User = mongoose.model('User', userSchema);