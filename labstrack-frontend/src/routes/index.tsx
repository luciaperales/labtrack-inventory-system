import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, FlaskConical, Plus, XCircle, LogOut } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MetricCard } from "@/components/labtrack/MetricCard";
import { ReactivosTable } from "@/components/labtrack/ReactivosTable";
import { ReactivoForm } from "@/components/labtrack/ReactivoForm";
import { useAuth } from "@/context/AuthContext";


import type { Reactivo, ReactivoInput } from "@/types/reactivo";
import { createReactivo, deleteReactivo, getReactivos, updateReactivo } from "@/lib/api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { usuario, logoutUser, cargando } = useAuth(); 
  const router = useRouter(); // Instancia del enrutador de TanStack

  const [reactivos, setReactivos] = useState<Reactivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Reactivo | null>(null);
  const [toDelete, setToDelete] = useState<Reactivo | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setReactivos(await getReactivos());
    } catch {
      toast.error("Error al cargar los reactivos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Solo cargam los reactivos si el usuario ya se autenticó
    if (usuario) {
      load();
    }
  }, [usuario]);

  // CONTROL DE ACCESO VISUAL: Si está cargando la sesión, muestra un spinner
  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <p className="text-sm font-medium tracking-wide">Cargando ..</p>
      </div>
    );
  }

  // CONTROL DE ACCESO VISUAL: Si el usuario no existe, redirige limpiamente a /login
  if (!usuario) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      router.navigate({ to: "/login" });
    }, [router]);
    
    return null;
  }

  // Cálculo de Métricas optimizado con useMemo
  const metrics = useMemo(() => ({
    total: reactivos.length,
    criticos: reactivos.filter((r) => r.estado === "Critico").length,
    agotados: reactivos.filter((r) => r.estado === "Agotado").length,
  }), [reactivos]);

  const handleSubmit = async (data: ReactivoInput) => {
    try {
      if (editing) {
        const upd = await updateReactivo(editing.id, data);
        setReactivos((prev) => prev.map((r) => (r.id === upd.id ? upd : r)));
        toast.success("Reactivo actualizado");
      } else {
        const nuevo = await createReactivo(data);
        setReactivos((prev) => [nuevo, ...prev]);
        toast.success("Reactivo registrado");
      }
      setFormOpen(false); // Cerramos el modal tras guardar
    } catch (err: any) {
      toast.error(err.message || "No se pudo guardar el reactivo");
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteReactivo(toDelete.id);
      setReactivos((prev) => prev.filter((r) => r.id !== toDelete.id));
      toast.success("Reactivo eliminado");
    } catch (err: any) {
      toast.error(err.message || "No se pudo eliminar");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster richColors position="top-right" />

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-700 text-white shadow-sm">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight text-slate-900">
                LabTrack <span className="text-slate-400">// Control de Stock</span>
              </h1>
              <p className="text-xs text-slate-500">Gestión de reactivos y muestras</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Indicador de Usuario Logueado */}
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-slate-900">{usuario.nombre}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{usuario.rol}</p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {usuario.rol === 'administrador' ? ' Administrador' : 'Analista'}
            </div>

            {/* Botón de Cerrar Sesión */}
            <Button
              variant="ghost"
              size="icon"
              onClick={logoutUser}
              className="text-slate-400 hover:text-slate-600"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => { setEditing(null); setFormOpen(true); }}
              className="bg-cyan-600 text-white shadow-sm hover:bg-cyan-700"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Registrar Reactivo
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Métricas */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard label="Total de Reactivos" value={metrics.total} icon={FlaskConical} />
          <MetricCard label="Alertas Críticas" value={metrics.criticos} icon={AlertTriangle} tone="warning" />
          <MetricCard label="Sin Stock" value={metrics.agotados} icon={XCircle} tone="danger" />
        </section>

        {/* Tabla */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">Inventario de Reactivos</h2>
              <p className="text-sm text-slate-500">Listado completo de reactivos en stock.</p>
            </div>
          </div>
          <ReactivosTable
            reactivos={reactivos}
            loading={loading}
            onEdit={(r) => { setEditing(r); setFormOpen(true); }}
            onDelete={(r) => setToDelete(r)}
          />
        </section>

        <footer className="mt-10 text-center text-xs text-slate-400">
          LabTrack © {new Date().getFullYear()} — Sistema interno de laboratorio
        </footer>
      </main>

      <ReactivoForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar reactivo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente <span className="font-medium text-slate-900">{toDelete?.nombre}</span> del inventario.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
