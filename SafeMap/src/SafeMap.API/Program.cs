using SafeMap.API.Middleware;
using SafeMap.IoC;

var builder = WebApplication.CreateBuilder(args);

// Esta configuracion delega el registro de dependencias al proyecto IoC.
builder.Services.AddSafeMapDependencies();

var corsOriginsRaw =
    builder.Configuration["Cors:AllowedOrigins"] ??
    builder.Configuration["FRONTEND_ORIGINS"];

var corsOrigins = (corsOriginsRaw ?? string.Empty)
    .Split(new[] { ',', ';' }, StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        // Esta politica evita CORS abierto y permite configurar dominios reales por entorno.
        if (corsOrigins.Length > 0)
        {
            policy.WithOrigins(corsOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
            return;
        }

        if (builder.Environment.IsDevelopment())
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors("Frontend");
app.UseHttpsRedirection();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapControllers();
app.Run();
