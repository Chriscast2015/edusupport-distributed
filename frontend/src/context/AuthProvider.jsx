/**
 * =============================================
 * COMPONENTE: AuthProvider
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Proveedor de contexto de autenticación que gestiona el estado
 * de autenticación en toda la aplicación. Maneja el almacenamiento
 * de tokens, sesiones de usuario y provee métodos de autenticación.
 * 
 * FUNCIONALIDADES PRINCIPALES:
 * - Gestiona el estado de autenticación del usuario
 * - Decodifica y valida tokens JWT automáticamente
 * - Provee funcionalidad de logout
 * - Persiste la sesión usando localStorage
 */



import React, { useEffect, useState } from 'react';
//import jwt_decode from 'jwt-decode/build/jwt-decode.esm.js';
//import jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const data = jwtDecode(token);
            setUser({
                id: data.sub,
                email: data.email,
                firstName: data.Nombre,
                lastName: data.Apellido
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login', { replace: true });
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}