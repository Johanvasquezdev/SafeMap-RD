import { apiGet } from "@/lib/api-client";
import type { Incident, IncidentType } from "@/types/incident.types";

// Este servicio encapsula el acceso HTTP a incidentes para separar datos de la capa de UI.
function getIncidentsPath(type?: IncidentType): string {
  const url = new URL("http://localhost/api/incidents");
  if (type) {
    url.searchParams.set("type", type);
  }
  return `${url.pathname}${url.search}`;
}

function normalizeIncident(raw: unknown): Incident {
  const item = raw as Partial<Incident>;

  if (
    typeof item?.id !== "number" ||
    typeof item?.latitude !== "number" ||
    typeof item?.longitude !== "number" ||
    (item?.type !== "Robbery" && item?.type !== "Assault" && item?.type !== "Theft") ||
    typeof item?.description !== "string" ||
    typeof item?.date !== "string"
  ) {
    throw new Error("Formato de incidente invalido recibido desde API.");
  }

  return {
    id: item.id,
    latitude: item.latitude,
    longitude: item.longitude,
    type: item.type,
    description: item.description,
    date: item.date,
  };
}

export async function getIncidents(type?: IncidentType): Promise<Incident[]> {
  const data: unknown = await apiGet<unknown>(getIncidentsPath(type));
  if (!Array.isArray(data)) {
    throw new Error("La respuesta de incidentes no es una lista.");
  }

  return data.map(normalizeIncident);
}
