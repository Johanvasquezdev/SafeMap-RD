using Microsoft.AspNetCore.Mvc;
using SafeMap.Application.Interfaces;

namespace SafeMap.API.Controllers;

/// <summary>
/// Controlador que expone el endpoint de consulta de incidentes criminales.
/// No contiene lógica de negocio — delega todo al caso de uso.
/// </summary>
[ApiController]
[Route("api/incidents")]
public class IncidentsController : ControllerBase
{
    private readonly IIncidentService _incidentService;

    /// <summary>
    /// Inicializa el controlador inyectando el caso de uso de incidentes.
    /// </summary>
    public IncidentsController(IIncidentService incidentService)
    {
        _incidentService = incidentService;
    }

    /// <summary>
    /// Retorna la lista de incidentes con filtro opcional por tipo.
    /// Ejemplo: GET /api/incidents?type=Robbery
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetIncidents([FromQuery] string? type)
    {
        // Delegar la consulta y el filtrado al caso de uso
        var incidents = await _incidentService.GetIncidentsAsync(type);
        return Ok(incidents);
    }
}
