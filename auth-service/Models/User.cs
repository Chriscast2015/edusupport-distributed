/*
  Esta clase representa la entidad "User" dentro del sistema EduSupport.
//
// Contiene las propiedades que definen la estructura de un usuario en la base de datos, tales
// como identificador, credenciales y datos personales.
//
// Este modelo se utiliza con Entity Framework Core para mapear la entidad "Users" a una tabla
// del mismo nombre en la base de datos.
 */

namespace EduSupport.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }

    }
}