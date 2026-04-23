# This Dockerfile builds and runs the SafeMap .NET API for Render deployment.
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files first to optimize restore cache.
COPY SafeMap/src/SafeMap.Domain/SafeMap.Domain.csproj SafeMap/src/SafeMap.Domain/
COPY SafeMap/src/SafeMap.Application/SafeMap.Application.csproj SafeMap/src/SafeMap.Application/
COPY SafeMap/src/SafeMap.Infrastructure/SafeMap.Infrastructure.csproj SafeMap/src/SafeMap.Infrastructure/
COPY SafeMap/src/SafeMap.Persistence/SafeMap.Persistence.csproj SafeMap/src/SafeMap.Persistence/
COPY SafeMap/src/SafeMap.IoC/SafeMap.IoC.csproj SafeMap/src/SafeMap.IoC/
COPY SafeMap/src/SafeMap.API/SafeMap.API.csproj SafeMap/src/SafeMap.API/

RUN dotnet restore SafeMap/src/SafeMap.API/SafeMap.API.csproj

# Copy full source and publish.
COPY . .
RUN dotnet publish SafeMap/src/SafeMap.API/SafeMap.API.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Render sets PORT at runtime; default to 10000 for local container runs.
ENV PORT=10000
ENV ASPNETCORE_URLS=http://+:${PORT}
ENV ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .
EXPOSE 10000

ENTRYPOINT ["dotnet", "SafeMap.API.dll"]
