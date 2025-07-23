/*
 Controlador API RESTful que maneja la autenticación de usuarios, incluyendo:
- Registro de nuevos usuarios
- Inicio de sesión (login)
- Generación de tokens JWT
 */
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EduSupport.Server.Data;
using EduSupport.Server.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;

namespace EduSupport.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _cfg;

        public AuthController(AppDbContext db, IConfiguration cfg)
        {
            _db = db;
            _cfg = cfg;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            // Validar las DataAnnotations del DTO
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Comprobar si el email ya existe
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Usuario ya existe");

            // Mapear todas las propiedades necesarias
            var user = new User
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { token = GenerateToken(user) });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Credenciales inválidas");

            return Ok(new { token = GenerateToken(user) });
        }

        
        private string GenerateToken(User user)
        {
            var jwt = _cfg.GetSection("JwtSettings");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email)
      };

            var token = new JwtSecurityToken(
              issuer: jwt["Issuer"],
              audience: jwt["Audience"],
              claims: claims,
              expires: DateTime.UtcNow.AddMinutes(int.Parse(jwt["DurationInMinutes"])),
              signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}