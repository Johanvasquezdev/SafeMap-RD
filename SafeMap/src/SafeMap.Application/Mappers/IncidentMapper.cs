using SafeMap.Application.DTOs;
using SafeMap.Domain.Entities;

namespace SafeMap.Application.Mappers;

// Este mapper centraliza la transformacion Domain -> DTO para mantener consistencia.
public static class IncidentMapper
{
    public static IncidentDto ToDto(Incident incident)
    {
        return new IncidentDto
        {
            Id = incident.Id,
            Latitude = incident.Latitude,
            Longitude = incident.Longitude,
            Type = incident.Type.ToString(),
            Description = incident.Description,
            Date = incident.Date
        };
    }
}
