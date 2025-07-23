/**
 * =============================================
 * COMPONENTE: CienciasNaturales
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Componente que muestra los módulos disponibles para Ciencias Naturales,
 * incluyendo reproductores de audio y transcripciones interactivas.
 * 
 * CARACTERÍSTICAS:
 * - Tarjetas interactivas para cada módulo
 * - Reproductor de audio integrado
 * - Sistema de despliegue de transcripciones
 * - Efectos visuales y de sonido
 * - Diseño responsive
 */

import React, { useState } from "react";

export default function CienciasNaturales() {
    const [activeIndex, setActiveIndex] = useState(null);

    const modules = [
        {
            title: "Módulo 1: Nuestro cuerpo, una máquina maravillosa",
            description:
                " Describe las funciones del cerebro, corazón, pulmones y otros órganos.",
            duration: "0:48",
            audioSrc: "/Sonidos/fundamentos.mp3",
            transcript:
                "¡Hola exploradores! Tu cuerpo es como una máquina.El cerebro es el director, el corazón late sin parar y los pulmones toman oxígeno.La piel te protege y los huesos te dan forma. ¿Sabías que al sonreír usas más de 10 músculos ? ¡Tu cuerpo es fuerte e inteligente!",
        },
        {
            title: "Módulo 2: La naturaleza que nos rodea",
            description:
                "Invita a reflexionar sobre la importancia de árboles, ríos y animales.",
            duration: "0:50",
            audioSrc: "/Sonidos/intermedio.mp3",
            transcript: "Cierra los ojos y escucha: pájaros, viento, ríos.Los árboles limpian el aire, las lombrices ayudan a las plantas.Hay frutas únicas como la guanábana.Debemos cuidar la naturaleza: no tirar basura, ahorrar agua y respetar a los animales. ¿Cuál es tu animal favorito?",
        },
        {
            title: "Módulo 3: El agua, el sol y la vida",
            description:
                "Destaca el papel fundamental del agua y el sol en el desarrollo de la vida, y la necesidad de protegerlos.",
            duration: "0:52",
            audioSrc: "/Sonidos/avanzado.mp3",
            transcript: "Imagina una semilla que crece con agua y sol.El agua es un superpoder: sin ella no hay vida.El sol da energía a las plantas.Pero si contaminamos, perdemos ese poder.Sé un defensor: cierra la llave, planta una flor y cuida el planeta. ¡Él cuenta contigo!",
        },
    ];

    const toggleTranscript = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Ciencias Naturales</h1>

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

                            {/* Transcripción como popup absoluto dentro de la tarjeta */}
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
        position: "relative", // importante para posicionar el popup
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
        bottom: " -230px", // ajusta para que se despliegue justo debajo del botón
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
        zIndex: 100, // aseguramos que esté por encima
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
