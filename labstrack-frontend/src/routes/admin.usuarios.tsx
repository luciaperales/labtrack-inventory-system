import { createFileRoute, redirect, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FlaskConical, UserPlus, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 1. Definición de la ruta y su seguridad
export const Route = createFileRoute('/admin/usuarios')({
  beforeLoad: () => {
    const userRole = localStorage.getItem('user_role');
    if (userRole !== 'administrador') {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AdminUsuarios, 
});

function AdminUsuarios() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('analista');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      setMensaje({ texto: ' Personal registrado con éxito en el sistema.', tipo: 'exito' });
      setNombre('');
      setEmail('');
      setPassword('');
      setRol('analista');
    } catch (error: any) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      
      {/* Mini Header de Navegación */}
      <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 text-white shadow-sm">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                LabTrack <span className="text-slate-400">// Panel de Control</span>
              </h1>
            </div>
          </div>

          <Button variant="ghost" size="sm" asChild className="text-slate-500 hover:text-slate-700">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inventario
            </Link>
          </Button>
        </div>
      </header>

      {/* Cuerpo Central del Panel */}
      <main className="mx-auto max-w-lg px-4 py-12">
        <div className="bg-white p-8 shadow-sm border border-slate-200 rounded-xl space-y-6">
          
          {/* Título de la sección */}
          <div className="text-center sm:text-left">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-100 mb-3">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Alta de Personal Técnico</h2>
            <p className="mt-1 text-xs text-slate-500">
              Registro de analistas o administradores autorizados para la gestión de reactivos.
            </p>
          </div>

          {/* Alertas de Estado */}
          {mensaje.texto && (
            <div className={`border rounded-lg p-3 text-xs font-medium transition-all ${
              mensaje.tipo === 'exito' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                : 'bg-rose-50 border-rose-200 text-rose-600'
            }`}>
              {mensaje.texto}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Nombre Completo
              </label>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
                placeholder="Ej. Dra. Juliana Martínez"
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="nombre@laboratorio.com"
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Contraseña Temporal
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Rol Asignado en Planta
              </label>
              <select 
                value={rol} 
                onChange={(e) => setRol(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all cursor-pointer"
              >
                <option value="analista"> Analista (Solo Carga / Consulta)</option>
                <option value="administrador"> Administrador (Control Total)</option>
              </select>
            </div>

            <Button 
              type="submit" 
              disabled={cargando}
              className="w-full mt-2 bg-cyan-600 text-white font-medium shadow-sm hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              {cargando ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Crear usuario
                </>
              )}
            </Button>
          </form>

        </div>
        <div className="mt-6 text-center text-[11px] text-slate-400">
        </div>
      </main>
    </div>
  );
}