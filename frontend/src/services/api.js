/**
 * =============================================
 * SERVICIO: fetchWithAuth
 * =============================================
 * 
 * DESCRIPCI�N:
 * Funci�n utilitaria para realizar peticiones HTTP autenticadas
 * incluyendo autom�ticamente el token JWT almacenado en localStorage.
 * 
 * CARACTER�STICAS:
 * - A�ade autom�ticamente headers de autorizaci�n
 * - Maneja errores de HTTP y falta de token
 * - Simplifica el consumo de APIs protegidas
 * - Soporta todas las opciones est�ndar de fetch
/**
 * Realiza una petici�n fetch incluyendo el header Authorization con el token JWT.
 * @param {string} path - Ruta relativa (/api/...).
 * @param {object} options - Opciones de fetch (method, body, etc.).
 * @returns {Promise<any>} - El JSON de la respuesta.
 */
export async function fetchWithAuth(path, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No se encontr� token de autenticaci�n');
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