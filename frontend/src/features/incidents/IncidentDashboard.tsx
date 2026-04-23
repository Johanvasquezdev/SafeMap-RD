"use client";

import { Shield } from "lucide-react";
import { Filters } from "@/components/filters/Filters";
import { IncidentList } from "@/components/incidents/IncidentList";
import { Map } from "@/components/map/Map";
import { useIncidents } from "@/hooks/useIncidents";
import { INCIDENT_LABELS_ES } from "@/types/incident.types";

// Este componente actua como contenedor/presentador: orquesta estados y delega render a componentes UI.
export function IncidentDashboard() {
  const {
    selectedType,
    setSelectedType,
    incidents,
    isLoading,
    error,
    incidentsByType,
    fetchIncidentes,
  } = useIncidents();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0c2138_0%,_#070d18_40%,_#04070f_100%)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060b14]/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-2">
                <Shield className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  SafeMap
                </h1>
                <p className="text-sm text-slate-300">
                  Prototipo de seguimiento ciudadano para seguridad diaria
                </p>
              </div>
            </div>

            <Filters selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-[500px] lg:h-[600px]">
              <Map incidents={incidents} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-lg font-semibold text-foreground">
                Incidentes recientes
              </h2>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-500/15 px-2.5 py-1 text-sm text-cyan-100">
                {incidents.length} encontrados
              </span>
            </div>

            <div className="max-h-[540px] space-y-3 overflow-y-auto pr-1 scrollbar-thin">
              <IncidentList
                incidents={incidents}
                isLoading={isLoading}
                error={error}
                onRetry={() => void fetchIncidentes(selectedType)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          {incidentsByType.map(({ type, count }) => {
            const colorClass =
              type === "Robbery"
                ? "bg-robbery"
                : type === "Assault"
                  ? "bg-assault"
                  : "bg-theft";
            const textClass =
              type === "Robbery" || type === "Assault"
                ? "text-robbery"
                : "text-theft";

            return (
              <div
                key={type}
                className="rounded-xl border border-white/10 bg-black/30 p-4 transition-colors hover:border-cyan-300/40"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${colorClass}`} />
                  <span className="text-sm text-slate-300">
                    {INCIDENT_LABELS_ES[type]}
                  </span>
                </div>
                <p className={`mt-2 text-2xl font-bold ${textClass}`}>{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
