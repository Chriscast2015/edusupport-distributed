/**
 * =============================================
 * COMPONENTE PRINCIPAL: App
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Componente raíz que configura el enrutamiento principal de la aplicación
 * y provee los contextos globales necesarios.
 * 
 * FUNCIONALIDADES PRINCIPALES:
 * - Configuración del enrutamiento con React Router
 * - Provee contexto de autenticación a toda la app
 * - Control de tamaño de fuente accesible
 * - Protección de rutas privadas
 * - Redirección de rutas no encontradas
 */ 

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// Importa las páginas de cada materia
import Filosofia from './pages/Filosofia';
import Historia from './pages/Historia';
import Ingles from './pages/Ingles';
import CienciasNaturales from './pages/CienciasNaturales';

// Importa el AuthProvider y el botón flotante
import { AuthProvider } from './context/AuthProvider';

import TextSizeButton from './components/TextSizeButton';

export default function App() {
    const [fontSize, setFontSize] = useState('normal');

    useEffect(() => {
        const root = document.documentElement;
        switch (fontSize) {
            case 'grande':
                root.style.fontSize = '18px';
                break;
            case 'extra':
                root.style.fontSize = '21px';
                break;
            default:
                root.style.fontSize = '16px';
                break;
        }
    }, [fontSize]);

    return (
        <BrowserRouter>
            <AuthProvider>
                <TextSizeButton setFontSize={setFontSize} />
                <Routes>
                    {/* 1) Raíz: siempre login */}
                    <Route path="/" element={<LoginPage />} />

                    {/* 2) Páginas públicas */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* 3) Dashboard protegido */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* 4) Páginas de materias protegidas */}
                    <Route
                        path="/pages/Filosofia.jsx"
                        element={
                            <PrivateRoute>
                                <Filosofia />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pages/Historia.jsx"
                        element={
                            <PrivateRoute>
                                <Historia />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pages/Ingles.jsx"
                        element={
                            <PrivateRoute>
                                <Ingles />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pages/CienciasNaturales.jsx"
                        element={
                            <PrivateRoute>
                                <CienciasNaturales />
                            </PrivateRoute>
                        }
                    />

                    {/* 5) Catch-all redirige a "/" */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
