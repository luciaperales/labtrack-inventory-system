import { GHS_PICTOGRAMS } from "../constants/ghs";

interface GHSFilterBarProps {
    selectedHazards: string[];
    onToggleHazard: (hazardId: string) => void;
    onClearFilters: () => void;
}

export function GHSFilterBar({ selectedHazards, onToggleHazard, onClearFilters }: GHSFilterBarProps) {
    return (
        <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
                Filtrar por riesgo:
            </span>

            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {Object.values(GHS_PICTOGRAMS).map((pictogram) => {
                    const isActive = selectedHazards.includes(pictogram.id);

                    return (
                        <button
                            key={pictogram.id}
                            onClick={() => onToggleHazard(pictogram.id)}
                            className={`relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${isActive
                                    ? "scale-105 bg-white shadow-sm opacity-100"
                                    : "opacity-40 hover:opacity-70"
                                }`}
                            title={`Filtrar por ${pictogram.name}`}
                        >
                            <img
                                src={pictogram.icon}
                                alt={pictogram.name}
                                className={`w-full h-full object-contain ${isActive ? "" : "grayscale"
                                    }`}
                            />
                        </button>
                    );
                })}

                {/* Botón rápido para limpiar los filtros de pictograma si hay alguno activo */}
                {selectedHazards.length > 0 && (
                    <button
                        onClick={onClearFilters}
                        className="ml-1 px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-sm"
                    >
                        Limpiar
                    </button>
                )}
            </div>
        </div>
    );
}