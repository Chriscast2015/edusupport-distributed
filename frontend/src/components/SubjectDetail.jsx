/*
 * Vista detallada de una materia específica que muestra todos sus módulos disponibles.
 * Proporciona navegación entre módulos y retroalimentación visual del progreso.
 * 
 * FUNCIONALIDADES PRINCIPALES:
 * 1. Carga dinámica de módulos basada en el parámetro de ruta(subjectSlug)
 * 2. Visualización de tarjetas interactivas para cada módulo
 * 3. Manejo de estados de carga y error
 * 4. Efectos de sonido para interacciones
 * 5. Navegación entre vistas(dashboard y módulos)*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSound from '../hooks/useSound'; // Ruta correcta para useSound
import './SubjectDetail.css'; // Si tienes CSS específico para SubjectDetail, de lo contrario se puede eliminar.
// Asegúrate de que Font Awesome esté disponible (por ejemplo, a través de un enlace CDN en public/index.html o un paquete de React)

export default function SubjectDetail() {
    const { subjectSlug } = useParams(); // Obtiene el slug de la URL (ej., 'filosofia')
    const navigate = useNavigate(); // Hook para navegación programática
    const playClick = useSound('/Sonidos/click.mp3'); // Sonido para clics
    //const playSuccess = useSound('/Sonidos/success.mp3'); // Sonido para completar (ejemplo)

    const [subjectName, setSubjectName] = useState('');
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            setError(null);
            try {
                // --- PUNTO DE INTEGRACIÓN: Obtener módulos de tu API de ASP.NET Core ---
                // Ejemplo de llamada a la API (reemplazar con tu endpoint real)
                // const response = await fetch(`/api/subjects/${subjectSlug}`);
                // if (!response.ok) {
                //     throw new Error(`HTTP error! status: ${response.status}`);
                // }
                // const data = await response.json();
                // setSubjectName(data.subjectName); // Asumiendo que tu API también devuelve subjectName
                // setModules(data.modules);

                // --- LLAMADA A LA API DE PRUEBA (para probar sin backend aún) ---
                const fetchedSubjectData = await new Promise(resolve => {
                    setTimeout(() => {
                        const subjectData = {
                            'filosofia': {
                                name: 'Filosofía',
                                modules: [
                                    { id: 'filosofia-1', name: 'Módulo 1: Introducción al Pensamiento', description: 'Conceptos fundamentales de la filosofía antigua y moderna.', duration: '20:00', completed: true },
                                    { id: 'filosofia-2', name: 'Módulo 2: Ética y Moral', description: 'Análisis de las teorías éticas y dilemas morales.', duration: '35:00', completed: false },
                                    { id: 'filosofia-3', name: 'Módulo 3: Metafísica y Ontología', description: 'Exploración de la naturaleza de la realidad y la existencia.', duration: '28:00', completed: false },
                                    { id: 'filosofia-4', name: 'Módulo 4: Lógica y Epistemología', description: 'Principios del razonamiento y el estudio del conocimiento.', duration: '22:00', completed: false },
                                ]
                            },
                            'historia': {
                                name: 'Historia',
                                modules: [
                                    { id: 'historia-1', name: 'Módulo 1: Civilizaciones Antiguas', description: 'Mesopotamia, Egipto, Grecia y Roma.', duration: '40:00', completed: false },
                                    { id: 'historia-2', name: 'Módulo 2: Edad Media', description: 'Feudalismo, Cruzadas y el surgimiento de las naciones.', duration: '30:00', completed: false },
                                    { id: 'historia-3', name: 'Módulo 3: Revoluciones y Guerras Mundiales', description: 'Desde la Ilustración hasta el siglo XX.', duration: '50:00', completed: false },
                                ]
                            },
                            'ingles': {
                                name: 'Inglés',
                                modules: [
                                    { id: 'ingles-1', name: 'Módulo 1: Vocabulario Básico', description: 'Palabras y frases esenciales para principiantes.', duration: '15:00', completed: false },
                                    { id: 'ingles-2', name: 'Módulo 2: Gramática Fundamental', description: 'Estructuras básicas de oraciones y tiempos verbales.', duration: '25:00', completed: false },
                                    { id: 'ingles-3', name: 'Módulo 3: Conversación Diaria', description: 'Práctica de diálogos y situaciones cotidianas.', duration: '30:00', completed: false },
                                ]
                            },
                            'ciencias-naturales': {
                                name: 'Ciencias Naturales',
                                modules: [
                                    { id: 'ciencias-naturales-1', name: 'Módulo 1: Ecología y Medio Ambiente', description: 'Estudio de los ecosistemas y la sostenibilidad.', duration: '30:00', completed: false },
                                    { id: 'ciencias-naturales-2', name: 'Módulo 2: El Cuerpo Humano', description: 'Sistemas y funciones vitales.', duration: '45:00', completed: false },
                                    { id: 'ciencias-naturales-3', name: 'Módulo 3: Química Orgánica', description: 'Fundamentos de los compuestos de carbono.', duration: '35:00', completed: false },
                                ]
                            }
                        };
                        resolve(subjectData[subjectSlug] || null);
                    }, 700);
                });

                if (fetchedSubjectData) {
                    setSubjectName(fetchedSubjectData.name);
                    setModules(fetchedSubjectData.modules);
                } else {
                    setError('Materia no encontrada.');
                }
            } catch (err) {
                setError('Error al cargar los módulos.');
                console.error('Error fetching modules:', err);
            } finally {
                setLoading(false);
            }
        };

        if (subjectSlug) {
            fetchModules();
        }
    }, [subjectSlug]); // Se vuelve a ejecutar el efecto si subjectSlug cambia

    const handleBackToDashboard = () => {
        playClick();
        navigate('/'); // Navega de vuelta al dashboard
    };

    const handleModuleClick = (moduleId) => {
        playClick();
        navigate(`/subjects/${subjectSlug}/modules/${moduleId}`); // Navega a la página de detalle del módulo
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <p>Cargando módulos...</p>
                {/* Puedes añadir un spinner aquí si lo deseas */}
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    // Añade esta verificación para evitar la renderización si subjectName aún no está configurado
    if (!subjectName && !loading && !error) {
        return <div className="text-center py-8 text-gray-500">No se pudo cargar la información de la materia.</div>;
    }

    return (
        <section id="subject-detail" className="p-4"> {/* Añadido algo de padding */}
            <div className="flex items-center mb-6">
                <button
                    id="back-to-dashboard"
                    className="bg-blue-600 text-white p-2 rounded-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out" // Añadidos más estilos de foco y transición
                    aria-label="Volver al tablero principal"
                    onClick={handleBackToDashboard}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 id="subject-title" className="text-2xl font-bold text-gray-800">{subjectName}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.length > 0 ? (
                    modules.map(module => {
                        const isCompleted = module.completed;
                        return (
                            <div
                                key={module.id}
                                className={`module-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50 cursor-pointer transition-all duration-200 ease-in-out ${isCompleted ? 'border-l-4 border-green-500' : ''}`}
                                tabIndex="0"
                                role="button"
                                aria-label={`${module.name}: ${module.description}. ${isCompleted ? 'Módulo completado' : 'Módulo no completado'}`}
                                onClick={() => handleModuleClick(module.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleModuleClick(module.id);
                                    }
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <span className="bg-blue-600 text-white p-3 rounded-full mr-3 flex items-center justify-center">
                                        <i className={`fas fa-${isCompleted ? 'check' : 'headphones'} text-lg`}></i>
                                    </span>
                                    <h3 className="text-xl font-semibold text-gray-800">{module.name}</h3>
                                </div>
                                <p className="text-gray-600 mb-4">{module.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Duración: {module.duration}</span>
                                    <button
                                        className={`view-module-btn ${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${isCompleted ? 'focus:ring-green-500' : 'focus:ring-blue-500'} focus:ring-opacity-50 transition-colors duration-200 ease-in-out`}
                                        data-module-id={module.id}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que se active el evento de clic de la tarjeta
                                            handleModuleClick(module.id);
                                        }}
                                    >
                                        <i className={`fas fa-${isCompleted ? 'redo' : 'play'} mr-2`}></i>
                                        {isCompleted ? 'Repasar' : 'Empezar'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="col-span-full text-center text-gray-500">No hay módulos disponibles para esta materia.</p>
                )}
            </div>
        </section>
    );
}