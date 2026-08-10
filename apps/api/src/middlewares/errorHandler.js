import { NODE_ENV } from '../configuration/config.js'

export function errorHandler(err, req, res, next) {
   // 1. Código de estado
   const statusCode = err.status || err.statusCode || 500;

   // 2. ¿Estamos en desarrollo o producción?
   const isDev = NODE_ENV !== 'production';

   // 3. Log del error (siempre útil)
   console.error(`[ERROR ${statusCode}] ${req.method} ${req.originalUrl} → ${err.message}`)
   if (isDev) console.error(err.stack)  // solo en desarrollo oculto en producción

   // 4. Respuesta al cliente
   res.status(statusCode).json({
      success: false,
      error: {
         message: isDev
            ? err.message
            : 'Ocurrió un error interno en el servidor',   // ← más seguro en producción
         code: err.code,
      },
      // Opcional: en desarrollo puedes devolver más info
      ...(isDev && {
         stack: err.stack,
         path: req.originalUrl,
         method: req.method
      })
   })
}