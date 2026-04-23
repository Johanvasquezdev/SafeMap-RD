using SafeMap.Domain.Entities;
using SafeMap.Domain.Enums;
using SafeMap.Domain.Interfaces;

namespace SafeMap.Infrastructure.Repositories;

/// <summary>
/// Implementación en memoria del repositorio de incidentes.
/// Contiene datos de muestra con coordenadas reales de Santo Domingo, RD.
/// No requiere base de datos ni Entity Framework.
/// </summary>
public class InMemoryIncidentRepository : IIncidentRepository
{
    /// <summary>Lista estática de incidentes precargados como fuente de datos del sistema.</summary>
    private static readonly List<Incident> _incidents = new()
    {
        new Incident
        {
            Id          = 1,
            Latitude    = 18.4861,
            Longitude   = -69.9312,
            Type        = IncidentType.Robbery,
            Description = "Robo a mano armada frente al parque Independencia.",
            Date        = new DateTime(2026, 4, 10, 20, 30, 0)
        },
        new Incident
        {
            Id          = 2,
            Latitude    = 18.4720,
            Longitude   = -69.9510,
            Type        = IncidentType.Assault,
            Description = "Agresión física reportada en la avenida Winston Churchill.",
            Date        = new DateTime(2026, 4, 12, 23, 15, 0)
        },
        new Incident
        {
            Id          = 3,
            Latitude    = 18.5001,
            Longitude   = -69.9840,
            Type        = IncidentType.Theft,
            Description = "Hurto de motocicleta en el sector Los Prados.",
            Date        = new DateTime(2026, 4, 14, 14, 00, 0)
        },
        new Incident
        {
            Id          = 4,
            Latitude    = 18.4650,
            Longitude   = -69.9200,
            Type        = IncidentType.Robbery,
            Description = "Asalto a transeúnte en la avenida Duarte.",
            Date        = new DateTime(2026, 4, 15, 21, 45, 0)
        },
        new Incident
        {
            Id          = 5,
            Latitude    = 18.4790,
            Longitude   = -69.9410,
            Type        = IncidentType.Theft,
            Description = "Robo de celular en el Centro Comercial Acropolis.",
            Date        = new DateTime(2026, 4, 17, 16, 20, 0)
        },
        new Incident
        {
            Id          = 6,
            Latitude    = 18.4910,
            Longitude   = -69.9600,
            Type        = IncidentType.Assault,
            Description = "Pelea callejera con heridos en la avenida 27 de Febrero.",
            Date        = new DateTime(2026, 4, 18, 22, 00, 0)
        }
    };

    /// <summary>Retorna todos los incidentes de la lista en memoria.</summary>
    public Task<List<Incident>> GetAllAsync()
        => Task.FromResult(_incidents);

    /// <summary>Retorna solo los incidentes que coincidan con el tipo especificado.</summary>
    public Task<List<Incident>> GetByTypeAsync(IncidentType type)
        => Task.FromResult(_incidents.Where(i => i.Type == type).ToList());
}
