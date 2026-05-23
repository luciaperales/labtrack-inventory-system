import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "default" | "warning" | "danger";
}

const tones = {
  default: {
    iconBg: "bg-cyan-50 text-cyan-700",
    accent: "text-slate-900",
  },
  warning: {
    iconBg: "bg-amber-50 text-amber-700",
    accent: "text-amber-700",
  },
  danger: {
    iconBg: "bg-rose-50 text-rose-700",
    accent: "text-rose-700",
  },
} as const;

export function MetricCard({ label, value, icon: Icon, tone = "default" }: MetricCardProps) {
  const t = tones[tone];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${t.iconBg}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className={`mt-3 text-3xl font-semibold tracking-tight ${t.accent}`}>{value}</p>
    </div>
  );
}
