/**
 * Grupo 2 "P�gina web de apoyo para estudiantes con discapacidad visual"
 *
 * Este componente define una estructura com�n para las p�ginas de la aplicaci�n.
 * Se utiliza principalmente en conjunto con `react-router-dom` como plantilla envolvente
 * para las rutas protegidas o generales.
 *
 * Funcionalidades:
 * - Renderiza el componente <Header /> en la parte superior de todas las p�ginas.
 * - Usa <Outlet /> para renderizar din�micamente el contenido de las rutas hijas definidas
 *   en el archivo de rutas (App.jsx o donde se configure el enrutamiento).
 *
 * Este patr�n es �til para mantener consistencia visual (como barras de navegaci�n o encabezados)
 * en toda la aplicaci�n sin duplicar c�digo.
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