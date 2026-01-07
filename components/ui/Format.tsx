export const formatearNumero = (texto: string): string => {
    // Eliminar todo excepto números
    const numeros = texto.replace(/[^0-9]/g, '');
    if (!numeros) return '';
    // Convertir a número y formatear con separadores
    return parseInt(numeros).toLocaleString('es-ES');
};