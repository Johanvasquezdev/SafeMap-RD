import type { Incident } from "./types";

export const mockIncidents: Incident[] = [
  {
    id: 1,
    lat: 18.4861,
    lng: -69.9312,
    type: "Robbery",
    description: "Phone stolen",
    date: "2026-04-20",
  },
  {
    id: 2,
    lat: 18.47,
    lng: -69.94,
    type: "Assault",
    description: "Street incident",
    date: "2026-04-19",
  },
  {
    id: 3,
    lat: 18.475,
    lng: -69.925,
    type: "Theft",
    description: "Vehicle break-in reported",
    date: "2026-04-18",
  },
  {
    id: 4,
    lat: 18.49,
    lng: -69.935,
    type: "Robbery",
    description: "Armed robbery at convenience store",
    date: "2026-04-17",
  },
  {
    id: 5,
    lat: 18.465,
    lng: -69.92,
    type: "Assault",
    description: "Physical altercation reported",
    date: "2026-04-16",
  },
];

// This function is structured for future API integration
export async function getIncidents(): Promise<Incident[]> {
  // In the future, this will fetch from: GET /api/incidents
  // return fetch('/api/incidents').then(res => res.json());
  return mockIncidents;
}
