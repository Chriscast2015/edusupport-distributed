/**
 * =============================================
 * COMPONENTE: Historia
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Componente que muestra los módulos educativos sobre la historia del Ecuador,
 * con contenido interactivo que incluye audios y transcripciones.
 * 
 * CARACTERÍSTICAS:
 * - Tres módulos sobre historia ecuatoriana
 * - Reproductores de audio integrados
 * - Transcripciones interactivas
 * - Diseño responsive con CSS-in-JS
 * - Efectos visuales y de sonido
 */ 

import React, { useState } from "react";

export default function Historia() {
    const [activeIndex, setActiveIndex] = useState(null);

    const modules = [
        {
            title: "Módulo 1: Edad Antigua",
            description: "Introduce los primeros pueblos del Ecuador, como Valdivia, Quitus y Cañaris, sus costumbres y la llegada de los incas.",
            duration: "1:10",
            audioSrc: "/Sonidos/historia1.mp3",
            transcript:
                "¡Hola amiguitos y amiguitas! Hoy viajaremos muy atrás en el tiempo... Imagina que no hay carros, ni casas, ni celulares. Solo naturaleza. Aquí vivían los primeros habitantes del Ecuador, hace más de 5.000 años. Uno de los primeros pueblos fue el Valdivia, que hacían ollitas de barro. En la Sierra vivían los Quitus, que adoraban al sol, y en el sur, los Cañaris, que decían salir de una laguna mágica. Luego llegaron los incas desde Perú, pero apareció un nuevo peligro: barcos gigantes desde el mar. ¿Quiénes eran? Descúbrelo en el siguiente módulo.",
        },
        {
            title: "Módulo 2:  La conquista y la independencia",
            description: "Relata la conquista española, la lucha por la libertad y la Batalla de Pichincha.",
            duration: "1:04",
            audioSrc: "/Sonidos/historia2.mp3",
            transcript:
                "Los barcos venían de España.Los conquistadores tenían espadas y buscaban oro.Tomaron las tierras y por 300 años Ecuador fue parte de su imperio.Pero el 10 de agosto de 1809, un grupo en Quito gritó: '¡Queremos libertad!'.Años después, el 24 de mayo de 1822, el general Sucre ganó la Batalla de Pichincha. ¡Quito fue libre! Así nació la idea de Ecuador.",
        },
        {
            title: "Módulo 3: El Ecuador de ayer y de hoy",
            description: "Explica la formación de Ecuador como país independiente, sus regiones y diversidad cultural.",
            duration: "1:02",
            audioSrc: "/Sonidos/historia3.mp3",
            transcript:
                "Después de liberarse, Ecuador fue parte de Gran Colombia.En 1830 se volvió independiente.Tuvimos presidentes, guerras y logros, como el voto femenino.Hoy tenemos 4 regiones: Costa con playas, Sierra con volcanes, Amazonía con ríos y Galápagos con animales únicos.Somos millones hablando español, quichua y shuar. ¡Tú también eres parte de esta historia!",
        },
    ];

    const toggleTranscript = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Historia</h1>
            <div style={styles.grid}>
                {modules.map((mod, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <article
                            key={index}
                            style={{
                                ...styles.card,
                                ...(isActive ? styles.cardActive : {}),
                            }}
                            aria-expanded={isActive}
                            aria-controls={`transcript-${index}`}
                        >
                            <h2 style={styles.cardTitle}>{mod.title}</h2>
                            <p style={styles.cardDescription}>{mod.description}</p>
                            <p style={styles.cardDuration}>
                                <strong>Duración:</strong> {mod.duration}
                            </p>

                            <audio controls style={styles.audio}>
                                <source src={mod.audioSrc} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>

                            <button
                                style={{
                                    ...styles.transcriptButton,
                                    ...(isActive ? styles.transcriptButtonActive : {}),
                                }}
                                onClick={() => {
                                    const audio = new Audio('/Sonidos/click.mp3');
                                    audio.play().catch(error => {
                                        console.error("No se pudo reproducir el sonido:", error);
                                    });
                                    // Llama a la función original toggleTranscript después de reproducir el sonido
                                    toggleTranscript(index);
                                }}
                                aria-expanded={isActive}
                                aria-controls={`transcript-${index}`}
                                aria-label={isActive ? "Ocultar transcripción" : "Ver transcripción"}
                            >
                                {isActive ? "Ocultar transcripción" : "Ver transcripción"}
                            </button>

                            {isActive && (
                                <div
                                    id={`transcript-${index}`}
                                    role="region"
                                    aria-live="polite"
                                    style={styles.transcriptPopup}
                                >
                                    <h3 style={styles.transcriptTitle}>Transcripción</h3>
                                    <p style={styles.transcriptText}>{mod.transcript}</p>
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "2rem",
        fontFamily: "'Jost', sans-serif",
        background: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
        minHeight: "100vh",
        color: "#f2e8c4",
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "2rem",
        textAlign: "center",
        color: "#f2e8c4",
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    card: {
        background: "rgba(255, 255, 255, 0.08)",
        padding: "1.5rem",
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        color: "#f2e8c4",
        backdropFilter: "blur(4px)",
        position: "relative",
        minHeight: "350px",
        overflow: "visible",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
    },
    cardActive: {
        boxShadow: "0 0 35px rgba(62, 201, 167, 0.8)",
        transform: "scale(1.03)",
        border: "1.5px solid #3ec9a7",
    },
    cardTitle: {
        marginBottom: "0.75rem",
        fontWeight: "700",
        fontSize: "1.4rem",
        textShadow: "0 1px 2px rgba(0,0,0,0.6)",
    },
    cardDescription: {
        marginBottom: "1rem",
        lineHeight: "1.5",
        fontSize: "1rem",
        opacity: 0.9,
    },
    cardDuration: {
        marginBottom: "1rem",
        fontSize: "0.95rem",
        fontWeight: "600",
    },
    audio: {
        width: "100%",
        marginBottom: "1.25rem",
        borderRadius: "6px",
    },
    transcriptButton: {
        backgroundColor: "#3ec9a7",
        border: "none",
        borderRadius: "8px",
        padding: "0.65rem 1.2rem",
        fontWeight: "700",
        color: "#1c1c1c",
        cursor: "pointer",
        transition: "background-color 0.25s ease, transform 0.2s ease",
        boxShadow: "0 3px 7px rgba(62, 201, 167, 0.5)",
    },
    transcriptButtonActive: {
        backgroundColor: "#2ba68e",
        transform: "scale(1.05)",
    },
    transcriptPopup: {
        position: "absolute",
        bottom: "-330px",
        left: "0",
        width: "100%",
        maxHeight: "300px",
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderLeft: "5px solid #3ec9a7",
        borderRadius: "10px",
        color: "#e5e5e5",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)",
        padding: "1rem",
        backdropFilter: "blur(6px)",
        zIndex: 100,
        transition: "opacity 0.3s ease",
    },
    transcriptTitle: {
        marginTop: 0,
        marginBottom: "0.5rem",
        fontWeight: "700",
    },
    transcriptText: {
        fontSize: "0.95rem",
        lineHeight: "1.4",
        whiteSpace: "pre-wrap",
    },
};
