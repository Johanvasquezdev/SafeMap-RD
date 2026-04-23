export type IncidentType = "Robbery" | "Assault" | "Theft";

export interface Incident {
  id: number;
  lat: number;
  lng: number;
  type: IncidentType;
  description: string;
  date: string;
}

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
