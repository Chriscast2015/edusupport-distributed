/**
 * =============================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACI�N
 * =============================================
 * 
 * DESCRIPCI�N:
 * Archivo principal que renderiza la aplicaci�n React en el DOM.
 * 
 * FUNCIONALIDADES:
 * - Monta la aplicaci�n en el elemento con id 'root'
 * - Envuelve la app en React.StrictMode para desarrollo
 * - Importa los estilos globales de la aplicaci�n
 */ 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);