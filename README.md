# SafeMap

![Estado](https://img.shields.io/badge/estado-prototipo_funcional-0ea5e9)
![Backend](https://img.shields.io/badge/backend-.NET_8-512bd4)
![Frontend](https://img.shields.io/badge/frontend-Next.js_16-000000)
![Deploy](https://img.shields.io/badge/deploy-Render-46e3b7)
![Arquitectura](https://img.shields.io/badge/arquitectura-Clean_Architecture-2563eb)
![Idioma](https://img.shields.io/badge/idioma-ES-ef4444)

Aplicacion de seguimiento de incidentes de seguridad con arquitectura limpia:

- Backend: .NET 8 Web API (Clean Architecture)
- Frontend: Next.js + TypeScript + Tailwind + shadcn/ui

## Descripcion del proyecto
<img width="1857" height="1067" alt="image" src="https://github.com/user-attachments/assets/25e4f975-5020-43b1-8d79-16fe8b588c54" />

SafeMap es una aplicacion orientada a la visualizacion de incidentes de seguridad en un mapa urbano, con filtros por tipo de incidente y una interfaz clara para consulta rapida.  
El objetivo es ofrecer un prototipo util y entendible que ayude a las personas a tomar decisiones cotidianas con mayor contexto de riesgo en su zona.

## Como ayuda en la seguridad y vida diaria

- Permite identificar zonas con mayor frecuencia de incidentes antes de salir.
- Ayuda a elegir rutas, horarios o medios de transporte con mejor criterio.
- Facilita la prevencion personal al mostrar patrones basicos (tipo y fecha de incidente).
- Mejora la conciencia situacional para residentes, estudiantes y trabajadores.
- Sirve como base para futuras funciones de alertas comunitarias y reportes ciudadanos.

## Estructura del proyecto

```text
safemap/
├── SafeMap/                    # Backend (.NET)
│   ├── SafeMap.sln
│   └── src/
│       ├── SafeMap.Domain/
│       ├── SafeMap.Application/
│       ├── SafeMap.Infrastructure/
│       ├── SafeMap.Persistence/
│       ├── SafeMap.IoC/
│       └── SafeMap.API/
├── frontend/                   # Frontend (Next.js)
└── render.yaml                 # Blueprint de Render (API + Web)
```

## Funcionalidad principal

- Consulta de incidentes desde `GET /api/incidents`
- Filtro opcional por tipo: `Robbery | Assault | Theft`
- Mapa con marcadores por categoria
- Lista de incidentes con estados de carga, vacio y error
- UI en espanol

## Requisitos

- .NET SDK 8
- Node.js 20+
- pnpm (via corepack)

## Ejecutar localmente

### 1) Backend

```bash
cd SafeMap
dotnet build SafeMap.sln
dotnet run --project src/SafeMap.API/SafeMap.API.csproj
```

API por defecto:

- `https://localhost:xxxx` (segun salida de consola)
- Salud: `/health`

### 2) Frontend

En `frontend/.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://localhost:xxxx
```

Luego:

```bash
cd frontend
corepack pnpm install
corepack pnpm dev
```

## Variables de entorno

### Backend (Render o produccion)

- `FRONTEND_ORIGINS`: dominios permitidos para CORS (separados por coma o punto y coma)

Ejemplo:

```env
FRONTEND_ORIGINS=https://safemap-web.onrender.com
```

### Frontend

- `NEXT_PUBLIC_API_BASE_URL`: URL publica del backend

Ejemplo:

```env
NEXT_PUBLIC_API_BASE_URL=https://safemap-api.onrender.com
```

## Despliegue en Render

El repositorio ya incluye:

- `Dockerfile` (API)
- `frontend/Dockerfile` (Web)
- `render.yaml` (2 servicios)

### Opcion A: Blueprint (recomendada)

1. En Render, crear servicio desde repositorio usando `render.yaml`.
2. Ajustar variables:
   - `FRONTEND_ORIGINS` en el servicio API
   - `NEXT_PUBLIC_API_BASE_URL` en el servicio Web
3. Desplegar ambos servicios.

### Opcion B: Manual

1. Crear Web Service `safemap-api`:
   - Dockerfile: `./Dockerfile`
   - Context: raiz del repo
   - Health check: `/health`
2. Crear Web Service `safemap-web`:
   - Dockerfile: `./frontend/Dockerfile`
   - Context: `./frontend`
3. Configurar variables de entorno como arriba.

## Endpoint principal

### `GET /api/incidents`

Query opcional:

- `type=Robbery`
- `type=Assault`
- `type=Theft`

Respuesta:

```json
[
  {
    "id": 1,
    "latitude": 18.4861,
    "longitude": -69.9312,
    "type": "Robbery",
    "description": "Phone stolen",
    "date": "2026-04-20T00:00:00"
  }
]
```

## Notas de arquitectura

- El controlador no contiene logica de negocio.
- Application define casos de uso e interfaces de aplicacion.
- Domain no depende de Infrastructure.
- Infrastructure implementa repositorios.
- Frontend separa UI, hooks, servicios y tipos.
- `fetch` se realiza en la capa `services/`.

## Estado del proyecto

Prototipo funcional orientado a validacion visual y flujo de negocio basico.
