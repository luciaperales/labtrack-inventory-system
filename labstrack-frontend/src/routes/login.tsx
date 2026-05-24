import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "@/lib/api"; // 
import { useAuth } from "@/context/AuthContext"; // 
import { FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_role', data.usuario.rol); // Guardamos 'administrador' o 'analista'

      // Guarda la sesión globalmente en tu Context existente
      loginUser(data.token, data.usuario); 
      
      // Redirecciona al dashboard de inmediato una vez autenticado
      router.navigate({ to: "/" }); 
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 font-sans px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Cabecera / Identidad visual */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 text-white shadow-md mb-3">
            <FlaskConical className="h-6 w-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">LabTrack</h2>
          <p className="mt-1 text-sm text-slate-500">Ingreso al Sistema de Gestión de Reactivos</p>
        </div>

        {/* Formulario */}
        <div className="bg-white p-8 shadow-sm border border-slate-200 rounded-xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs font-medium text-rose-600">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                placeholder="analista@laboratorio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                className="block w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={cargando}
              className="w-full mt-2 bg-cyan-600 text-white font-medium shadow-sm hover:bg-cyan-700 disabled:opacity-50 transition-colors"
            >
              {cargando ? "Verificando identidad..." : "Ingresar"}
            </Button>
          </form>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          Uso restringido a personal técnico autorizado. Las conexiones son auditadas.
        </div>
      </div>
    </div>
  );
}