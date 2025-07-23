/**
 * =============================================
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Archivo principal que renderiza la aplicación React en el DOM.
 * 
 * FUNCIONALIDADES:
 * - Monta la aplicación en el elemento con id 'root'
 * - Envuelve la app en React.StrictMode para desarrollo
 * - Importa los estilos globales de la aplicación
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