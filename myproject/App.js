import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import DailyForecast from './src/components/DailyForecast';
import DetailsHUD from './src/components/DetailsHUD';
import HeaderWeather from './src/components/HeaderWeather';
import HourlyForecast from './src/components/HourlyForecast';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCityName, setCurrentCityName] = useState('Recife, Pernambuco');

  useEffect(() => {
    // Carrega o clima de Recife por defeito ao abrir o app
    fetchWeatherByCoords(-8.0543, -34.8813, 'Recife, Pernambuco');
  }, []);

  // 1. Função para buscar as coordenadas da cidade digitada
  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    setLoading(true);
    try {
      // API de Geocoding da Open-Meteo
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=pt&format=json`;
      const geoResponse = await axios.get(geoUrl);
      
      if (geoResponse.data.results && geoResponse.data.results.length > 0) {
        const cityData = geoResponse.data.results[0];
        const lat = cityData.latitude;
        const lon = cityData.longitude;
        // Monta o nome bonito (Ex: São Paulo, São Paulo)
        const displayName = cityData.admin1 ? `${cityData.name}, ${cityData.admin1}` : cityData.name;
        
        await fetchWeatherByCoords(lat, lon, displayName);
        setSearchQuery(''); // Limpa o campo de pesquisa após encontrar
      } else {
        Alert.alert('Ops!', 'Cidade não encontrada. Tente digitar o nome completo.');
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar cidade:", error);
      Alert.alert('Erro', 'Não foi possível buscar a cidade.');
      setLoading(false);
    }
  };

  // 2. Função principal para buscar o clima usando Lat/Lon
  const fetchWeatherByCoords = async (latitude, longitude, cityName) => {
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=America%2FSao_Paulo`;
      
      const response = await axios.get(weatherUrl);
      setWeatherData(response.data);
      setCurrentCityName(cityName);
    } catch (error) {
      console.error("Erro ao procurar dados da API:", error);
    } finally {
      setLoading(false);
    }
  };

  // Regra de negócio exigida: escuro após as 18h, claro após as 6h
  const currentHour = new Date().getHours();
  const isDarkTheme = currentHour >= 18 || currentHour < 6;

  const theme = {
    background: isDarkTheme ? '#0B101E' : '#4A90E2',
    text: '#FFFFFF',
    cardBg: isDarkTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.25)',
  };

  if (loading && !weatherData) {
    return (
      <SafeAreaProvider>
        <View style={[styles.center, { backgroundColor: theme.background }]}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (!weatherData) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={theme.background} />
        
        {/* Barra de Pesquisa */}
        <View style={[styles.searchContainer, { backgroundColor: theme.cardBg }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Digite o nome de uma cidade..."
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch} // Pesquisa ao apertar "Enter" no teclado
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Feather name="search" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="small" color="#FFF" style={{marginBottom: 10}} />}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <HeaderWeather 
            current={weatherData.current} 
            daily={weatherData.daily} 
            theme={theme} 
            cityName={currentCityName} 
          />
          <DetailsHUD current={weatherData.current} daily={weatherData.daily} theme={theme} />
          <HourlyForecast hourly={weatherData.hourly} theme={theme} />
          <DailyForecast daily={weatherData.daily} theme={theme} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  searchButton: {
    padding: 5,
  },
  content: { flex: 1, paddingHorizontal: 20 },
});