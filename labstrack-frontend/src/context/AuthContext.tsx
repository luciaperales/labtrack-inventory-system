import React, { createContext, useContext, useState, useEffect } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  loginUser: (token: string, usuario: Usuario) => void;
  logoutUser: () => void;
  cargando: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Al cargar la app, verifica si ya había un token guardado
    const tokenGuardado = localStorage.getItem('labtrack_token');
    const usuarioGuardado = localStorage.getItem('labtrack_usuario');

    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const loginUser = (nuevoToken: string, nuevoUsuario: Usuario) => {
    setToken(nuevoToken);
    setUsuario(nuevoUsuario);
    localStorage.setItem('labtrack_token', nuevoToken);
    localStorage.setItem('labtrack_usuario', JSON.stringify(nuevoUsuario));
  };

  const logoutUser = () => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, loginUser, logoutUser, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};