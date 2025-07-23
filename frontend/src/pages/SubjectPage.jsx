/**
 * =============================================
 * COMPONENTE: SubjectPage
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Página genérica que muestra el contenido de una materia específica
 * según el parámetro de la URL. Actualmente funciona como placeholder
 * mientras se desarrollan los módulos completos de cada materia.
 * 
 * CARACTERÍSTICAS:
 * - Detecta automáticamente la materia desde la URL
 * - Muestra un título correspondiente a la materia
 * - Reproduce un sonido al cargar la página
 * - Diseño simple como placeholder temporal
 */ 

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSound from '../hooks/useSound'; // Asegúrate que la ruta sea correcta

const titles = {
    'filosofia': 'Filosofía',
    'historia': 'Historia',
    'ingles': 'Inglés',
    'ciencias-naturales': 'Ciencias Naturales'
};

export default function SubjectPage() {
    const { subject } = useParams();
    const title = titles[subject] || 'Materia desconocida';

    // 🔊 Reproducir sonido al cargar la página
    const playClickSound = useSound('/Sonidos/click.mp3');

    useEffect(() => {
        playClickSound();
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{title}</h1>
            <p>Contenido de {title} en construcción.</p>
        </div>
    );
}