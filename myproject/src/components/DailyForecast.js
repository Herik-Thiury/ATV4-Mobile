// src/components/DailyForecast.js
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { getWeatherInfo } from '../utils/weatherUtils';

export default function DailyForecast({ daily, theme }) {
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const forecastList = daily.time.slice(1).map((timeStr, index) => {
    const date = new Date(timeStr + 'T00:00:00');
    const actualIndex = index + 1;
    
    return {
      id: timeStr,
      dayName: weekDays[date.getDay()],
      min: Math.round(daily.temperature_2m_min[actualIndex]),
      max: Math.round(daily.temperature_2m_max[actualIndex]),
      code: daily.weather_code[actualIndex],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      {forecastList.map((item, index) => {
        const { icon } = getWeatherInfo(item.code);
        const isLast = index === forecastList.length - 1;

        return (
          <View key={item.id} style={[styles.item, !isLast && styles.borderBottom]}>
            <Text style={[styles.day, { color: theme.text }]}>{item.dayName}</Text>
            
            <View style={styles.conditionContainer}>
              <Feather name={icon} size={20} color={theme.text} style={styles.icon} />
            </View>
            
            <Text style={[styles.tempStr, { color: theme.text }]}>
              {item.min}° / {item.max}°
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 20, padding: 20, marginBottom: 40 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  day: { fontSize: 16, width: 50, fontWeight: '600' },
  conditionContainer: { flex: 1, alignItems: 'center' },
  icon: {},
  tempStr: { fontSize: 16, fontWeight: '600', width: 70, textAlign: 'right' },
});