/*
 Este objeto se utiliza para la transferencia de datos (Data Transfer Object) durante el
// proceso de inicio de sesión de un usuario en el sistema EduSupport.
//
// Contiene únicamente los campos necesarios para autenticar al usuario: correo electrónico
// y contraseña en texto plano (que luego será validada y hasheada en el backend).
//
// Este DTO se utiliza típicamente en el controlador de autenticación al recibir una solicitud
// POST con credenciales.
 
 */

namespace EduSupport.Server.Models
{
    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}