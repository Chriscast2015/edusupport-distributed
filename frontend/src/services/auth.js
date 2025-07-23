/**
 * =============================================
 * SERVICIO: Auth API
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Módulo que gestiona las operaciones de autenticación contra el backend
 * incluyendo registro y login de usuarios.
 * 
 * CARACTERÍSTICAS:
 * - Maneja el endpoint base '/api/auth'
 * - Procesa respuestas de error del servidor
 * - Normaliza mensajes de error para mejor UX
 * - Usa fetch API con cabeceras JSON
 */ 

// Usamos ruta relativa para que Vite redirija al backend
const API = '/api/auth';

/**
 * Registra un nuevo usuario.
 * Lanza un Error con el texto de la respuesta si status != 2xx.
 */
export async function register(nombre, apellido, email, password) {
    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, email, password })
    });

    if (!res.ok) {
        const data = await res.json();
        const msg = data?.errors?.Password?.[0] || data?.title || 'Error en el registro';
        throw new Error(msg);
    }

    return res.json();
}

/**
 * Loguea un usuario existente.
 * Lanza un Error con el texto de la respuesta si status != 2xx.
 */
export async function login(email, password) {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Error en el login');
    }

    return res.json();
}