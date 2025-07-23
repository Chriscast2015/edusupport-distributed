/**
 * Grupo 2 "P�gina web de apoyo para estudiantes con discapacidad visual"
 *
 * Este componente representa la cabecera superior del sitio.
 * Su prop�sito principal es mostrar un bot�n de "Cerrar sesi�n" cuando el usuario est� autenticado.
 *
 * Funcionalidades:
 * - Verifica si hay un usuario autenticado usando `useAuth`.
 * - Si el usuario est� presente, muestra un bot�n para cerrar sesi�n.
 * - Al hacer clic en el bot�n, se reproduce un sonido de clic y luego se ejecuta `logout()` y se redirige a la ruta "/login".
 * - Aplica estilos en l�nea para el dise�o del encabezado y el bot�n.
 * - El bot�n cambia ligeramente de color al pasar el cursor sobre �l.
 *
 * Este componente es �til para proporcionar una opci�n de salida clara al usuario en toda la aplicaci�n protegida.
 */


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Header() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Usa la funci�n logout del AuthProvider
        navigate('/login', { replace: true });
    };

    // Estilos en l�nea
    const headerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        background: '#f8f9fa',
        borderBottom: '1px solid #ddd',
    };

    const btnStyle = {
        background: '#dc3545',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };
    console.log("Usuario actual:", user);
    return (
        <header style={headerStyle}>
            {user && ( // Solo muestra el bot�n si el usuario est� autenticado
                <button
                    onClick={() => {
                        const audio = new Audio('/Sonidos/click.mp3');
                        audio.play().catch(error => {
                            console.error("No se pudo reproducir el sonido:", error);
                        });
                        // Llama a la funci�n original handleLogout despu�s de reproducir el sonido
                        handleLogout();
                    }}
                    style={btnStyle}
                    onMouseOver={(e) => e.target.style.background = '#c82333'}
                    onMouseOut={(e) => e.target.style.background = '#dc3545'}
                >
                    Cerrar sesi�n
                </button> >
            )}
        </header>
    );
}