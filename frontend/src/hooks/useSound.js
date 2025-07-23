/**
 * =============================================
 * HOOK PERSONALIZADO: useSound
 * =============================================
 * 
 * DESCRIPCI�N:
 * Hook personalizado para manejar la reproducci�n de efectos de sonido
 * en componentes React. Simplifica la implementaci�n de audio
 * y maneja errores comunes.
 * 
 * CARACTER�STICAS:
 * - Precarga autom�tica del audio para mejor performance
 * - Manejo de errores durante la reproducci�n
 * - Interfaz simple para componentes hijos
 */ 

const useSound = (src) => {
    const playSound = () => {
        try {
            const audio = new Audio(src);
            audio.preload = 'auto';
            audio.play().catch(err => {
                console.error('No se pudo reproducir el sonido:', err);
            });
        } catch (err) {
            console.error('Error general al reproducir el sonido:', err);
        }
    };

    return playSound;
};

export default useSound;
