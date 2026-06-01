import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db'; // Asegurate de que la ruta a tu pool de Postgres sea correcta

// 1. REGISTRO DE USUARIOS
export const registrarUsuario = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Verificar si el email ya está registrado en el laboratorio
    const existeUsuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if ((existeUsuario?.rowCount ?? 0) > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }


    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Definir rol por defecto si no viene ninguno
    const rolUsuario = rol || 'analista';

    // Insertar en la base de datos
    const nuevoUsuario = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email, rol',
      [nombre, email, passwordEncriptada, rolUsuario]
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      usuario: nuevoUsuario.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al registrar el usuario' });
  }
};

// 2. INICIO DE SESIÓN (LOGIN)
export const loginUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // Buscar el usuario por email
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const usuario = result.rows[0];

    // Validar si la contraseña ingresada coincide con el hash de la base de datos
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Generar el Token de Seguridad (JWT) incluyendo ID, email y Rol
    const secreto = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rol: usuario.rol },
      secreto,
      { expiresIn: '8h' } // El token expira en una jornada laboral estándar
    );

    // Responder con el token y datos públicos del usuario
    res.json({
      message: 'Autenticación exitosa',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno en el servidor' });
  }
};