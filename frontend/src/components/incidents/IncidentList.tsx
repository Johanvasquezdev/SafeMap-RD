"use client";

import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { Button } from "@/components/ui/button";
import type { Incident } from "@/types/incident.types";

interface IncidentListProps {
  incidents: Incident[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

// Este componente concentra los estados visuales de la lista para mantener el dashboard mas limpio.
export function IncidentList({
  incidents,
  isLoading,
  error,
  onRetry,
}: IncidentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="h-28 animate-pulse rounded-xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-in fade-in rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-100 duration-300">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
        <Button
          variant="outline"
          className="mt-3 border-red-300/30 bg-red-950/20 hover:bg-red-950/40"
          onClick={onRetry}
        >
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Reintentar
        </Button>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="animate-in fade-in rounded-xl border border-white/10 bg-white/5 py-12 text-center text-slate-300 duration-300">
        <WifiOff className="mx-auto mb-3 h-6 w-6 text-slate-400" />
        <p>No hay incidentes para el filtro seleccionado.</p>
      </div>
    );
  }

  return (
    <>
      {incidents.map((incident, index) => (
        <IncidentCard key={incident.id} incident={incident} index={index} />
      ))}
    </>
  );
}
