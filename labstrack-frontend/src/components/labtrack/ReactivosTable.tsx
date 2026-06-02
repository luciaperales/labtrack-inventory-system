import React, { useState, useMemo } from "react";
import { Pencil, Trash2, FlaskConical, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./StatusBadge";
import type { Reactivo } from "@/types/reactivo";
import { GHSBadges } from "@/components/GHSBadges";
import { GHSFilterBar } from "@/components/ui/GHSFilterBar";
import { GHS_PICTOGRAMS } from "@/components/constants/ghs";


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
  // 1. Estados locales para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHazards, setSelectedHazards] = useState<string[]>([]);

  // 2. Lógica de filtrado en memoria (Reactiva)
  const filteredReactivos = useMemo(() => {
    return reactivos.filter((r) => {
      // Filtro A: Texto (Nombre, Fórmula o Ubicación)
      const matchesSearch =
        r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.formula?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (r.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

      // Filtro B: Pictogramas GHS (SGA)
      const currentHazardsString = r.ghs_hazards || (r as any).ghsHazards || "";
      const reactivoHazards = currentHazardsString
        ? currentHazardsString.split(",").map((h: string) => h.trim())
        : [];


      const matchesHazards =
        selectedHazards.length === 0 ||
        selectedHazards.some((hazardId) =>
          reactivoHazards.includes(hazardId)
        );

      return matchesSearch && matchesHazards;
    });
  }, [reactivos, searchTerm, selectedHazards]);

  // Manejador para prender/apagar los pictogramas del filtro
  const handleToggleHazard = (hazardId: string) => {
    setSelectedHazards((prev) =>
      prev.includes(hazardId)
        ? prev.filter((id) => id !== hazardId)
        : [...prev, hazardId]
    );
  };

  // ---- RENDERIZADO DE CARGA ----
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-20 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <p className="mt-3 text-sm">Cargando reactivos…</p>
      </div>
    );
  }

  // ---- RENDERIZADO DE ESTADO VACÍO TOTAL (Sin reactivos en la DB) ----
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
    <div className="space-y-4">
      {/* BARRA DE HERRAMIENTAS: Buscador + Filtros SGA */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Input de Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, fórmula o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all placeholder:text-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2 text-xs font-medium text-slate-400 hover:text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Componente de la barra de Pictogramas */}
        <GHSFilterBar
          selectedHazards={selectedHazards}
          onToggleHazard={handleToggleHazard}
          onClearFilters={() => setSelectedHazards([])}
        />
      </div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
        Filtros activos
      </p>
      {selectedHazards.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedHazards.map((hazardId) => {
            const pictogram = Object.values(GHS_PICTOGRAMS).find(
              (p) => p.id === hazardId
            );

            if (!pictogram) return null;

            return (
              <button
                key={hazardId}
                onClick={() => handleToggleHazard(hazardId)}
                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-cyan-200 bg-cyan-50 text-cyan-800 text-xs font-medium hover:bg-cyan-100 transition-colors"
              >
                <img
                  src={pictogram.icon}
                  alt={pictogram.name}
                  className="w-4 h-4 object-contain"
                />

                <span>{pictogram.name}</span>

                <span className="text-cyan-500 font-bold">×</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="text-xs text-slate-500">
        Mostrando {filteredReactivos.length} de {reactivos.length} reactivos
      </div>

      {/* TABLA PRINCIPAL DE REACTIVOS */}
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
              {filteredReactivos.length > 0 ? (
                filteredReactivos.map((r) => (
                  <tr key={r.id} className="transition hover:bg-slate-50/70">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">
                      #{r.id.toString().padStart(3, "0")}
                    </td>

                    {/* Columna del Reactivo con Nombre, Fórmula y Pictogramas */}
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{r.nombre}</div>
                      {r.formula && <div className="text-xs text-slate-400 font-mono mt-0.5">{r.formula}</div>}

                      {(r.ghs_hazards || (r as any).ghsHazards) && (
                        <div className="mt-1">
                          <GHSBadges hazardsString={r.ghs_hazards || (r as any).ghsHazards} />
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 tabular-nums text-slate-700">{r.cantidad}</td>
                    <td className="px-4 py-3 text-slate-600">{r.unidad}</td>
                    <td className="px-4 py-3 text-slate-600">{r.ubicacion}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(r.fechaIngreso)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge estado={r.estado} />
                    </td>

                    {/* Columna de Acciones */}
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
                ))
              ) : (
                // RENDERIZADO CUANDO HAY REACTIVOS, PERO NINGUNO COINCIDE CON LA BÚSQUEDA
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                    <p className="text-sm">No se encontraron reactivos que coincidan con los criterios de búsqueda.</p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedHazards([]);
                      }}
                      className="mt-2 text-xs text-cyan-600 font-medium hover:underline"
                    >
                      Restablecer todos los filtros
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
