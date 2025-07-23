/**
 * =============================================
 * HOOK PERSONALIZADO: useSound
 * =============================================
 * 
 * DESCRIPCIÓN:
 * Hook personalizado para manejar la reproducción de efectos de sonido
 * en componentes React. Simplifica la implementación de audio
 * y maneja errores comunes.
 * 
 * CARACTERÍSTICAS:
 * - Precarga automática del audio para mejor performance
 * - Manejo de errores durante la reproducción
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
