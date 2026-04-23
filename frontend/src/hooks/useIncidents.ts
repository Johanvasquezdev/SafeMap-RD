import { useCallback, useEffect, useMemo, useState } from "react";
import { getIncidents } from "@/services/incident.service";
import type {
  Incident,
  IncidentFilterType,
  IncidentType,
} from "@/types/incident.types";

// Este hook encapsula toda la logica de carga/filtro/estado para no contaminar la capa de UI.
export function useIncidents() {
  const [selectedType, setSelectedType] = useState<IncidentFilterType>("ALL");
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidentes = useCallback(async (filterType: IncidentFilterType) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getIncidents(
        filterType === "ALL" ? undefined : filterType
      );
      setIncidents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrio un error cargando los incidentes."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchIncidentes(selectedType);
  }, [fetchIncidentes, selectedType]);

  const incidentsByType = useMemo(
    () =>
      (["Robbery", "Assault", "Theft"] as IncidentType[]).map((type) => ({
        type,
        count: incidents.filter((incident) => incident.type === type).length,
      })),
    [incidents]
  );

  return {
    selectedType,
    setSelectedType,
    incidents,
    isLoading,
    error,
    incidentsByType,
    fetchIncidentes,
  };
}
