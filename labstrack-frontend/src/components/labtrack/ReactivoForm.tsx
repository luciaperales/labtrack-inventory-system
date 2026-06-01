import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { EstadoReactivo, Reactivo, ReactivoInput, UnidadReactivo } from "@/types/reactivo";
import { Loader2 } from "lucide-react";
import { GHS_PICTOGRAMS } from "@/components/constants/ghs"; 

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial?: Reactivo | null;
  onSubmit: (data: ReactivoInput) => Promise<void>;
}

const empty: ReactivoInput = {
  nombre: "",
  formula: "",
  cantidad: 0,
  unidad: "g",
  ubicacion: "",
  estado: "Disponible",
  ghs_hazards: "", // <-- Inicializador vacío
};

export function ReactivoForm({ open, onOpenChange, initial, onSubmit }: Props) {
  const [data, setData] = useState<ReactivoInput>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setErrors({});
      setData(
        initial
          ? {
            nombre: initial.nombre,
            formula: initial.formula ?? "",
            cantidad: initial.cantidad,
            unidad: initial.unidad,
            ubicacion: initial.ubicacion,
            estado: initial.estado,
            ghs_hazards: initial.ghs_hazards ?? "", // <-- Cargamos el valor de Neon
          }
          : empty,
      );
    }
  }, [open, initial]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (data.cantidad === null || data.cantidad === undefined || Number.isNaN(Number(data.cantidad)))
      e.cantidad = "La cantidad es obligatoria";
    else if (Number(data.cantidad) < 0) e.cantidad = "No puede ser negativa";
    if (!data.ubicacion.trim()) e.ubicacion = "La ubicación es obligatoria";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSubmit({ ...data, formula: data.formula?.trim() || undefined });
      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  // Función manejadora para los checkboxes del SGA
  const handleHazardChange = (hazardId: string, checked: boolean) => {
    const currentHazards = data.ghs_hazards
      ? data.ghs_hazards.split(",").map(h => h.trim()).filter(Boolean)
      : [];

    let updatedHazards: string[];
    if (checked) {
      updatedHazards = [...currentHazards, hazardId];
    } else {
      updatedHazards = currentHazards.filter(h => h !== hazardId);
    }

    setData({ ...data, ghs_hazards: updatedHazards.join(",") });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? "Editar Reactivo" : "Registrar Reactivo"}</DialogTitle>
          <DialogDescription>
            {initial ? "Actualiza los datos del reactivo." : "Completa los datos para añadir un nuevo reactivo al inventario."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre del Reactivo *</Label>
            <Input
              id="nombre"
              value={data.nombre}
              onChange={(e) => setData({ ...data, nombre: e.target.value })}
              placeholder="Ej: Ácido Sulfúrico"
            />
            {errors.nombre && <p className="text-xs text-rose-600">{errors.nombre}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="formula">Fórmula Química</Label>
            <Input
              id="formula"
              value={data.formula ?? ""}
              onChange={(e) => setData({ ...data, formula: e.target.value })}
              placeholder="Ej: H₂SO₄"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cantidad">Cantidad *</Label>
              <Input
                id="cantidad"
                type="number"
                min={0}
                step="any"
                value={data.cantidad}
                onChange={(e) => setData({ ...data, cantidad: Number(e.target.value) })}
              />
              {errors.cantidad && <p className="text-xs text-rose-600">{errors.cantidad}</p>}
            </div>
            <div className="grid gap-2">
              <Label>Unidad</Label>
              <Select value={data.unidad} onValueChange={(v) => setData({ ...data, unidad: v as UnidadReactivo })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ubicacion">Ubicación *</Label>
            <Input
              id="ubicacion"
              value={data.ubicacion}
              onChange={(e) => setData({ ...data, ubicacion: e.target.value })}
              placeholder="Ej: Vitrina B"
            />
            {errors.ubicacion && <p className="text-xs text-rose-600">{errors.ubicacion}</p>}
          </div>

          <div className="grid gap-2">
            <Label>Estado</Label>
            <Select value={data.estado} onValueChange={(v) => setData({ ...data, estado: v as EstadoReactivo })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Critico">Critico</SelectItem>
                <SelectItem value="Agotado">Agotado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NUEVA SECCIÓN: Pictogramas de Seguridad (SGA) */}
          <div className="grid gap-2 border-t pt-4 border-slate-100">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pictogramas de Seguridad (SGA)
            </Label>
            <div className="grid grid-cols-2 gap-2.5 mt-1">
              {Object.values(GHS_PICTOGRAMS).map((pictogram) => {
                const hazardsString = data.ghs_hazards || (data as any).ghsHazards || "";

                const isChecked = hazardsString
                  ? hazardsString.split(",").map((h: string) => h.trim()).includes(pictogram.id)
                  : false;

                return (
                  <label
                    key={pictogram.id}
                    className={`flex items-center gap-3.5 p-2.5 rounded-xl border cursor-pointer text-xs font-medium transition-all duration-200 select-none ${isChecked
                      ? "border-cyan-200 bg-cyan-50/40 text-cyan-950 shadow-sm ring-1 ring-cyan-100"
                      : "border-slate-100 bg-white hover:bg-slate-50 text-slate-600"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => handleHazardChange(pictogram.id, e.target.checked)}
                      className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 w-4 h-4 transition"
                    />

                    {/* Contenedor del Pictograma con Proporciones Estables */}
                    <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
                      <img
                        src={pictogram.icon}
                        alt={pictogram.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="text-xs leading-tight font-medium text-slate-700">
                      {pictogram.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving} className="bg-cyan-600 hover:bg-cyan-700 text-white">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initial ? "Guardar cambios" : "Registrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}