"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import {
  INCIDENT_COLORS,
  INCIDENT_LABELS_ES,
  type Incident,
} from "@/types/incident.types";

interface IncidentCardProps {
  incident: Incident;
  index: number;
}

export function IncidentCard({ incident, index }: IncidentCardProps) {
  // Esta funcion estandariza la fecha al formato local en espanol.
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-DO", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className="group bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge
                className={`${INCIDENT_COLORS[incident.type]} font-medium text-xs px-2.5 py-0.5 border-0`}
              >
                {INCIDENT_LABELS_ES[incident.type]}
              </Badge>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {incident.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(incident.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {incident.latitude.toFixed(4)}, {incident.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
