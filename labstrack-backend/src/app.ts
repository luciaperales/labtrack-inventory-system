import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reactivosRoutes from './routes/reactivos.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/reactivos', reactivosRoutes);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
