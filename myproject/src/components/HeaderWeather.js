import { StyleSheet, Text, View } from 'react-native';
import { getWeatherInfo } from '../utils/weatherUtils';

export default function HeaderWeather({ current, daily, theme, cityName }) {
  const { desc } = getWeatherInfo(current.weather_code, current.is_day);
  const todayMax = Math.round(daily.temperature_2m_max[0]);
  const todayMin = Math.round(daily.temperature_2m_min[0]);

  return (
    <View style={styles.container}>
      <Text style={[styles.city, { color: theme.text }]}>{cityName}</Text>
      <Text style={[styles.temp, { color: theme.text }]}>{Math.round(current.temperature_2m)}°</Text>
      <Text style={[styles.condition, { color: theme.text }]}>{desc}</Text>
      <View style={styles.minMaxContainer}>
        <Text style={[styles.minMax, { color: theme.text }]}>Máx: {todayMax}°</Text>
        <Text style={[styles.minMax, { color: theme.text, marginLeft: 15 }]}>Mín: {todayMin}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  city: { fontSize: 32, fontWeight: '600', marginBottom: 5, textAlign: 'center' },
  temp: { fontSize: 96, fontWeight: '200', lineHeight: 100 },
  condition: { fontSize: 22, fontWeight: '400', marginBottom: 10, textTransform: 'capitalize' },
  minMaxContainer: { flexDirection: 'row' },
  minMax: { fontSize: 18, fontWeight: '500' },
});