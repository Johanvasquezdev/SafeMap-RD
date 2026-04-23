using Microsoft.Extensions.DependencyInjection;
using SafeMap.Application.Interfaces;
using SafeMap.Application.UseCases;
using SafeMap.Domain.Interfaces;
using SafeMap.Infrastructure.Repositories;

namespace SafeMap.IoC;

// Este modulo centraliza el cableado de dependencias para respetar inversion de control.
public static class DependencyInjection
{
    public static IServiceCollection AddSafeMapDependencies(this IServiceCollection services)
    {
        services.AddScoped<IIncidentRepository, InMemoryIncidentRepository>();
        services.AddScoped<IIncidentService, GetIncidentsUseCase>();

        return services;
    }
}
