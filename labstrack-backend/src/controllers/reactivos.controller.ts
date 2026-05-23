import { Request, Response } from 'express';
import { pool } from '../config/db';

export const getReactivos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM reactivos ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los reactivos' });
  }
};

export const createReactivo = async (req: Request, res: Response) => {
  const { nombre, formula, cantidad, unidad, ubicacion, estado } = req.body;
  try {
    const query = `
      INSERT INTO reactivos (nombre, formula, cantidad, unidad, ubicacion, estado)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const values = [nombre, formula, cantidad, unidad, ubicacion, estado || 'Disponible'];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el reactivo' });
  }
};

export const updateReactivo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, formula, cantidad, unidad, ubicacion, estado } = req.body;
  try {
    const query = `
      UPDATE reactivos 
      SET nombre = $1, formula = $2, cantidad = $3, unidad = $4, ubicacion = $5, estado = $6
      WHERE id = $7 RETURNING *
    `;
    const values = [nombre, formula, cantidad, unidad, ubicacion, estado, id];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reactivo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el reactivo' });
  }
};

export const deleteReactivo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reactivos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reactivo no encontrado' });
    }
    res.json({ message: 'Reactivo eliminado correctamente', reactivo: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el reactivo' });
  }
};
