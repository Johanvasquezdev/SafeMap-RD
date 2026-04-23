namespace SafeMap.Application.DTOs;

/// <summary>
/// Objeto de transferencia de datos que expone la información de un incidente al cliente HTTP.
/// Evita exponer directamente la entidad de dominio.
/// </summary>
public class IncidentDto
{
    /// <summary>Identificador único del incidente.</summary>
    public int Id { get; set; }

    /// <summary>Latitud geográfica del incidente.</summary>
    public double Latitude { get; set; }

    /// <summary>Longitud geográfica del incidente.</summary>
    public double Longitude { get; set; }

    /// <summary>Tipo de incidente como texto legible.</summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>Descripción del incidente.</summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>Fecha y hora del incidente en formato ISO 8601.</summary>
    public DateTime Date { get; set; }
}
