/**
 * Grupo 2 "Página web de apoyo para estudiantes con discapacidad visual"
 *
 * Este componente define una estructura común para las páginas de la aplicación.
 * Se utiliza principalmente en conjunto con `react-router-dom` como plantilla envolvente
 * para las rutas protegidas o generales.
 *
 * Funcionalidades:
 * - Renderiza el componente <Header /> en la parte superior de todas las páginas.
 * - Usa <Outlet /> para renderizar dinámicamente el contenido de las rutas hijas definidas
 *   en el archivo de rutas (App.jsx o donde se configure el enrutamiento).
 *
 * Este patrón es útil para mantener consistencia visual (como barras de navegación o encabezados)
 * en toda la aplicación sin duplicar código.
 */


import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}