/*
 Este objeto de transferencia de datos (Data Transfer Object) se utiliza en el proceso
// de registro de nuevos usuarios en el sistema EduSupport.
//
// Contiene los campos necesarios para registrar un usuario: nombre, apellido, correo y
// contraseña. Cada propiedad incluye validaciones mediante anotaciones de data (Data Annotations)
// para asegurar la integridad de los datos antes de ser procesados en el backend.
//
// Las validaciones aseguran:
// - Que los campos no estén vacíos (Required).
// - Que nombre y apellido tengan al menos 3 caracteres.
// - Que el correo tenga un formato válido.
// - Que la contraseña tenga al menos 8 caracteres, una mayúscula y un número.
//
// Este DTO es comúnmente utilizado en el controlador de autenticación o usuario.
  
 */

using System.ComponentModel.DataAnnotations;

namespace EduSupport.Server.Models
{
    public class UserRegisterDto
    {
        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [MinLength(3, ErrorMessage = "El nombre debe tener al menos 3 caracteres.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El apellido es obligatorio.")]
        [MinLength(3, ErrorMessage = "El apellido debe tener al menos 3 caracteres.")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El correo es obligatorio.")]
        [RegularExpression(
            @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
            ErrorMessage = "El correo debe tener un formato válido (p.ej. usuario@dominio.com)."
        )]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contraseña es obligatoria.")]
        [MinLength(8, ErrorMessage = "La contraseña debe tener al menos 8 caracteres.")]
        [RegularExpression(
            @"^(?=.*[A-Z])(?=.*\d).+$",
            ErrorMessage = "La contraseña debe contener al menos una letra mayúscula y un número."
        )]
        [DataType(DataType.Password)]  // Para renderizar <input type="password">
        public string Password { get; set; }
    }
}