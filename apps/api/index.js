import app from './src/app.js'
import { PORT, NODE_ENV } from './src/configuration/config.js'
import { connectDB } from './src/database/connection.js';

// Función principal para iniciar la aplicación
(async () => {
   try {
      // 1. Conectar a la base de datos
      await connectDB();

      // 2. Iniciar el servidor
      app.listen(PORT, () => {
         console.log(`===============================================`);
         console.log(`>>> API_PORT.....  :  ${PORT}`);
         console.log(`>>> API_URL......  :  http://localhost:${PORT}/api`);
         console.log(`>>> Environments.  :  ${NODE_ENV}`);
         console.log(`===============================================`);
      });
   } catch (error) {
      console.error('Error crítico al iniciar la aplicación:');
      console.error(error);
      process.exit(1);
   }
})();