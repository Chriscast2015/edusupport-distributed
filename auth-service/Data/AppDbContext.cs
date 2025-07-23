/*
Clase que representa el contexto de base de datos para la aplicación EduSupport, utilizando Entity Framework Core. 
Establece la conexión entre los modelos de la aplicación y las tablas de la base de datos.

Características Principales:
---------------------------
✔ Configuración básica de DbContext
✔ Mapeo de entidades a tablas de base de datos
✔ Inyección de dependencias mediante DbContextOptions
✔ Punto central para configuraciones de EF Core
 
 */

using Microsoft.EntityFrameworkCore;
using EduSupport.Server.Models;

namespace EduSupport.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }
        public DbSet<User> Users { get; set; }
    }
}