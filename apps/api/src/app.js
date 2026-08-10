import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import { CLIENT_URL } from './configuration/config.js'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import employeeRoutes from './routes/employee.routes.js'

const app = express();

app.set('json spaces', 3);

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.get('/', (req, res) => {
   res.redirect('/api');
})

app.get('/api', (req, res) => {
   res.status(200).json({
      message: 'Welcome to your API'
   });
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/employees', employeeRoutes);

// 404
app.use((req, res) => {
   res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;