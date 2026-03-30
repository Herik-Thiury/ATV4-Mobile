import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

// Substitua pela sua chave caso tenha uma própria, ou use a do teste
const API_KEY = 'ba94c742';
const CITY = 'Recife,PE';
const API_URL = `https://api.hgbrasil.com/weather?key=${API_KEY}&city_name=${CITY}`;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    checkTimeAndSetTheme();
    fetchWeatherData();
  }, []);

  const checkTimeAndSetTheme = () => {
    const currentHour = new Date().getHours();
    // Escuro se for maior ou igual a 18h OU menor que 6h
    if (currentHour >= 18 || currentHour < 6) {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cores dinâmicas baseadas no tema
  const themeStyles = {
    backgroundColor: isDarkTheme ? '#121212' : '#87CEEB', // Ajuste para as cores exatas do Figma
    textColor: isDarkTheme ? '#FFFFFF' : '#333333',
    cardBackground: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: themeStyles.backgroundColor }]}>
        <ActivityIndicator size="large" color={themeStyles.textColor} />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={[styles.center, { backgroundColor: themeStyles.backgroundColor }]}>
        <Text style={{ color: themeStyles.textColor }}>Erro ao carregar dados.</Text>
      </View>
    );
  }

  // O primeiro item do array de forecast geralmente é o dia atual na HG Brasil
  const todayForecast = weatherData.forecast[0];
  const upcomingForecast = weatherData.forecast.slice(1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      
      {/* 1. Header: Tempo em tempo real */}
      <View style={styles.header}>
        <Text style={[styles.cityText, { color: themeStyles.textColor }]}>{weatherData.city}</Text>
        <Text style={[styles.tempText, { color: themeStyles.textColor }]}>{weatherData.temp}°</Text>
        <Text style={[styles.conditionText, { color: themeStyles.textColor }]}>{weatherData.description}</Text>
        <Text style={[styles.minMaxText, { color: themeStyles.textColor }]}>
          Max: {todayForecast.max}°   Min: {todayForecast.min}°
        </Text>
      </View>

      {/* 2. HUD de Hoje (Detalhes do dia) */}
      <View style={[styles.hudContainer, { backgroundColor: themeStyles.cardBackground }]}>
        <Text style={[styles.hudTitle, { color: themeStyles.textColor }]}>Detalhes de Hoje</Text>
        <View style={styles.hudRow}>
          <Text style={{ color: themeStyles.textColor }}>Umidade: {weatherData.humidity}%</Text>
          <Text style={{ color: themeStyles.textColor }}>Vento: {weatherData.wind_speedy}</Text>
        </View>
      </View>

      {/* 3. Previsão dos próximos dias */}
      <View style={[styles.forecastContainer, { backgroundColor: themeStyles.cardBackground }]}>
        <FlatList
          data={upcomingForecast}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text style={{ color: themeStyles.textColor, width: 50 }}>{item.weekday}</Text>
              <Text style={{ color: themeStyles.textColor, flex: 1, textAlign: 'center' }}>{item.description}</Text>
              <Text style={{ color: themeStyles.textColor }}>{item.min}° / {item.max}°</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  cityText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 80,
    fontWeight: '300',
    marginVertical: 10,
  },
  conditionText: {
    fontSize: 20,
    marginBottom: 5,
  },
  minMaxText: {
    fontSize: 16,
    fontWeight: '500',
  },
  hudContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  hudTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hudRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastContainer: {
    flex: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(150, 150, 150, 0.3)',
  },
});