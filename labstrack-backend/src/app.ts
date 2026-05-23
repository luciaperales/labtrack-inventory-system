import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reactivosRoutes from './routes/reactivos.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);           
app.use('/api/reactivos', reactivosRoutes);

// Servidor 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

});
export default app;