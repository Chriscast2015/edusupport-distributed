/**
 * =============================================
 * SERVICIO: fetchWithAuth
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Función utilitaria para realizar peticiones HTTP autenticadas
 * incluyendo automáticamente el token JWT almacenado en localStorage.
 * 
 * CARACTERÍSTICAS:
 * - Añade automáticamente headers de autorización
 * - Maneja errores de HTTP y falta de token
 * - Simplifica el consumo de APIs protegidas
 * - Soporta todas las opciones estándar de fetch
/**
 * Realiza una petición fetch incluyendo el header Authorization con el token JWT.
 * @param {string} path - Ruta relativa (/api/...).
 * @param {object} options - Opciones de fetch (method, body, etc.).
 * @returns {Promise<any>} - El JSON de la respuesta.
 */
export async function fetchWithAuth(path, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontró token de autenticación');
    }

    const res = await fetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Error ${res.status}`);
    }

    return res.json();
}