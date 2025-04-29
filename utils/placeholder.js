// utils/placeholder.js
export const generatePlaceholder = (width, height, bgColor = "#f1f5f9", textColor = "#64748b") => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="16" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${width}x${height}</text>
    </svg>`;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };
  
  // Valores predefinidos para uso común
  export const placeholders = {
    avatar: generatePlaceholder(40, 40),
    avatarLarge: generatePlaceholder(60, 60),
    property: generatePlaceholder(600, 400),
    thumbnail: generatePlaceholder(100, 100),
    medium: generatePlaceholder(400, 300)
  };