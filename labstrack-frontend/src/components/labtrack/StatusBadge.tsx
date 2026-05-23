import type { EstadoReactivo } from "@/types/reactivo";

const styles: Record<EstadoReactivo, string> = {
  Disponible: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  Critico: "bg-amber-100 text-amber-800 ring-amber-200",
  Agotado: "bg-rose-100 text-rose-800 ring-rose-200",
};

export function StatusBadge({ estado }: { estado: EstadoReactivo }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[estado]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {estado}
    </span>
  );
}
