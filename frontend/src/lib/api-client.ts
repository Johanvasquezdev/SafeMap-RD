import { env } from "@/config/env";

// Este cliente encapsula la construccion de URLs y llamadas HTTP reutilizables.
function buildUrl(path: string): string {
  if (!env.apiBaseUrl) return path;

  const base = env.apiBaseUrl.replace(/\/$/, "");
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${safePath}`;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Solicitud fallida (${response.status}).`);
  }

  return response.json() as Promise<T>;
}
