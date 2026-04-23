"use client";

import dynamic from "next/dynamic";
import type { Incident } from "@/types/incident.types";

interface MapProps {
  incidents: Incident[];
}

// Dynamically import the map to avoid SSR issues with Leaflet
const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border bg-card flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        {/* Este estado mantiene claridad mientras el mapa se hidrata en cliente. */}
        <p className="text-sm text-muted-foreground">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export function Map({ incidents }: MapProps) {
  return <MapContent incidents={incidents} />;
}
