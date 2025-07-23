/* * DESCRIPCIÓN:
 * Botón interactivo que despliega un panel de configuración de accesibilidad
 * para ajustar el tamaño del texto en la aplicación.
 * 
 * FUNCIONALIDADES:
 * 1. Muestra / oculta el panel de configuración de accesibilidad
 * 2. Reproduce un sonido al interactuar
 * 3. Proporciona accesibilidad mediante ARIA*/
   

import React, { useState } from 'react';
import AccessibilityConfig from './AccessibilityConfig';
import './TextSizeButton.css';

export default function TextSizeButton({ setFontSize }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="text-size-toggle"
                onClick={() => {
                    const audio = new Audio('/Sonidos/click.mp3');
                    audio.play().catch(error => {
                        console.error("No se pudo reproducir el sonido:", error);
                    });
                    // Call the original function to toggle the text size settings
                    setOpen((o) => !o);
                }}
                aria-label="Configuración de texto"
            >
                🔤
            </button>

            {open && (
                <AccessibilityConfig
                    onClose={() => setOpen(false)}
                    setFontSize={setFontSize}
                />
            )}
        </>
    );
}