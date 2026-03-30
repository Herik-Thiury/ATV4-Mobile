// src/components/DetailsHUD.js
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsHUD({ current, daily, theme }) {
  // A Open-Meteo devolve o nascer do sol no formato "YYYY-MM-DDTHH:MM"
  // Esta função corta a string para mostrar apenas as horas e minutos "HH:MM"
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    return isoString.split('T')[1];
  };

  const sunriseTime = formatTime(daily.sunrise[0]);

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Detalhes de Hoje</Text>
      
      <View style={styles.row}>
        <View style={styles.item}>
          <Feather name="droplet" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Umidade</Text>
          <Text style={[styles.value, { color: theme.text }]}>{current.relative_humidity_2m}%</Text>
        </View>
        
        <View style={styles.item}>
          <Feather name="wind" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Vento</Text>
          <Text style={[styles.value, { color: theme.text }]}>{current.wind_speed_10m} km/h</Text>
        </View>

        <View style={styles.item}>
          <Feather name="sunrise" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Nascer do Sol</Text>
          <Text style={[styles.value, { color: theme.text }]}>{sunriseTime}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    opacity: 0.8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
});