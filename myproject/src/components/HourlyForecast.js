// src/components/HourlyForecast.js
import { Feather } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getWeatherInfo } from '../utils/weatherUtils';

export default function HourlyForecast({ hourly, theme }) {
  // Encontrar a hora atual no array da API para mostrar apenas as próximas 24h
  const currentTimeStr = new Date().toISOString().slice(0, 13) + ':00';
  const startIndex = hourly.time.findIndex(time => time >= currentTimeStr) || 0;
  
  const next24Hours = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
    const hour = new Date(time).getHours();
    const actualIndex = startIndex + index;
    // Consideramos "dia" entre as 6h e as 17h para o ícone
    const isDay = hour >= 6 && hour < 18 ? 1 : 0; 
    
    return {
      id: time,
      timeLabel: `${hour}:00`,
      temp: Math.round(hourly.temperature_2m[actualIndex]),
      code: hourly.weather_code[actualIndex],
      isDay
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Previsão por Hora</Text>
      <FlatList
        data={next24Hours}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const { icon } = getWeatherInfo(item.code, item.isDay);
          return (
            <View style={styles.hourItem}>
              <Text style={[styles.hourText, { color: theme.text }]}>{item.timeLabel}</Text>
              <Feather name={icon} size={24} color={theme.text} style={styles.icon} />
              <Text style={[styles.tempText, { color: theme.text }]}>{item.temp}°</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 20, padding: 20, marginBottom: 20 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  hourItem: { alignItems: 'center', marginRight: 25 },
  hourText: { fontSize: 14, marginBottom: 10, opacity: 0.8 },
  icon: { marginBottom: 10 },
  tempText: { fontSize: 18, fontWeight: '600' },
});