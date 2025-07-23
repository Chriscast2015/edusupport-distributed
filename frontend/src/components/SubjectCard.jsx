
/** DESCRIPCIÓN:
 Tarjeta interactiva que representa una materia o categoría en la aplicación.
 Proporciona navegación a rutas específicas al hacer clic y muestra información
 relevante mediante iconos, título y descripción.
  
 FUNCIONALIDAD:
 1. Maneja clics mediante función handleClick que:
 - Ejecuta callback onClick(si existe)
 - Navega a la ruta especificada en prop 'to'
 2. Renderiza una tarjeta visual con:
 - Icono representativo
 - Título destacado
 - Descripción textual
 */    

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectCard.css';

export default function SubjectCard({ title, to, icon, description, onClick }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) onClick();     // 🔊 Reproduce el sonido
        navigate(to);               // 🔗 Navega a la página
    };

    return (
        <div className="subject-card" onClick={handleClick} role="button" tabIndex={0}>
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
