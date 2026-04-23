using SafeMap.Domain.Enums;

namespace SafeMap.Domain.Entities;

/// <summary>
/// Entidad principal que representa un incidente criminal registrado en el mapa.
/// </summary>
public class Incident
{
    /// <summary>Identificador único del incidente.</summary>
    public int Id { get; set; }

    /// <summary>Coordenada de latitud donde ocurrió el incidente.</summary>
    public double Latitude { get; set; }

    /// <summary>Coordenada de longitud donde ocurrió el incidente.</summary>
    public double Longitude { get; set; }

    /// <summary>Tipo de incidente según la clasificación del sistema.</summary>
    public IncidentType Type { get; set; }

    /// <summary>Descripción textual del incidente.</summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>Fecha y hora en que ocurrió el incidente.</summary>
    public DateTime Date { get; set; }
}
