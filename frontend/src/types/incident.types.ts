// Este archivo centraliza los tipos y metadatos visuales de incidentes para mantener consistencia en toda la UI.
export type IncidentType = "Robbery" | "Assault" | "Theft";

export type IncidentFilterType = IncidentType | "ALL";

export interface Incident {
  id: number;
  latitude: number;
  longitude: number;
  type: IncidentType;
  description: string;
  date: string;
}

export const INCIDENT_LABELS_ES: Record<IncidentType, string> = {
  Robbery: "Robo",
  Assault: "Agresion",
  Theft: "Hurto",
};

export const INCIDENT_COLORS: Record<IncidentType, string> = {
  Robbery: "bg-robbery text-white",
  Assault: "bg-assault text-black",
  Theft: "bg-theft text-black",
};

export const MARKER_COLORS: Record<IncidentType, string> = {
  Robbery: "#dc2626",
  Assault: "#f97316",
  Theft: "#eab308",
};

export const INCIDENT_TYPE_OPTIONS: Array<{
  value: IncidentFilterType;
  label: string;
}> = [
  { value: "ALL", label: "Todos los incidentes" },
  { value: "Robbery", label: "Robo" },
  { value: "Assault", label: "Agresion" },
  { value: "Theft", label: "Hurto" },
];
