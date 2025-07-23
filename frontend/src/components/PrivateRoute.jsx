
/**
 * DESCRIPCIÓN:
 * Componente de enrutamiento privado que actúa como guardián de rutas protegidas,
 * verificando la autenticación del usuario antes de permitir el acceso al contenido.
 * 
 * FUNCIONALIDAD:
 * 1. Verifica la existencia de un token de autenticación en el localStorage
 * 2. Si el token existe, renderiza los componentes hijos (contenido protegido)
 * 3. Si no existe token, redirige automáticamente a la página de login
 * */

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token
        ? children
        : <Navigate to="/login" replace />;
}