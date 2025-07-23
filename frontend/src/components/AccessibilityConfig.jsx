/**
 * Grupo 2 "Página web de apoyo para estudiantes con discapacidad visual"
 * Componente: AccessibilityConfig
 *
 * Este componente muestra una ventana modal de configuración de accesibilidad
 * que permite al usuario seleccionar el tamaño del texto entre tres opciones:
 * "normal", "grande" y "extra grande".
 *
 * - Al seleccionar una opción, se actualiza el estado local y se llama a la función `setFontSize`
 *   pasada como prop para aplicar el cambio en el tamaño del texto global.
 * - Al hacer clic en cualquier botón (incluido el de cerrar), se reproduce un sonido de clic.
 * - El botón de cerrar también ejecuta la función `onClose` pasada como prop.
 *
 * Estilos personalizados se aplican desde el archivo 'AccessibilityConfig.css'.
 */


import React, { useState } from 'react';
import './AccessibilityConfig.css';

export default function AccessibilityConfig({ onClose, setFontSize }) {
    const [selected, setSelected] = useState('normal');

    const handleChange = (size) => {
        setSelected(size);
        setFontSize(size);
    };

    return (
        <div className="accessibility-modal">
            <div className="accessibility-header">
                <h3>Configuración de Accesibilidad</h3>
                <button
                    className="close-btn"
                    onClick={() => {
                        const audio = new Audio('/Sonidos/click.mp3');
                        audio.play().catch(error => {
                            console.error("No se pudo reproducir el sonido:", error);
                        });
                        // Call the original onClose function after playing the sound
                        onClose();
                    }}
                >
                    ✖
                </button>
            </div>

            <p className="accessibility-subtitle">Tamaño de texto</p>

            <div className="accessibility-options">
                {['normal', 'grande', 'extra'].map((size) => (
                    <button
                        key={size}
                        className={`size-btn ${selected === size ? 'selected' : ''}`}
                        onClick={() => {
                            const audio = new Audio('/Sonidos/click.mp3');
                            audio.play().catch(error => {
                                console.error("No se pudo reproducir el sonido:", error);
                            });
                            // Call the original handleChange function after playing the sound
                            handleChange(size);
                        }}
                    >
                        {selected === size && (
                            <span aria-hidden="true" style={{ marginRight: '0.5rem' }}>✔️</span>
                        )}
                        {size === 'normal' ? 'Normal' : size === 'grande' ? 'Grande' : 'Extra grande'}
                    </button>
                ))}
            </div>
        </div>
    );
}