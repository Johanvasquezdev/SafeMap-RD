using SafeMap.Application.DTOs;
using SafeMap.Application.Interfaces;
using SafeMap.Application.Mappers;
using SafeMap.Domain.Entities;
using SafeMap.Domain.Interfaces;
using SafeMap.Domain.Enums;

namespace SafeMap.Application.UseCases;

/// <summary>
/// Caso de uso que obtiene los incidentes, aplica el filtro opcional por tipo
/// y mapea las entidades de dominio a DTOs para el cliente.
/// </summary>
public class GetIncidentsUseCase : IIncidentService
{
    private readonly IIncidentRepository _repository;

    /// <summary>
    /// Inicializa el caso de uso inyectando el repositorio de incidentes.
    /// </summary>
    public GetIncidentsUseCase(IIncidentRepository repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// Ejecuta la consulta de incidentes con filtro opcional por tipo.
    /// Si el tipo es nulo o vacío, retorna todos los incidentes.
    /// </summary>
    public async Task<IReadOnlyList<IncidentDto>> GetIncidentsAsync(string? type)
    {
        var incidents = new List<Incident>();

        // Si se especificó un tipo válido, filtrar — de lo contrario traer todos
        if (!string.IsNullOrWhiteSpace(type) && Enum.TryParse<IncidentType>(type, ignoreCase: true, out var incidentType))
        {
            incidents = await _repository.GetByTypeAsync(incidentType);
        }
        else
        {
            incidents = await _repository.GetAllAsync();
        }

        // Mapear entidades de dominio a DTOs para no exponer el modelo interno.
        return incidents.Select(IncidentMapper.ToDto).ToList();
    }
}
