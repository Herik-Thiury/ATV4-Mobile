import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Importação dos componentes da interface
import DailyForecast from './src/components/DailyForecast';
import DetailsHUD from './src/components/DetailsHUD';
import HeaderWeather from './src/components/HeaderWeather';

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
    // Define o tema escuro se a hora for maior ou igual a 18h, ou menor que 6h
    setIsDarkTheme(currentHour >= 18 || currentHour < 6);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data.results);
    } catch (error) {
      console.error("Erro ao procurar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cores dinâmicas consoante o tema
  const theme = {
    background: isDarkTheme ? '#0B101E' : '#4A90E2', // Ajuste para as cores exatas do seu Figma
    text: '#FFFFFF',
    cardBg: isDarkTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.25)',
  };

  // Ecrã de carregamento
  if (loading) {
    return (
      <SafeAreaProvider>
        <View style={[styles.center, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      </SafeAreaProvider>
    );
  }

  // Ecrã de erro
  if (!weatherData) {
    return (
      <SafeAreaProvider>
        <View style={[styles.center, { backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text }}>Erro ao carregar os dados.</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // Separa a previsão de hoje dos restantes dias
  const todayForecast = weatherData.forecast[0];
  const upcomingForecast = weatherData.forecast.slice(1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={theme.background} 
        />
        
        <View style={styles.content}>
          {/* Cabeçalho com temperatura atual e cidade */}
          <HeaderWeather 
            data={weatherData} 
            today={todayForecast} 
            theme={theme} 
          />
          
          {/* HUD com os detalhes do dia (vento, humidade, etc.) */}
          <DetailsHUD 
            data={weatherData} 
            theme={theme} 
          />
          
          {/* Lista com a previsão dos próximos dias */}
          <DailyForecast 
            forecast={upcomingForecast} 
            theme={theme} 
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});