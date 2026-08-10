import mongoose from 'mongoose'
import chalk from 'chalk';
import { MONGO_URI, PORT } from '../configuration/config.js'

export async function connectDB() {
   try {
      const conn = await mongoose.connect(MONGO_URI)
      console.log(`===============================================`);
      console.log(chalk.green('>>> DB is connected ✔ ✔ ✔'));
      // console.log(`>>> Server running in: http://${conn.connection.host}:${PORT}/api`);
   } catch (error) {
      console.error(`Error al conectar a MongoDB: ${error.message}`);
      process.exit(1);
   }
}
