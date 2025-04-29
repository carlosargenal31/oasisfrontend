// utils/avatarUtils.js

/**
 * Genera un avatar con las iniciales del usuario como una URL de datos SVG.
 * @param {string} firstName - Nombre del usuario
 * @param {string} lastName - Apellido del usuario
 * @param {number} size - Tamaño del avatar en píxeles
 * @returns {string} URL de datos del avatar con las iniciales
 */
export const generateInitialsAvatar = (firstName = '', lastName = '', size = 40) => {
    // Obtener iniciales
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    const initials = `${firstInitial}${lastInitial}` || '?';
    
    // Generar un color basado en el nombre
    const colors = [
      '#4F46E5', '#2563EB', '#7C3AED', '#9333EA', 
      '#C026D3', '#DB2777', '#E11D48', '#F59E0B',
      '#10B981', '#06B6D4', '#0EA5E9', '#8B5CF6'
    ];
    
    const nameHash = (firstName + lastName).split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    
    const backgroundColor = colors[nameHash % colors.length];
    
    // Crear el SVG
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" />
      <text x="50%" y="50%" font-family="Arial" font-size="${size/2.5}" fill="white" text-anchor="middle" dominant-baseline="central">${initials}</text>
    </svg>
    `;
    
    // Convertir a base64
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };