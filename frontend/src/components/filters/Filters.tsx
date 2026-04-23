"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INCIDENT_TYPE_OPTIONS,
  type IncidentFilterType,
} from "@/types/incident.types";

interface FiltersProps {
  selectedType: IncidentFilterType;
  onTypeChange: (type: IncidentFilterType) => void;
}

export function Filters({ selectedType, onTypeChange }: FiltersProps) {
  return (
    <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
      {/* Este selector permite cambiar el tipo y delega el refetch al contenedor principal. */}
      <label className="text-sm font-medium text-muted-foreground">
        Filtrar por tipo:
      </label>
      <Select
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as IncidentFilterType)}
      >
        <SelectTrigger className="w-[180px] bg-card border-border hover:bg-accent transition-colors">
          <SelectValue placeholder="Seleccionar tipo" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          {INCIDENT_TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className="flex items-center gap-2">
                {option.value !== "ALL" ? (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      option.value === "Robbery"
                        ? "bg-robbery"
                        : option.value === "Assault"
                          ? "bg-assault"
                          : "bg-theft"
                    }`}
                  />
                ) : null}
                {option.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
