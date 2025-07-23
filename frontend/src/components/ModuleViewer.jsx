import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSound from '../hooks/useSound';
import { Howl, Howler } from 'howler'; 

/**
 * Grupo 2 "P�gina web de apoyo para estudiantes con discapacidad visual"
 * 
 * Este componente muestra el contenido de un m�dulo educativo espec�fico, incluyendo:
 * - Un reproductor de audio con controles (play/pause, retroceso/avance, barra de progreso)
 * - La transcripci�n del contenido del audio
 * - Funcionalidad para marcar el m�dulo como completado
 * 
 * Caracter�sticas principales:
 * - Carga din�mica de contenido basado en par�metros de ruta (subjectSlug y moduleId)
 * - Integraci�n con Howler.js para reproducci�n de audio con seguimiento de tiempo
 * - Efectos de sonido para interacciones del usuario
 * - Estado local para manejar reproducci�n, tiempo actual y visibilidad de la transcripci�n
 * - Simulaci�n de API para desarrollo (se puede reemplazar por llamadas reales al backend)
 * 
 */
export default function ModuleViewer() {
    // Obtener par�metros de la ruta y funci�n de navegaci�n
    const { subjectSlug, moduleId } = useParams();
    const navigate = useNavigate();

    // Hooks para efectos de sonido (asegurarse que las rutas sean correctas)
    const playClick = useSound('/Sonidos/click.mp3'); // Sonido para interacciones
    const playSuccess = useSound('/Sonidos/success.mp3'); // Sonido para completado

    // Estados principales del componente
    const [moduleContent, setModuleContent] = useState(null); // Contenido del m�dulo
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Manejo de errores

    // Referencias y estados para el reproductor de audio
    const soundRef = useRef(null); // Almacena la instancia de Howl (Howler.js)
    const animationFrameRef = useRef(null); // Para el bucle de animaci�n del progreso

    const [isPlaying, setIsPlaying] = useState(false); // Estado de reproducci�n
    const [currentTime, setCurrentTime] = useState(0); // Tiempo actual de reproducci�n
    const [totalDuration, setTotalDuration] = useState(0); // Duraci�n total del audio
    const [transcriptVisible, setTranscriptVisible] = useState(true); // Visibilidad de la transcripci�n

    // Efecto principal: Carga el contenido del m�dulo cuando cambian los par�metros
    useEffect(() => {
        const fetchModuleContent = async () => {
            setLoading(true);
            setError(null);

            // Limpieza de recursos anteriores
            if (soundRef.current) {
                soundRef.current.unload();
                soundRef.current = null;
                cancelAnimationFrame(animationFrameRef.current);
            }
            setIsPlaying(false);
            setCurrentTime(0);
            setTotalDuration(0);

            try {
                // --- PUNTO DE INTEGRACI�N: Reemplazar con llamada real a tu API ---
                // Ejemplo de c�mo ser�a la llamada real:
                // const response = await fetch(`/api/subjects/${subjectSlug}/modules/${moduleId}`);
                // const fetchedContent = await response.json();

                // Simulaci�n de llamada a API (para desarrollo)
                const fetchedContent = await new Promise(resolve => {
                    setTimeout(() => {
                        const mockContents = {
                            'filosofia-1': {
                                name: 'M�dulo 1: Introducci�n al Pensamiento',
                                audioUrl: '/audio/SoundHelix-Song-1.mp3', // Asegurar que esta ruta exista
                                transcript: 'Este es el primer p�rrafo...' // Transcripci�n completa
                            },
                            // ...otros m�dulos mock
                        };
                        resolve(mockContents[moduleId] || null);
                    }, 700);
                });

                if (fetchedContent) {
                    setModuleContent(fetchedContent);

                    // Configuraci�n del reproductor de audio con Howler.js
                    const newSound = new Howl({
                        src: [fetchedContent.audioUrl],
                        html5: true, // Para streaming de archivos grandes
                        volume: 1.0,
                        onend: () => {
                            setIsPlaying(false);
                            setCurrentTime(0);
                            cancelAnimationFrame(animationFrameRef.current);
                        },
                        onplay: () => {
                            setIsPlaying(true);
                            animationFrameRef.current = requestAnimationFrame(step);
                        },
                        onpause: () => setIsPlaying(false),
                        onstop: () => setIsPlaying(false),
                        onload: () => setTotalDuration(newSound.duration()),
                        onloaderror: (id, err) => console.error('Error de carga de audio:', err),
                        onplayerror: (id, err) => console.error('Error de reproducci�n de audio:', err)
                    });
                    soundRef.current = newSound;
                } else {
                    setError('Contenido del m�dulo no encontrado.');
                }
            } catch (err) {
                setError('Error al cargar el contenido del m�dulo.');
                console.error('Error fetching module content:', err);
            } finally {
                setLoading(false);
            }
        };

        if (subjectSlug && moduleId) {
            fetchModuleContent();
        }

        // Limpieza al desmontar el componente
        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [subjectSlug, moduleId]);

    // Funci�n para actualizar el tiempo de reproducci�n (usado en el bucle de animaci�n)
    const step = () => {
        if (soundRef.current && soundRef.current.playing()) {
            setCurrentTime(soundRef.current.seek());
            animationFrameRef.current = requestAnimationFrame(step);
        }
    };

    // Controladores para los botones del reproductor
    const handlePlayPause = () => {
        playClick();
        if (soundRef.current) {
            if (isPlaying) {
                soundRef.current.pause();
            } else {
                soundRef.current.play();
            }
        }
    };

    const handleRewind = () => {
        playClick();
        if (soundRef.current) {
            soundRef.current.seek(Math.max(0, soundRef.current.seek() - 10));
            setCurrentTime(soundRef.current.seek());
        }
    };

    const handleForward = () => {
        playClick();
        if (soundRef.current) {
            soundRef.current.seek(Math.min(totalDuration, soundRef.current.seek() + 10));
            setCurrentTime(soundRef.current.seek());
        }
    };

    // Controlador para la barra de progreso
    const handleTimelineClick = (e) => {
        playClick();
        if (soundRef.current && totalDuration > 0) {
            const timeline = e.currentTarget;
            const clickX = e.clientX - timeline.getBoundingClientRect().left;
            const percentage = clickX / timeline.offsetWidth;
            const newSeek = totalDuration * percentage;
            soundRef.current.seek(newSeek);
            setCurrentTime(newSeek);
        }
    };

    // Formateador de tiempo (mm:ss)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Controlador para mostrar/ocultar la transcripci�n
    const handleToggleTranscript = () => {
        playClick();
        setTranscriptVisible(!transcriptVisible);
    };

    // Controlador para marcar el m�dulo como completado
    const handleMarkCompleted = async () => {
        playSuccess();
        // --- PUNTO DE INTEGRACI�N: Reemplazar con llamada real a tu API ---
        // Ejemplo:
        // await fetch(`/api/subjects/modules/${moduleId}/complete`, { method: 'POST' });

        // Simulaci�n para desarrollo
        alert('�M�dulo marcado como completado! (Simulaci�n)');
        navigate(`/subjects/${subjectSlug}`);
    };

    // Renderizado condicional basado en el estado
    if (loading) {
        return <div className="text-center py-8"><p>Cargando contenido del m�dulo...</p></div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-600">{error}</div>;
    }

    if (!moduleContent) {
        return <div className="text-center py-8 text-gray-500">Contenido del m�dulo no disponible.</div>;
    }

    // Renderizado principal del componente
    return (
        <section id="module-detail" className="p-4">
            {/* Cabecera con bot�n de volver */}
            <div className="flex items-center mb-6">
                <button
                    id="back-to-subject"
                    className="bg-blue-600 text-white p-2 rounded-full mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out"
                    aria-label="Volver a la materia"
                    onClick={() => { playClick(); navigate(`/subjects/${subjectSlug}`); }}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h2 id="module-title" className="text-2xl font-bold text-gray-800">{moduleContent.name}</h2>
            </div>

            {/* Contenedor principal del contenido */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Reproductor de audio */}
                <div id="audio-player" className="mb-6">
                    <div className="audio-timeline h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden relative" onClick={handleTimelineClick}>
                        <div className="audio-progress bg-blue-600 h-full rounded-full absolute top-0 left-0" style={{ width: `${(currentTime / totalDuration) * 100 || 0}%` }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span id="current-time">{formatTime(currentTime)}</span>
                        <span id="total-time">{formatTime(totalDuration)}</span>
                    </div>
                    <div className="audio-controls flex justify-center gap-4 mt-4">
                        <button id="rewind" className="audio-btn p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200" aria-label="Retroceder 10 segundos" onClick={handleRewind}>
                            <i className="fas fa-backward text-xl"></i>
                        </button>
                        <button id="play-pause" className="audio-btn p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200" aria-label={isPlaying ? "Pausar" : "Reproducir"} onClick={handlePlayPause}>
                            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl`} id="play-icon"></i>
                        </button>
                        <button id="forward" className="audio-btn p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200" aria-label="Avanzar 10 segundos" onClick={handleForward}>
                            <i className="fas fa-forward text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Secci�n de transcripci�n */}
                <div className="flex justify-between items-center mb-4 mt-8">
                    <h3 className="text-xl font-semibold text-gray-800">Transcripci�n</h3>
                    <button id="toggle-transcript" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200" onClick={handleToggleTranscript}>
                        <i className="fas fa-file-alt mr-2"></i>{transcriptVisible ? 'Ocultar transcripci�n' : 'Mostrar transcripci�n'}
                    </button>
                </div>

                <div id="transcript" className={`${transcriptVisible ? '' : 'hidden'} p-4 bg-gray-100 rounded-md max-h-80 overflow-y-auto text-gray-700 leading-relaxed`}>
                    {moduleContent.transcript.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                </div>
            </div>

            {/* Bot�n para marcar como completado */}
            <div className="mt-8 text-center">
                <button id="mark-completed" className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200" onClick={handleMarkCompleted}>
                    <i className="fas fa-check mr-2"></i>Marcar como completado
                </button>
            </div>
        </section>
    );
}