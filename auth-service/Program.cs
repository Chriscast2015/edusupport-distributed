/*
 / Este es el punto de entrada principal para la aplicación backend de EduSupport.
// Configura y arranca la aplicación ASP.NET Core con los siguientes servicios:
//
// 1. Controladores y Swagger para documentación de la API.
// 2. Entity Framework Core con conexión a SQL Server.
// 3. CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde otros orígenes.
// 4. Autenticación con JWT Bearer (tokens firmados para proteger rutas).
// 5. Archivos estáticos y fallback para una SPA (como React) alojada en wwwroot.
//
// El pipeline HTTP se configura para aplicar redirección HTTPS, autenticación, autorización
// y manejo de rutas controladas (API) y no controladas (SPA).
 */


using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using EduSupport.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Add services to the container.

// 1.1 Controllers & Swagger/OpenAPI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 1.2 Entity Framework Core – SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// 1.3 CORS (Allow any origin/header/method – ajustar según necesidad)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// 1.4 Authentication – JWT Bearer
var jwtSection = builder.Configuration.GetSection("JwtSettings");
var keyBytes = System.Text.Encoding.UTF8.GetBytes(jwtSection["Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSection["Issuer"],
        ValidAudience = jwtSection["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
    };
});

// 1.5 (Opcional) SpaStaticFiles – para servir el front desde wwwroot/ClientApp/build
/*builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});*/

var app = builder.Build();

// 2. Configure the HTTP request pipeline.

// 2.1 Swagger en Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 2.2 HTTPS Redirection
app.UseHttpsRedirection();

// 2.3 CORS
app.UseCors("AllowAll");

// 2.4 Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// 2.5 Archivos estáticos y SPA
app.UseDefaultFiles();
app.UseStaticFiles();

/*if (!app.Environment.IsDevelopment())
{
    app.UseSpaStaticFiles();
}*/

// 2.6 Map Controllers
app.MapControllers();

// 2.7 Fallback para SPA – servirá index.html
app.MapFallbackToFile("index.html");

app.Run();