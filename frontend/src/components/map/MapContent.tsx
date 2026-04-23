"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  INCIDENT_COLORS,
  INCIDENT_LABELS_ES,
  MARKER_COLORS,
  type Incident,
} from "@/types/incident.types";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface MapContentProps {
  incidents: Incident[];
}

// Create custom marker icons for each incident type
function createMarkerIcon(type: Incident["type"]) {
  const color = MARKER_COLORS[type];
  const svgIcon = `
    <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="${color}"/>
      <circle cx="16" cy="16" r="8" fill="white" fill-opacity="0.3"/>
      <circle cx="16" cy="16" r="5" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

// Component to fit map bounds to incidents
function FitBounds({ incidents }: { incidents: Incident[] }) {
  const map = useMap();

  // Esta logica asegura que el mapa se ajuste automaticamente a los incidentes visibles.
  useEffect(() => {
    if (incidents.length === 0) return;

    const bounds = L.latLngBounds(
      incidents.map((i) => [i.latitude, i.longitude] as [number, number])
    );
    map.fitBounds(bounds.pad(0.2));
  }, [incidents, map]);

  return null;
}

export default function MapContent({ incidents }: MapContentProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-DO", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Default center (Santo Domingo, DR)
  const defaultCenter: [number, number] = [18.48, -69.93];

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/20 border border-border animate-in fade-in zoom-in-95 duration-700">
      <style jsx global>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background: hsl(240 6% 12%);
          color: hsl(0 0% 98%);
          border-radius: 0.75rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          border: 1px solid hsl(240 4% 20%);
        }
        .leaflet-popup-tip {
          background: hsl(240 6% 12%);
          border: 1px solid hsl(240 4% 20%);
        }
        .leaflet-popup-close-button {
          color: hsl(240 5% 65%) !important;
        }
        .leaflet-popup-close-button:hover {
          color: hsl(0 0% 98%) !important;
        }
        .leaflet-container {
          background: hsl(240 10% 8%);
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        .leaflet-control-zoom a {
          background: hsl(240 6% 12%) !important;
          color: hsl(0 0% 98%) !important;
          border: 1px solid hsl(240 4% 20%) !important;
        }
        .leaflet-control-zoom a:hover {
          background: hsl(240 5% 18%) !important;
        }
        .leaflet-control-attribution {
          background: hsl(240 6% 12%) !important;
          color: hsl(240 5% 65%) !important;
          opacity: 0.8;
        }
        .leaflet-control-attribution a {
          color: hsl(217 90% 60%) !important;
        }
      `}</style>

      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FitBounds incidents={incidents} />

        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
            icon={createMarkerIcon(incident.type)}
          >
            <Popup>
              <div className="p-1 min-w-[180px]">
                <Badge
                  className={`${INCIDENT_COLORS[incident.type]} font-medium text-xs px-2 py-0.5 border-0 mb-2`}
                >
                  {INCIDENT_LABELS_ES[incident.type]}
                </Badge>
                <p className="text-sm font-medium mb-1 text-white">
                  {incident.description}
                </p>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <CalendarDays className="h-3 w-3" />
                  {formatDate(incident.date)}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-robbery" />
            Robo
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-assault" />
            Agresion
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-3 w-3 rounded-full bg-theft" />
            Hurto
          </div>
        </div>
      </div>
    </div>
  );
}
