using SafeMap.Application.DTOs;

namespace SafeMap.Application.Interfaces;

// Esta interfaz define el contrato del caso de uso para desacoplar API de Application.
public interface IIncidentService
{
    Task<IReadOnlyList<IncidentDto>> GetIncidentsAsync(string? type);
}
