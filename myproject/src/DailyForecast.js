// src/components/DailyForecast.js
import { Feather } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Função simples para mapear a condição da API para um ícone do Feather
const getIconName = (condition) => {
  switch (condition) {
    case 'storm': return 'cloud-lightning';
    case 'snow': return 'cloud-snow';
    case 'rain': return 'cloud-rain';
    case 'fog': return 'cloud-drizzle';
    case 'clear_day': return 'sun';
    case 'clear_night': return 'moon';
    case 'cloud':
    case 'cloudly_day':
    case 'cloudly_night': return 'cloud';
    default: return 'cloud';
  }
};

export default function DailyForecast({ forecast, theme }) {
  const renderItem = ({ item }) => (
    <View style={[styles.item, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
      <Text style={[styles.day, { color: theme.text }]}>{item.weekday}</Text>
      
      <View style={styles.conditionContainer}>
        <Feather name={getIconName(item.condition)} size={20} color={theme.text} style={styles.icon} />
        <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>
      </View>
      
      <Text style={[styles.tempStr, { color: theme.text }]}>
        {item.min}° / {item.max}°
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <FlatList
        data={forecast}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  day: {
    fontSize: 16,
    width: 50,
    fontWeight: '600',
  },
  conditionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  icon: {
    marginRight: 10,
  },
  description: {
    fontSize: 14,
    opacity: 0.9,
  },
  tempStr: {
    fontSize: 16,
    fontWeight: '600',
  },
});