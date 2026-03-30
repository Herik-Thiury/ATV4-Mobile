// src/components/HeaderWeather.js
import { StyleSheet, Text, View } from 'react-native';

export default function HeaderWeather({ data, today, theme }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.city, { color: theme.text }]}>{data.city}</Text>
      <Text style={[styles.temp, { color: theme.text }]}>{data.temp}°</Text>
      <Text style={[styles.condition, { color: theme.text }]}>{data.description}</Text>
      <View style={styles.minMaxContainer}>
        <Text style={[styles.minMax, { color: theme.text }]}>Máx: {today.max}°</Text>
        <Text style={[styles.minMax, { color: theme.text, marginLeft: 15 }]}>Mín: {today.min}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  city: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 5,
  },
  temp: {
    fontSize: 96,
    fontWeight: '200',
    lineHeight: 100,
  },
  condition: {
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  minMaxContainer: {
    flexDirection: 'row',
  },
  minMax: {
    fontSize: 18,
    fontWeight: '500',
  },
});