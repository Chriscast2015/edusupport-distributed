/*
 // Este archivo corresponde a una "instantánea del modelo" (`ModelSnapshot`) de la base de datos.
// Su propósito principal es ayudar a EF Core a detectar los cambios en el modelo de datos y
// facilitar la creación de futuras migraciones.
//
// Clase: AppDbContextModelSnapshot
// Ubicación: Carpeta Migrations del proyecto EduSupport.Server
// 
// Esta clase representa el estado actual del modelo de datos en el contexto AppDbContext. 
// Contiene las definiciones de las entidades y sus propiedades, así como anotaciones relacionadas 
// con la base de datos (como el uso de columnas identidad en SQL Server)
 
 */
using EduSupport.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EduSupport.Server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EduSupport.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
