import { Pencil, Trash2, FlaskConical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import type { Reactivo } from "@/types/reactivo";
import { GHSBadges } from "@/components/GHSBadges";

interface Props {
  reactivos: Reactivo[];
  loading: boolean;
  onEdit: (r: Reactivo) => void;
  onDelete: (r: Reactivo) => void;
}

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
};

export function ReactivosTable({ reactivos, loading, onEdit, onDelete }: Props) {
  console.log(reactivos)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-20 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <p className="mt-3 text-sm">Cargando reactivos…</p>
      </div>
    );
  }

  if (reactivos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
          <FlaskConical className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">No hay reactivos registrados</h3>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Comienza tu inventario haciendo clic en <span className="font-medium text-slate-700">“+ Registrar Reactivo”</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Reactivo</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Unidad</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3">Fecha de Ingreso</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reactivos.map((r) => (
              <tr key={r.id} className="transition hover:bg-slate-50/70">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">#{r.id.toString().padStart(3, "0")}</td>

                {/* Columna del Reactivo con Nombre, Fórmula y Pictogramas */}
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.nombre}</div>
                  {r.formula && <div className="text-xs text-slate-400">{r.formula}</div>}

                  {/* Validamos ambas opciones de tipado que puedan venir del backend */}
                  {(r.ghs_hazards || (r as any).ghsHazards) && (
                    <GHSBadges hazardsString={r.ghs_hazards || (r as any).ghsHazards} />
                  )}
                </td>

                <td className="px-4 py-3 tabular-nums text-slate-700">{r.cantidad}</td>
                <td className="px-4 py-3 text-slate-600">{r.unidad}</td>
                <td className="px-4 py-3 text-slate-600">{r.ubicacion}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(r.fechaIngreso)}</td>
                <td className="px-4 py-3"><StatusBadge estado={r.estado} /></td>

                {/* Columna de Acciones corregida */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(r)}
                      className="h-8 w-8 text-slate-500 hover:bg-cyan-50 hover:text-cyan-700"
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onDelete(r)}
                      className="h-8 w-8 text-slate-500 hover:bg-rose-50 hover:text-rose-700"
                      aria-label="Eliminar"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
