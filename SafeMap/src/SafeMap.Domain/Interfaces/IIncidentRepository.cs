using SafeMap.Domain.Entities;
using SafeMap.Domain.Enums;

namespace SafeMap.Domain.Interfaces;

/// <summary>
/// Contrato que define las operaciones de consulta de incidentes.
/// La implementación concreta vive en la capa de infraestructura.
/// </summary>
public interface IIncidentRepository
{
    /// <summary>Retorna todos los incidentes registrados en el sistema.</summary>
    Task<List<Incident>> GetAllAsync();

    /// <summary>Retorna los incidentes filtrados por tipo específico.</summary>
    Task<List<Incident>> GetByTypeAsync(IncidentType type);
}
