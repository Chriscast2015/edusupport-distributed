/*
 Controlador API RESTful que gestiona el sistema de materias educativas, módulos y contenido de aprendizaje. Proporciona endpoints para:

1. Listar todas las materias disponibles
2. Obtener detalles específicos de cada materia
3. Acceder al contenido completo de los módulos
4. Marcar módulos como completados
 */

// YourProjectName/Controllers/SubjectsController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System; // Agregado para InvalidOperationException si no está presente

namespace EduSupport.Server.Controllers // Asegúrate de que este namespace sea correcto para tu proyecto
{
    [ApiController]
    [Route("api/[controller]")] // Ej., /api/subjects
    public class SubjectsController : ControllerBase
    {
        // Datos de prueba para demostración. En una aplicación real, esto provendría de una base de datos.
        private static readonly List<SubjectDto> _subjects = new List<SubjectDto>
        {
            new SubjectDto { Id = 1, Title = "Filosofía", Slug = "filosofia", Icon = "🧠", Description = "Explora el pensamiento humano" },
            new SubjectDto { Id = 2, Title = "Historia", Slug = "historia", Icon = "🏰", Description = "Viaja a través del tiempo" },
            new SubjectDto { Id = 3, Title = "Inglés", Slug = "ingles", Icon = "📚", Description = "Domina el idioma global" },
            new SubjectDto { Id = 4, Title = "Ciencias Naturales", Slug = "ciencias-naturales", Icon = "🔬", Description = "Descubre la naturaleza" }
        };

        private static readonly Dictionary<string, SubjectDetailDto> _subjectDetails = new Dictionary<string, SubjectDetailDto>
        {
            { "filosofia", new SubjectDetailDto
                {
                    SubjectName = "Filosofía",
                    Modules = new List<ModuleDto>
                    {
                        new ModuleDto { Id = "filosofia-1", Name = "Módulo 1: Introducción al Pensamiento", Description = "Conceptos fundamentales de la filosofía antigua y moderna.", Duration = "20:00", Completed = true },
                        new ModuleDto { Id = "filosofia-2", Name = "Módulo 2: Ética y Moral", Description = "Análisis de las teorías éticas y dilemas morales.", Duration = "35:00", Completed = false },
                        new ModuleDto { Id = "filosofia-3", Name = "Módulo 3: Metafísica y Ontología", Description = "Exploración de la naturaleza de la realidad y la existencia.", Duration = "28:00", Completed = false },
                        new ModuleDto { Id = "filosofia-4", Name = "Módulo 4: Lógica y Epistemología", Description = "Principios del razonamiento y el estudio del conocimiento.", Duration = "22:00", Completed = false }
                    }
                }
            },
            { "historia", new SubjectDetailDto
                {
                    SubjectName = "Historia",
                    Modules = new List<ModuleDto>
                    {
                        new ModuleDto { Id = "historia-1", Name = "Módulo 1: Civilizaciones Antiguas", Description = "Mesopotamia, Egipto, Grecia y Roma.", Duration = "40:00", Completed = false },
                        new ModuleDto { Id = "historia-2", Name = "Módulo 2: Edad Media", Description = "Feudalismo, Cruzadas y el surgimiento de las naciones.", Duration = "30:00", Completed = false },
                        new ModuleDto { Id = "historia-3", Name = "Módulo 3: Revoluciones y Guerras Mundiales", Description = "Desde la Ilustración hasta el siglo XX.", Duration = "50:00", Completed = false },
                    }
                }
            },
            { "ingles", new SubjectDetailDto
                {
                    SubjectName = "Inglés",
                    Modules = new List<ModuleDto>
                    {
                        new ModuleDto { Id = "ingles-1", Name = "Módulo 1: Vocabulario Básico", Description = "Palabras y frases esenciales para principiantes.", Duration = "15:00", Completed = false },
                        new ModuleDto { Id = "ingles-2", Name = "Módulo 2: Gramática Fundamental", Description = "Estructuras básicas de oraciones y tiempos verbales.", Duration = "25:00", Completed = false },
                        new ModuleDto { Id = "ingles-3", Name = "Módulo 3: Conversación Diaria", Description = "Práctica de diálogos y situaciones cotidianas.", Duration = "30:00", Completed = false },
                    }
                }
            },
            { "ciencias-naturales", new SubjectDetailDto
                {
                    SubjectName = "Ciencias Naturales",
                    Modules = new List<ModuleDto>
                    {
                        new ModuleDto { Id = "ciencias-naturales-1", Name = "Módulo 1: Ecología y Medio Ambiente", Description = "Estudio de los ecosistemas y la sostenibilidad.", Duration = "30:00", Completed = false },
                        new ModuleDto { Id = "ciencias-naturales-2", Name = "Módulo 2: El Cuerpo Humano", Description = "Sistemas y funciones vitales.", Duration = "45:00", Completed = false },
                        new ModuleDto { Id = "ciencias-naturales-3", Name = "Módulo 3: Química Orgánica", Description = "Fundamentos de los compuestos de carbono.", Duration = "35:00", Completed = false },
                    }
                }
            }
        };

        private static readonly Dictionary<string, ModuleContentDto> _moduleContents = new Dictionary<string, ModuleContentDto>
        {
            { "filosofia-1", new ModuleContentDto
                {
                    Id = "filosofia-1",
                    Name = "Módulo 1: Introducción al Pensamiento",
                    AudioUrl = "/audio/SoundHelix-Song-1.mp3", // RUTA DE AUDIO: Asegúrate de que esta ruta sea accesible desde wwwroot/audio/
                    Transcript = "Este es el primer párrafo de la transcripción. Aquí se explica la introducción al pensamiento filosófico. La filosofía busca entender la realidad, el conocimiento y la existencia humana. \n\nContinúa con el segundo párrafo. Los grandes pensadores como Sócrates, Platón y Aristóteles sentaron las bases de la filosofía occidental. Sus ideas aún resuenan en el mundo moderno. \n\nFinalmente, este es el tercer párrafo. Es importante reflexionar sobre estos conceptos para desarrollar un pensamiento crítico y una comprensión más profunda del mundo que nos rodea. La filosofía no es solo una disciplina académica, sino una forma de vida."
                }
            },
            { "historia-1", new ModuleContentDto
                {
                    Id = "historia-1",
                    Name = "Módulo 1: Civilizaciones Antiguas",
                    AudioUrl = "/audio/SoundHelix-Song-2.mp3", // RUTA DE AUDIO: Asegúrate de que esta ruta sea accesible desde wwwroot/audio/
                    Transcript = "La historia de las civilizaciones antiguas es fascinante. Comenzamos con Mesopotamia y el desarrollo de la escritura cuneiforme."
                }
            },
            { "ingles-1", new ModuleContentDto
                {
                    Id = "ingles-1",
                    Name = "Módulo 1: Vocabulario Básico",
                    AudioUrl = "/audio/SoundHelix-Song-3.mp3", // RUTA DE AUDIO: Asegúrate de que esta ruta sea accesible desde wwwroot/audio/
                    Transcript = "Aprende las palabras básicas en inglés. Hola, adiós, por favor, gracias."
                }
            },
            { "ciencias-naturales-1", new ModuleContentDto
                {
                    Id = "ciencias-naturales-1",
                    Name = "Módulo 1: Ecología y Medio Ambiente",
                    AudioUrl = "/audio/SoundHelix-Song-4.mp3", // RUTA DE AUDIO: Asegúrate de que esta ruta sea accesible desde wwwroot/audio/
                    Transcript = "La ecología es el estudio de los ecosistemas. Entender el medio ambiente es crucial para nuestro futuro."
                }
            }
        };


        [HttpGet]
        public IEnumerable<SubjectDto> GetSubjects()
        {
            return _subjects;
        }

        [HttpGet("{subjectSlug}")] // Ej., /api/subjects/filosofia
        public ActionResult<SubjectDetailDto> GetSubjectDetail(string subjectSlug)
        {
            if (_subjectDetails.TryGetValue(subjectSlug, out var detail))
            {
                return Ok(detail);
            }
            return NotFound();
        }

        [HttpGet("{subjectSlug}/modules/{moduleId}")] // Ej., /api/subjects/filosofia/modules/filosofia-1
        public ActionResult<ModuleContentDto> GetModuleContent(string subjectSlug, string moduleId)
        {
            if (_moduleContents.TryGetValue(moduleId, out var content))
            {
                return Ok(content);
            }
            return NotFound();
        }

        [HttpPost("modules/{moduleId}/complete")] // Ej., /api/subjects/modules/filosofia-1/complete
        public IActionResult MarkModuleCompleted(string moduleId)
        {
            var moduleToUpdate = _subjectDetails.Values
                                    .SelectMany(sd => sd.Modules)
                                    .FirstOrDefault(m => m.Id == moduleId);
            if (moduleToUpdate != null)
            {
                moduleToUpdate.Completed = true; // Solo para datos de prueba
                return Ok(new { message = $"Módulo {moduleId} marcado como completado." });
            }
            return NotFound(new { message = $"Módulo {moduleId} no encontrado." });
        }
    }

    // DTOs (Objetos de Transferencia de Datos)
    public class SubjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
    }

    public class ModuleDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public bool Completed { get; set; }
    }

    public class SubjectDetailDto
    {
        public string SubjectName { get; set; }
        public List<ModuleDto> Modules { get; set; }
    }

    public class ModuleContentDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string AudioUrl { get; set; }
        public string Transcript { get; set; }
    }
}