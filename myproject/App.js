import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importação dos componentes da interface
import DailyForecast from './src/components/DailyForecast';
import DetailsHUD from './src/components/DetailsHUD';
import HeaderWeather from './src/components/HeaderWeather';
import HourlyForecast from './src/components/HourlyForecast';

// URL atualizada com umidade, vento e nascer do sol
const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-8.0543&longitude=-34.8813&current=temperature_2m,is_day,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FSao_Paulo';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Erro ao procurar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={[styles.center, { backgroundColor: '#4A90E2' }]}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (!weatherData) return null;

  // A API devolve 1 se for dia, 0 se for noite
  const isDarkTheme = weatherData.current.is_day === 0;

  const theme = {
    background: isDarkTheme ? '#0B101E' : '#4A90E2',
    text: '#FFFFFF',
    cardBg: isDarkTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.25)',
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={theme.background} />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cabeçalho */}
          <HeaderWeather current={weatherData.current} daily={weatherData.daily} theme={theme} />
          
          {/* Detalhes de Hoje (Umidade, Vento, etc) */}
          <DetailsHUD current={weatherData.current} daily={weatherData.daily} theme={theme} />
          
          {/* Previsão por Hora */}
          <HourlyForecast hourly={weatherData.hourly} theme={theme} />
          
          {/* Previsão para os próximos dias */}
          <DailyForecast daily={weatherData.daily} theme={theme} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});