// src/components/DetailsHUD.js
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailsHUD({ data, theme }) {
  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <Text style={[styles.title, { color: theme.text }]}>Detalhes de Hoje</Text>
      
      <View style={styles.row}>
        <View style={styles.item}>
          <Feather name="droplet" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Humidade</Text>
          <Text style={[styles.value, { color: theme.text }]}>{data.humidity}%</Text>
        </View>
        
        <View style={styles.item}>
          <Feather name="wind" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Vento</Text>
          <Text style={[styles.value, { color: theme.text }]}>{data.wind_speedy}</Text>
        </View>

        <View style={styles.item}>
          <Feather name="sunrise" size={24} color={theme.text} />
          <Text style={[styles.label, { color: theme.text }]}>Nascer do Sol</Text>
          <Text style={[styles.value, { color: theme.text }]}>{data.sunrise}</Text>
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
    fontSize: 18,
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