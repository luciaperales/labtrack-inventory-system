import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de conexión utilizando variables de entorno
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Si usás Render/Railway para producción, descomentá la línea de abajo:
  // ssl: { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Database connected successfully');
});
