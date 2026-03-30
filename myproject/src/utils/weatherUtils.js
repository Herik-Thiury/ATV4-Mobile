// src/utils/weatherUtils.js
export const getWeatherInfo = (code, isDay = 1) => {
  if (code === 0) return { desc: 'Céu limpo', icon: isDay ? 'sun' : 'moon' };
  if (code === 1 || code === 2 || code === 3) return { desc: 'Parcialmente nublado', icon: 'cloud' };
  if (code === 45 || code === 48) return { desc: 'Nevoeiro', icon: 'align-justify' };
  if (code >= 51 && code <= 67) return { desc: 'Chuva', icon: 'cloud-rain' };
  if (code >= 71 && code <= 77) return { desc: 'Neve', icon: 'cloud-snow' };
  if (code >= 95 && code <= 99) return { desc: 'Tempestade', icon: 'cloud-lightning' };
  
  return { desc: 'Desconhecido', icon: 'cloud' };
};